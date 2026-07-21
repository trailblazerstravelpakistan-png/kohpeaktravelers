# Koh Peaks Tours & Trails

A tours & travel website for Northern Pakistan, built with **Next.js 16 (App Router)**.
Runs on any Node.js host (VPS, Hostinger, etc.). Database is optional and Supabase-ready.

## Requirements

- Node.js `>=20.9.0`

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

- `npm run dev` — start the dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint
- `npm run db:generate` — generate Drizzle SQL migrations from `db/schema.ts`
- `npm run db:push` — push the schema to your database

## Project Structure

- `app/` — pages and components (App Router)
- `app/data.ts` — site content (destinations, packages, etc.)
- `db/schema.ts` — Drizzle table definitions (Postgres)
- `db/index.ts` — lazy database connection helper
- `public/` — static assets and images

## Database (Supabase / Postgres)

The site works without a database. To enable it:

1. Create a project on [Supabase](https://supabase.com).
2. Copy the connection string from **Project Settings → Database → Connection string (URI)**.
3. Put it in `.env.local`:

   ```
   DATABASE_URL=postgresql://postgres:<password>@<host>:5432/postgres
   ```

4. Create the tables:

   ```bash
   npm run db:generate
   npm run db:push
   ```

Use `getDb()` from `db/index.ts` in server code to query the database.
A `contact_enquiries` table is included as a starting point for the Contact form.

## Deploying

Build and start on your host:

```bash
npm run build
npm run start
```

Set `DATABASE_URL` in the host's environment if you use the database.
