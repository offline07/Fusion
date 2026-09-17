# Fusion 360 for the Workshop

A hands-on course web app that teaches Autodesk Fusion 360 to woodworkers and makers, with an emphasis on CNC router carving and FDM 3D printing.

Each lesson pairs a curated YouTube video (embedded from the creator's channel) with an original step-by-step lab you complete in Fusion, shop notes from experienced CNC and printing users, and a short knowledge check. Every module ends in a build project; the capstone is a keepsake box with CNC box joints, a carved lid, and 3D-printed hinges, all driven from one parametric model.

## Curriculum

| # | Module | Track | Lessons |
| - | ------ | ----- | ------- |
| 1 | Orientation and Your First Model | Foundations | Interface, toy block, fully defined sketches, all 12 constraints |
| 2 | Parametric Modeling for the Shop | Foundations | User parameters, cutting board lab, everyday modify toolkit |
| 3 | Design for 3D Printing | 3D Printing | FDM design rules, fit gauge, print-in-place hinge, export to slicer |
| 4 | CNC Fundamentals | CNC Woodworking | CAM anatomy, machine/post/tool library, 2D pocket + contour + tabs, V-carve signs |
| 5 | 3D Carving and Relief Work | CNC Woodworking | Adaptive roughing + parallel finishing, Form/T-splines, mesh import, finishing strategies |
| 6 | Capstone: Hybrid Keepsake Box | Capstone | CNC joinery + dogbones, parametric box design, nesting and CAM, printed hardware |

The Reference page includes feeds-and-speeds tables for hobby routers, FDM design rules, fit tables, hotkeys, a toolpath picker, and three interactive calculators (chip load to feed rate, ball nose cusp height, dogbone relief and tab sizing).

Progress (completed lessons, checked steps, quiz answers) is stored in `localStorage`; there is no account or backend.

## Running locally

Requires Node.js 20 or newer.

```bash
git clone https://github.com/offline07/Fusion.git
cd Fusion
npm install
npm run dev
```

The dev server binds to [http://127.0.0.1:4173](http://127.0.0.1:4173). Production build:

```bash
npm run build
npm start
```

## Deploying to Cloudflare

The site is a static export served by Cloudflare Workers static assets, configured in `wrangler.jsonc` with the custom domain `fusion.topsideinnovations.com`.

```bash
export CLOUDFLARE_API_TOKEN=...   # token with Workers Scripts:Edit and Workers Routes:Edit on the zone
export CLOUDFLARE_ACCOUNT_ID=...
npm run deploy                    # next build && wrangler deploy
```

`npm run preview:cf` builds and serves the export locally through Wrangler.

## Project layout

```
src/
  data/course.ts          Curriculum: modules, lessons, steps, quizzes, videos
  lib/course.ts           Lookup helpers and course stats
  lib/progress.ts         localStorage-backed progress store (useSyncExternalStore)
  app/page.tsx            Course overview
  app/modules/[module]    Module page with lesson list and build project
  app/lessons/[lesson]    Lesson page: video, objectives, checklist, notes, quiz
  app/reference           Cheat sheets and calculators
  components/             UI (shadcn/ui primitives in components/ui)
```

## Editing the course

All content lives in `src/data/course.ts`. Add a lesson by appending to a module's `lessons` array; routes and navigation are generated from the data. Videos are referenced by YouTube ID and lazily embedded via `youtube-nocookie.com`.

## Stack

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui (Base UI), lucide-react.
