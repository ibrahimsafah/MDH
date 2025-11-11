# MDH

## Development

1. Install dependencies (requires Node 18+):
   ```bash
   npm install
   ```
2. Run both the Vite client and Express API with one command:
   ```bash
   npm run dev
   ```
   - Vite serves the React app on `http://localhost:4173`.
   - The backend API runs on `http://localhost:4000` (override with `API_PORT`).
3. The client proxies `/api/*` requests to the backend during development.

## Production

```bash
npm run build    # bundles the React app to /dist
npm run start    # serves the API and, in production mode, the /dist files
```

Set `VITE_API_BASE_URL` if the client needs to call a hosted API that is not the same origin. The backend respects `API_PORT` or `PORT` for binding.

## Deploying to Vercel

1. Ensure `vercel` CLI is installed (`npm i -g vercel`) and run `vercel login` if needed.
2. Add the required environment variables in the Vercel dashboard or via CLI:
   - `DATABASE_URL` (and `PGSSLMODE` if your Postgres host enforces TLS)
   - Optional client vars prefixed with `VITE_…`
3. Deploy:
   ```bash
   vercel        # first deployment, answers will be stored in .vercel/project.json
   vercel --prod # promote to production
   ```
   - Vercel uses `npm run build` and serves `/dist` as a static site.
   - The catch-all function `api/[...route].js` mounts the Express app so `/api/*` works in both dev and prod.

## Database (PostgreSQL)

1. Provision a PostgreSQL database and capture the connection string, e.g. `postgres://user:password@localhost:5432/mdh`.
2. Export `DATABASE_URL` before starting the server:
   ```bash
   export DATABASE_URL="postgres://user:password@localhost:5432/mdh"
   export PGSSLMODE=require   # optional, enables SSL with relaxed cert checking
   ```
3. Start the backend (`npm run dev` or `npm run start`). The API now exposes:
   - `/api/health` → includes database health metadata if configured.
   - `/api/db/time` → runs `SELECT NOW()` to confirm connectivity.
