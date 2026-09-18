# Karsa landing page

A standalone Next.js 15 landing page for Universitas Tidar. This project is independent of the main Karsa application. All sign-in links open https://karsa-one.vercel.app/login.

## Run locally

Use Node.js 22 LTS or newer supported LTS and npm.

```sh
cd /home/ywldan/Documents/karsa-landing
npm install
npm run dev
```

Open http://localhost:3000. No environment variables, database, or Google OAuth credentials are needed for this landing page. The three-tap example only updates component state; it sends no requests and stores no student data.

## Verify and run production

```sh
npm run typecheck
npm run lint
npm run build
npm run start
```

`next/font/google` downloads Instrument Serif, Geist, and Geist Mono at build time and serves them locally. The build environment needs access to Google Fonts. All families use `display: swap` with explicit fallbacks. See the [Next.js font documentation](https://nextjs.org/docs/15/app/api-reference/components/font).

## Deploy to Vercel

1. Push this directory as a separate repository.
2. In Vercel, create a new project and import that repository.
3. Select the Next.js preset, repository root as the root directory, and a supported Node LTS version (22 or 24).
4. Keep the default build command, `npm run build`, and output directory.
5. Deploy. No environment variables are required.

Production access happens in the main Karsa app. This project does not configure or modify its authentication. The navigation's **Request access** link opens the access explanation at `#access`; it is not an application form or a waitlist. No analytics have been added.

## Structure

- `app/layout.tsx`: fonts, metadata, and rationale for typography/motion.
- `app/page.tsx`: server-rendered composition of all ten sections.
- `app/globals.css`: documented brand tokens, twelve-column layout, responsive rules, and accessibility states.
- `components/landing/`: the ten sections, reveal primitives, record composition, and interactive input example.
- `components/ui/`: source-owned shadcn/ui Button, Badge, and Card, adapted to the brand. The Button uses Radix Slot and class-variance-authority; class merging uses the standard shadcn utilities.
- `review/`: screenshots and implementation/verification notes.

Dependencies are limited to the requested Next/React, TypeScript, Tailwind/PostCSS, shadcn/ui primitives/utilities, lucide-react, Framer Motion, and Next's ESLint tooling. Browser verification uses an existing external Playwright installation; no testing dependency is added to this project.

## Design and content decisions

- Instrument Serif for headlines and number anchors; Geist for reading; Geist Mono for metadata.
- Orange `#CF6A12`, near-black `#0A0A0A`, off-white `#FAFAFA`. Orange buttons use near-black text for contrast.
- Fluid type sizes follow the approved `clamp()` values. Radius tokens are four, eight, and twelve pixels.
- Hero choreography completes in 1.3 seconds. Reveal animation uses Framer Motion, a custom exponential ease, 600ms duration, 24px displacement, and a one-time 20% visibility trigger.
- Reduced-motion content is immediately visible, including before hydration. Without JavaScript the copy remains visible; the interactive example is replaced by an explanation.
- Noninteractive cards remain still. Only real interactive elements have hover feedback; hover transforms are restricted to fine pointers.
- The desktop hero has two lines; compact displays may wrap. Its mobile composition moves below the introduction.
- The specified `1 / 3 / 0`, step numbers, and sample UI point values remain numerals; small numbers in prose are spelled out.
- The requested instructor copy is retained, with the assigned PJ clarified in the workflow. Status is based on the supplied brief, with launch identified as semester Genap 2026/2027.
- All UI data is illustrative. Roadmap completion and product claims are supplied content, not the result of auditing the main app.

## Review before publication

Confirm the launch date, listed completed milestones, authentication policy, and product claims with the app owner. Replace the `#access` destination if a real access-request flow becomes available. The copyright uses the build year. No public deployment is performed automatically; the repository is ready for Vercel import.
