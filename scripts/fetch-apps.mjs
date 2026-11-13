// Downloads App Store icon + up to 3 screenshots per appStoreId into src/assets/apps/<id>/ (committed, so builds are offline).
// Images only: names and copy always come from profile.json.
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const { projects } = JSON.parse(await readFile('src/data/profile.json', 'utf8'));
const save = async (url, path) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  await writeFile(path, Buffer.from(await res.arrayBuffer()));
};

for (const p of projects.filter((p) => p.appStoreId)) {
  // country=us: the bd storefront returns nothing.
  const [app] = (await (await fetch(`https://itunes.apple.com/lookup?country=us&id=${p.appStoreId}`)).json()).results;
  if (!app) { console.log(`- ${p.name}: not on the App Store, typographic card`); continue; }
  const dir = `src/assets/apps/${p.appStoreId}`;
  await mkdir(dir, { recursive: true });
  await save(app.artworkUrl512, `${dir}/icon.jpg`);
  // A .custom marker means the screenshots are hand-picked captures: keep them.
  const shots = existsSync(`${dir}/.custom`) ? [] : (app.screenshotUrls ?? []).slice(0, 3);
  // mzstatic URLs end in /<w>x<h>bb.<ext>; ask for a 600px-wide JPEG instead of the thumbnail.
  await Promise.all(shots.map((u, i) => save(u.replace(/\/[^/]+$/, '/600x1300bb.jpg'), `${dir}/${i + 1}.jpg`)));
  console.log(`+ ${p.name}: icon + ${shots.length} screenshots`);
}
