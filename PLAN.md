# Portfolio site — Md Nafisul Islam

## Requirements
- Personal portfolio for a Senior iOS Engineer; single page, sections: hero, selected work (apps), experience timeline, writing, skills, education, contact.
- Modern, distinctive design inspired by top-tier portfolios (not a template look); polished animation.
- Extremely fast: static HTML, near-zero JS.
- Real data only, sourced from the owner's LinkedIn profile (captured in `src/data/profile.json`).

## Invariants
- Every fact on the page (names, dates, metrics, links) comes from `src/data/profile.json` or the public App Store lookup API. No invented testimonials, clients, metrics, awards, or lorem ipsum.
- `profile.json` is the single content source; components hold no hard-coded biography facts.
- "Years of experience" is computed from `careerStart` at build time, never hard-coded.
- No LinkedIn-private data (profile-view analytics, viewer lists) on the site.
- All motion is disabled under `prefers-reduced-motion: reduce`; content is fully readable with JS disabled.
- No third-party runtime requests: fonts and images self-hosted, no analytics, no CDN scripts.
- Works from 360px to 1920px+; keyboard navigable; WCAG AA contrast; semantic landmarks.

## Product decisions
- Stack: Astro (latest stable), static output, plain CSS (custom properties), vanilla TS only where CSS cannot do the job. No React/Tailwind/animation libraries.
- Animation: CSS scroll-driven animations (`animation-timeline: view()`), pointer-reactive hero accent. Hidden initial states live only inside `@supports (animation-timeline: view())` + `prefers-reduced-motion: no-preference`; browsers without support show content statically (no IntersectionObserver fallback, no view transitions, no `ClientRouter`). Total shipped JS under 5 KB gzipped.
- Fonts: at most two self-hosted variable fonts (woff2, latin + latin-ext so `Ş`/`ı` render in the display face, `font-display: swap`, preload the display face).
- App visuals: at build-prep time, a script fetches icons and screenshots for each `appStoreId` from `https://itunes.apple.com/lookup?id=<id>` (`country=us`; the `bd` storefront returns nothing) into `src/assets/apps/<id>/`, imported with `import.meta.glob` and rendered via `astro:assets` as AVIF/WebP with explicit dimensions. Only images come from the store; names and copy come from `profile.json`. Projects without an id get a typographic card.
- Theme follows the OS (`light-dark()`), with a nav toggle that saves an override; iOS-native feel (glass surfaces, squircle app icons) fitting an iOS engineer.
- SEO: title, description, Open Graph (typographic image), JSON-LD `Person`. `site: https://nafisulislam.github.io`, `public/.nojekyll`.
- Publish allowlist: no follower/connection counts. LinkedIn posts are labelled as posts with their month, not presented as articles.
- Deploy target: GitHub Pages compatible (pure static `dist/`). Deployment itself is out of scope.

## Steps
1. Scaffold Astro (minimal template, TypeScript strict) in the repo root; keep `src/data/profile.json`.
2. `scripts/fetch-apps.mjs`: download App Store icon + up to 3 screenshots per `appStoreId`; tolerate fewer screenshots or a missing app. Kahf Guard id 6479974796 (bundle `com.halalz.kahfguard`) is already in `profile.json`.
3. Layout + design tokens (`src/styles/global.css`): colour, type scale, spacing, motion tokens.
4. Sections as Astro components: `Hero`, `Work`, `Experience`, `Writing`, `Skills`, `Education`, `Contact`, `Footer`; `src/pages/index.astro` composes them.
5. Motion layer: scroll reveals, hero pointer effect, reduced-motion guard.
6. SEO head, favicon, 404 page.
7. Verify: `npm run build` clean; `dist/index.html` (`npm test` builds first) contains every company, project, role title, school, project/writing URL and the email from `profile.json`; every `%`/`K`/`M` figure in the page text exists in `profile.json`; no `http(s)` asset references (`src=`, stylesheet/preload links, `url(`, `@import`) in any `dist` HTML/CSS; JS size budget; landmarks and skip link present. Screenshots at 360px and 1440px, light and dark, plus one with JS disabled and one with reduced motion.

## Done criteria
- `npm run build` and `npm test` pass.
- Shipped JS < 5 KB gzipped; no external network requests in `dist/index.html`.
- Page renders correctly at 360px and 1440px in light and dark, with JS disabled, and with reduced motion.
