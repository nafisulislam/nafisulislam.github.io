import profile from './profile.json';

export { profile };
const start = new Date(profile.careerStart);
// Whole years since careerStart, computed at build time.
export const years = Math.floor((Date.now() - +start) / (365.25 * 864e5));
export const slug = (s: string) => s.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean).slice(0, 2).join('-');
export const month = (ym: string | null) =>
  ym ? new Date(ym).toLocaleDateString('en', { month: 'short', year: 'numeric', timeZone: 'UTC' }) : 'Present';
export const statement = `${years}\u00a0years building mobile and web apps, now at ${profile.experience[0].company.replaceAll(' ', '\u00a0')}`.replace(/\.?$/, '.');

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/apps/*/*.jpg', { eager: true });
// Artwork saved by scripts/fetch-apps.mjs; empty for projects without an App Store listing.
export const art = (id: string | null) => {
  const pick = (n: string) => files[`../assets/apps/${id}/${n}.jpg`]?.default;
  return { icon: pick('icon'), shots: ['1', '2', '3'].map(pick).filter((s) => s !== undefined) };
};
