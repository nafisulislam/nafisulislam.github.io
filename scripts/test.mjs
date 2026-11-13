// Checks the built site against profile.json: content present, no invented figures, nothing third-party, JS budget.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { gzipSync } from 'node:zlib';

const raw = readFileSync('src/data/profile.json', 'utf8');
const p = JSON.parse(raw);
const html = readFileSync('dist/index.html', 'utf8');
const plain = (s) => s.replace(/<(script|style)[\s\S]*?<\/\1>|<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ');
const text = plain(html);
const experience = plain(html.match(/<section id="experience"[\s\S]*?<\/section>/)[0]);

const names = [...p.projects.map((x) => x.name), ...p.education.map((e) => e.school)];
for (const s of names) assert(text.includes(s), `missing text: ${s}`);
// Every summary, point and highlight is rendered in full (whitespace-insensitive: figures sit in their own element).
const squash = (s) => s.replace(/\s+/g, '');
const copy = [...p.projects.flatMap((x) => [x.summary, ...x.points]), ...p.experience.flatMap((e) => e.highlights)];
for (const s of copy) assert(squash(text).includes(squash(s)), `missing copy: ${s}`);
for (const e of p.experience) for (const s of [e.company, e.title]) assert(experience.includes(s), `missing from Experience: ${s}`);

// Years of experience are computed from careerStart, not typed in.
const years = Math.floor((Date.now() - +new Date(p.careerStart)) / (365.25 * 864e5));
assert(text.includes(`${years} years`), `expected "${years} years" in the page`);
const urls = [...p.projects, ...p.writing].map((x) => x.url).filter(Boolean);
for (const s of [...urls, `mailto:${p.contact.email}`]) assert(html.includes(`href="${s}"`), `missing link: ${s}`);

// Every %/K/M/million figure shown must exist (whole number, not a substring) in profile.json.
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
for (const [fig] of text.matchAll(/\d[\d.,]*(?:%|[KM]\b| ?million)/g)) assert(new RegExp(`(?<![\\d.,])${esc(fig)}`).test(raw), `figure not in profile.json: ${fig}`);

for (const tag of ['<header', '<nav', '<main', '<footer', 'class="skip"']) assert(html.includes(tag), `missing ${tag}`);

const dist = readdirSync('dist', { recursive: true });
const read = (ext) => dist.filter((f) => f.endsWith(ext)).map((f) => readFileSync(`dist/${f}`, 'utf8'));
for (const s of [...read('.html'), ...read('.css')])
  assert(!/(?:src|srcset)=["'](?:https?:)?\/\/|<link(?![^>]*rel="canonical")[^>]*href=["'](?:https?:)?\/\/|url\(["']?(?:https?:)?\/\/|@import/.test(s), 'third-party asset reference in dist');

// Animations (the only hidden initial states) exist only under prefers-reduced-motion: no-preference.
let css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('');
assert(css.includes('@supports (animation-timeline:view())'), 'scroll-timeline @supports guard missing');
for (let i; (i = css.indexOf('@media (prefers-reduced-motion:no-preference)')) >= 0; ) {
  let j = css.indexOf('{', i), depth = 0;
  do depth += { '{': 1, '}': -1 }[css[j++]] ?? 0; while (depth);
  css = css.slice(0, i) + css.slice(j);
}
assert(!/animation(-name)?:/.test(css), 'animation outside the reduced-motion guard');

const inline = [...html.matchAll(/<script(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
const js = [...inline, ...read('.js')].reduce((n, s) => n + (s && gzipSync(s).length), 0);
assert(js < 5 * 1024, `JS budget exceeded: ${js} B gzipped`);

console.log(`ok: ${names.length + 2 * p.experience.length} names, ${urls.length + 1} links, ${years} years, figures, landmarks, motion guards, no third-party assets, ${js} B JS gzipped`);
