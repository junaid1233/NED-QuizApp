# NED MasterPrep

Independent exam preparation platform for **NED University Master's Admission Test** candidates, especially **Computer & Information Systems Engineering**.

> **Disclaimer:** Not officially affiliated with or endorsed by NED University. Practice questions are unverified unless marked otherwise.

## Features (Phase 1)

- Subject-wise practice tests (AI, Analytical Geometry, Programming, Digital Logic)
- Configurable question count, difficulty, and timer
- Timed quiz with progress bar and auto-submit on timeout
- Detailed results with score, grade, and answer review
- PWA install support

## Quick Start dsadsada

```bash
cd NED-QuizApp
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Development server |
| `npm test` | Run unit tests |
| `npm run build` | Production build |
| `npm run deploy` | Deploy to GitHub Pages |

## Project Structure

```
src/
├── components/     # UI (Main, Quiz, Result, Header, Footer)
├── constants/      # Categories, difficulty, timer options
├── services/       # Question filtering & preparation
└── utils/          # Scoring, shuffling, time conversion
```

## Roadmap

See [docs/PRODUCT-PLAN.md](docs/PRODUCT-PLAN.md) for full architecture, database schema, and phased implementation plan.

| Phase | Status |
|-------|--------|
| 1 — Audit & repair quiz | ✅ Done |
| 2 — Modern UI & dashboard | Planned |
| 3 — Supabase auth & DB | Planned |
| 4 — Test modes & analytics | Planned |
| 5 — Admin panel | Planned |
| 6 — Tests & deployment | Planned |

## Deploy to Vercel

1. Push code to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. **Root Directory:** `NED-QuizApp` (if repo is NED-Quiz) or project root
4. **Build Command:** `npm run build`
5. **Output Directory:** `build`
6. Deploy

`vercel.json` is included — Vercel will auto-detect settings.

> **Important:** Do not set `homepage` in `package.json` for Vercel (assets must load from `/static/...` not `/junaid1233/static/...`).

## Deploy to GitHub Pages (optional)

Before building for GitHub Pages, temporarily add to `package.json`:
```json
"homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO_NAME"
```
Then run `npm run deploy`.

Report mistakes: **0309-2547332 (Junaid)**

## License

Open source — see [LICENSE](LICENSE)
