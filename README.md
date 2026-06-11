# flup.app

A SvelteKit + TypeScript + Bun viewer for a Twitch chat backend, powered by
[PocketBase](https://pocketbase.io) for auth, data, file storage, and realtime.

The architecture is split: a SvelteKit viewer deployed to Vercel handles the
read-side (homepage, channel pages, per-user logs, search, auth flows), a
Hono REST API running on a VPS handles the write-side (bot ingestion,
session management, command dispatch), and PocketBase is the shared database
sitting in the middle.

## Data safety

> ⚠️ **DATA SAFETY**: The `pb_data/` directory is your live PocketBase data.
> The setup script, the migration file, and the verification script all
> operate on disposable throwaway directories and **never touch `pb_data/`**.
> Use `bun run dev:pb:isolated` (points at `pb_data_dev/`, gitignored) for
> clean-room dev work or schema experiments.
>
> - To wipe a disposable instance: `rm -rf pb_data_dev/`
> - To wipe the real instance (**DANGEROUS**, will lose all data):
>   `rm -rf pb_data/` — confirm with yourself first.

## Tech stack

- **Frontend** — SvelteKit 2 + Svelte 5 (runes) + TypeScript + Bun
- **Styling** — Tailwind CSS v4, dark mode via `mode-watcher`
- **Backend** — PocketBase v0.39.3 (server) + `pocketbase` v0.27.0 (SDK)
- **Type generation** — `pocketbase-typegen` from the live schema
- **Deployment** — `@sveltejs/adapter-vercel` (serverless)
- **Auth** — PocketBase's built-in `users` collection (email + password, OAuth2
  field-mapping configured but no providers enabled yet — see [OAuth](#oauth-provider-setup-todo-for-v2))

## Getting started (local dev)

```bash
# 1. Clone
git clone <repo-url> flup.app && cd flup.app

# 2. Install dependencies
bun install

# 3. Download the PocketBase binary (v0.39.3) and verify its SHA256
bun run setup

# 4. Copy the env template and fill in your values
cp .env.example .env
# Edit .env with your PocketBase URL + admin creds

# 5. Start the dev server (SvelteKit + PocketBase, side by side)
bun run dev
# SvelteKit → http://localhost:5173
# PocketBase admin → http://127.0.0.1:8090/_/
```

If you already have a hosted PocketBase (e.g. `pb.niller.xyz`), you can skip
`bun run dev:pb` and just use `bun run dev:app` to start SvelteKit alone.
The SvelteKit app reads `PUBLIC_POCKETBASE_URL` from `.env` and will hit
whatever URL you put there.

## Available scripts

| Script                    | What it does                                                                                                                                                                                                      |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bun run setup`           | Downloads the PocketBase v0.39.3 binary, verifies SHA256, makes it executable                                                                                                                                     |
| `bun run dev`             | Runs both `dev:pb` (PocketBase on `:8090` pointing at `./pb_data`) and `dev:app` (Vite on `:5173`) concurrently                                                                                                   |
| `bun run dev:app`         | Just SvelteKit (Vite dev server on `:5173`). Use when you have a separate hosted PocketBase                                                                                                                       |
| `bun run dev:pb`          | Just PocketBase, pointing at the live `./pb_data`. **Do not use the admin UI to modify schema while this is running** — `--automigrate` is on by default and will write to your live data                         |
| `bun run dev:pb:isolated` | Just PocketBase, pointing at `./pb_data_dev/` (gitignored, disposable). Safe for schema experiments                                                                                                               |
| `bun run pb`              | Direct access to the `./pocketbase` binary (subcommand passthrough)                                                                                                                                               |
| `bun run pb:migrate`      | Run `./pocketbase migrate`                                                                                                                                                                                        |
| `bun run pb:backup`       | Run `./pocketbase backup` (requires an instance)                                                                                                                                                                  |
| `bun run pb:types`        | Regenerate `src/lib/pocketbase/types.ts` from the live PocketBase schema. Requires `PUBLIC_POCKETBASE_URL`, `POCKETBASE_ADMIN_EMAIL`, `POCKETBASE_ADMIN_PASSWORD` in `.env` (Bun auto-loads `.env` for `bun run`) |
| `bun run check`           | `svelte-kit sync` + `svelte-check`                                                                                                                                                                                |
| `bun run lint`            | Prettier check + ESLint                                                                                                                                                                                           |
| `bun run format`          | Prettier write (auto-fix formatting)                                                                                                                                                                              |
| `bun run build`           | Production build (Vercel adapter output → `.vercel/output/`)                                                                                                                                                      |
| `bun run preview`         | Preview the production build locally                                                                                                                                                                              |

## Environment variables

All variables live in `.env` (gitignored). See `.env.example` for the template.

| Variable                    | Required            | Scope           | Purpose                                                                                                                                                                                                  |
| --------------------------- | ------------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_POCKETBASE_URL`     | Yes                 | Client + server | The public URL of the PocketBase server. Bundled into the client (the `PUBLIC_` prefix is SvelteKit's marker for client-side env). Example: `https://pb.niller.xyz` or `http://127.0.0.1:8090` for local |
| `POCKETBASE_ADMIN_EMAIL`    | Yes (server routes) | Server-only     | Admin email. Used to read locked collections like `channels`. **NEVER** exposed to the browser (no `PUBLIC_` prefix)                                                                                     |
| `POCKETBASE_ADMIN_PASSWORD` | Yes (server routes) | Server-only     | Admin password. Same usage as above. **NEVER** exposed to the browser                                                                                                                                    |
| `HONO_API_URL`              | No (v2)             | Server-only     | URL of the Hono bot-control API on the user's VPS. Used by the v2 bot-management dashboard. Leave empty in v1                                                                                            |
| `HONO_API_TOKEN`            | No (v2)             | Server-only     | Bearer token for Hono API. Used by the v2 dashboard. Leave empty in v1                                                                                                                                   |
| `ORIGIN`                    | Yes                 | Server-only     | The SvelteKit app's own origin, used for OAuth callbacks and CORS. Set to `http://localhost:5173` in dev, the Vercel URL in prod                                                                         |

## URL structure

| Route                  | Purpose                                                | Auth required                              |
| ---------------------- | ------------------------------------------------------ | ------------------------------------------ |
| `/`                    | All recent logs (no filter), newest first              | No                                         |
| `/logs/:channel`       | Logs for a specific channel                            | No                                         |
| `/logs/:channel/:user` | Logs from a specific user in a specific channel        | No                                         |
| `/channels`            | Channel list with last-message timestamps              | No                                         |
| `/search?q=...`        | Message search (LIKE-based, case-insensitive contains) | No                                         |
| `/login`               | Sign in                                                | No (redirects to `/` if already signed in) |
| `/signup`              | Create an account                                      | No (redirects to `/` if already signed in) |
| `/account`             | Profile page + sign-out form                           | Yes                                        |

## Hosting architecture

```
[Twitch IRC]
     │
     ▼
[Hono API on VPS] ──writes──▶ [PocketBase (hosted)]
                                    │
                                    │ reads
                                    ▼
                       [SvelteKit viewer on Vercel]
                                    │
                                    ▼
                              [Browser user]
```

- The **viewer is read-only**. All writes (new log entries, bot session state,
  command history) go through the Hono API, which talks to PocketBase with
  its own service-role credentials.
- The SvelteKit app authenticates as the PocketBase superuser on a
  per-request basis (`getServerAdminPb` in `src/lib/server/pocketbase.ts`)
  to read locked collections like `channels` (null rules) when displaying
  the channel list.

## Deployment to Vercel

1. Push the repo to GitHub.
2. Import the repo in Vercel.
3. Vercel auto-detects SvelteKit and uses the `@sveltejs/adapter-vercel`.
4. In Vercel → Settings → Environment Variables, set:
   - `PUBLIC_POCKETBASE_URL` → `https://pb.niller.xyz` (or your hosted PB URL)
   - `POCKETBASE_ADMIN_EMAIL` → admin email
   - `POCKETBASE_ADMIN_PASSWORD` → admin password
   - `ORIGIN` → the Vercel-assigned URL (e.g. `https://flup-app.vercel.app`)
5. Deploy. Vercel will run `bun install && bun run build` and serve the
   output from `.vercel/output/`.

The SvelteKit app does not cache the admin token across requests — every
request that needs `adminPb` re-authenticates against PocketBase (this is
intentional for serverless cold starts; see the [roadmap](#roadmap-deferred)
for a KV cache).

## PocketBase CORS configuration

Once deployed, the SvelteKit viewer on Vercel will make cross-origin
requests to PocketBase. Configure CORS in the PocketBase admin UI:

1. Open the PocketBase admin UI (e.g. `https://pb.niller.xyz/_/`).
2. Go to **Settings → Application**.
3. Under **Allowed origins**, add:
   - `http://localhost:5173` (for dev)
   - `https://flup-app.vercel.app` (or your Vercel URL)
4. **Never use `*`** with credentials — PocketBase will reject it, and you
   shouldn't be working around that.

## OAuth provider setup (TODO for v2)

The `users` collection in PocketBase has OAuth2 enabled with field mapping
for `name` → `name` and `avatarURL` → `avatar`. Providers are runtime config
(not in the migration):

1. Open the PB admin UI.
2. Go to the `users` collection → **Options → Auth → OAuth2 providers**.
3. Click **Add provider** and select GitHub / Google / Twitch / etc.
4. Fill in the client ID and secret from the OAuth provider.
5. Set the redirect URL to `https://<your-pocketbase-url>/api/oauth2-redirect`.
6. Test by clicking the OAuth button on the login page (the v1 login page
   doesn't have OAuth buttons yet — that's a v2 dashboard task).

## Schema management

The schema lives in two complementary files:

- `pb_migrations/` — JS migration files, applied in order by PocketBase
  on startup (when `--automigrate` is on, which is the default for
  `dev:pb` and `dev:pb:isolated`).
- `pb_schema.json` — a JSON export of the post-migration schema, used as
  the source of truth for the verification script.

### Creating a new migration

```bash
./pocketbase migrate create "add_emotes_table"
# → creates pb_migrations/<timestamp>_add_emotes_table.js
```

Edit the generated file, then restart the running PB instance to apply.

### Verifying a migration

```bash
bash scripts/verify-migration.sh
```

This spins up a fresh PocketBase in a `mktemp` throwaway directory (never
touches your live `pb_data/`), applies the migrations, dumps the live
schema via the admin REST API, normalizes both the live schema and
`pb_schema.json`, and diffs them. A non-empty diff is a fidelity bug.

The script also performs an **idempotency probe** by restarting PB on the
same data dir and confirming the collection count is unchanged.

The migration at `pb_migrations/1700000000_init.js` is **idempotent** (uses
an `upsertCollection` helper that skips if a collection already exists).
Safe to run on top of an existing instance.

## Type generation

When the schema changes:

1. Update or add a migration in `pb_migrations/`.
2. Apply it to your live instance (or use `bun run pb:types` directly
   against the live instance — the typegen tool runs migrations implicitly
   via the admin API).
3. Run `bun run pb:types` to regenerate `src/lib/pocketbase/types.ts`.

The generated types drive:

- The `TypedPocketBase` cast in `src/lib/server/pocketbase.ts` and
  `src/lib/pocketbase/client.ts`.
- The route handlers' `getList<LogsResponse>(...)` and
  `getFullList<ChannelsResponse>(...)` calls.
- The `App.Locals` types in `src/app.d.ts`.

`src/lib/pocketbase/types.ts` is **generated — do not edit it by hand**.

## Admin client security checklist

- **Never `console.log(pb)` or `console.log(locals.pb)`** — the auth store
  contains the admin token in memory.
- **Never serialize the admin client in error reports** (Sentry, etc.) —
  strip `pb` and `adminPb` from any captured locals.
- The `POCKETBASE_ADMIN_EMAIL` / `POCKETBASE_ADMIN_PASSWORD` env vars are
  **server-only** (no `PUBLIC_` prefix). Set them in Vercel as **encrypted
  production env vars**, not as plain `Development` vars.
- **Rotation procedure**:
  1. Change the admin password in the PB admin UI.
  2. Update `POCKETBASE_ADMIN_PASSWORD` in Vercel.
  3. Redeploy the SvelteKit app. The per-request admin client re-auths on
     the next request, no manual restart needed.
  4. If you also use the Hono API and it caches the admin token, restart
     the Hono service.

## Smoke test (manual)

After `bun run dev` is up, verify everything works in a browser:

```bash
bun run check  # 0 errors
bun run lint   # 0 errors (on files you touched)
bun run build  # produces .vercel/output/
```

Then in the browser at `http://localhost:5173`:

- [ ] Homepage shows recent logs (or the empty state)
- [ ] `/channels` shows the channel list (or empty)
- [ ] Click a channel → `/logs/:channel`
- [ ] Click a user in a log row → `/logs/:channel/:user`
- [ ] `/search?q=test` returns matches (or empty)
- [ ] `/signup` creates a new user and signs you in
- [ ] `/login` signs in an existing user
- [ ] `/account` shows the logged-in user
- [ ] Sign out clears the cookie and the header reverts to "Sign in / Sign up"

## Roadmap (deferred)

- **v2** — Bot management dashboard (a separate SvelteKit admin app that
  calls the Hono API on the VPS)
- **v2** — Realtime log tailing via SSE on the server side
- **v2** — Full-text search (Meilisearch or Typesense) — PocketBase's `~`
  filter operator is SQL `LIKE`, not real FTS
- **v2** — DOMPurify sanitization of `log.html` for XSS protection if logs
  ever come from less-trusted sources
- **v2** — Vercel KV cache for the admin auth token to skip the bcrypt
  round-trip on warm requests

## Project layout

```
flup.app/
├── src/
│   ├── app.d.ts                          — App.Locals type augmentation
│   ├── app.html                          — SvelteKit HTML shell
│   ├── hooks.server.ts                   — per-request pb client + cookie hydration
│   ├── lib/
│   │   ├── server/
│   │   │   └── pocketbase.ts             — getServerPb / getServerAdminPb helpers
│   │   ├── pocketbase/
│   │   │   ├── types.ts                  — GENERATED, do not edit
│   │   │   └── client.ts                 — browser-side client factory
│   │   ├── components/
│   │   │   └── LogRow.svelte             — chat-log row component
│   │   ├── assets/                       — static assets imported via $lib
│   │   ├── index.ts                      — $lib barrel (placeholder)
│   │   └── utils.ts                      — cn() helper (clsx + tailwind-merge)
│   └── routes/
│       ├── +layout.svelte                — header + search bar + dark-mode toggle
│       ├── +layout.server.ts             — exposes user to layout
│       ├── +layout.css                   — Tailwind v4 entry + custom layers
│       ├── +page.svelte                  — homepage (recent logs)
│       ├── +page.server.ts               — queries logs collection
│       ├── channels/                     — channel list
│       │   ├── +page.svelte
│       │   └── +page.server.ts           — uses adminPb to read locked `channels`
│       ├── logs/
│       │   ├── +page.ts                  — re-export of [channel] page
│       │   ├── [channel]/                — per-channel logs
│       │   │   ├── +page.svelte
│       │   │   └── +page.server.ts
│       │   └── [channel]/[user]/         — per-user-in-channel logs
│       │       ├── +page.svelte
│       │       └── +page.server.ts
│       ├── search/                       — message search (LIKE-based)
│       │   ├── +page.svelte
│       │   └── +page.server.ts
│       ├── login/                        — sign in
│       │   ├── +page.svelte
│       │   └── +page.server.ts
│       ├── signup/                       — create account
│       │   ├── +page.svelte
│       │   └── +page.server.ts
│       └── account/                      — profile + sign out
│           ├── +page.svelte
│           └── +page.server.ts
├── pb_migrations/
│   └── 1700000000_init.js                — idempotent migration, 9 user collections
├── pb_schema.json                        — schema export (source of truth for verify)
├── scripts/
│   ├── setup-pocketbase.sh               — downloads + verifies PB binary
│   └── verify-migration.sh               — non-destructive fidelity check
├── static/                               — served at /
│   └── robots.txt
├── pocketbase                            — the binary (gitignored)
├── pb_data/                              — live PocketBase data (gitignored)
├── pb_data_dev/                          — disposable dev data (gitignored)
├── .env.example                          — env template
├── svelte.config.js                      — SvelteKit + Vercel adapter
├── vite.config.ts                        — Vite + Tailwind v4 plugin
├── tailwind.config.js                    — (Tailwind v4 uses CSS-first; this is mostly shadcn presets)
├── eslint.config.js                      — flat ESLint config
├── tsconfig.json                         — TypeScript + SvelteKit paths
├── components.json                       — shadcn-svelte config
├── package.json
└── bun.lock
```
