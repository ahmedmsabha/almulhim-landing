# Al-Mulhim Landing

Kinetic Enterprise marketing site for **الملهم** — Arabic RTL, plans, free/preview lessons, about, and contact.

## Stack

- Next.js 16 + React 19 + Tailwind 4
- Public Nest API (`/plans/public`, `/content/public/preview`, `/contact`)
- PostHog (optional via env)

## Develop

```bash
cp .env.example .env.local
npm install
npm run dev
```

App runs at [http://localhost:3002](http://localhost:3002).

Ensure the Nest backend allows `http://localhost:3002` in `CORS_ORIGINS`.

## Scripts

- `npm run dev` — webpack dev server on port 3002
- `npm run build` — production build
- `npm start` — serve production build on port 3002
