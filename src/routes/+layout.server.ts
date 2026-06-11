// src/routes/+layout.server.ts
//
// Root layout server load: exposes the authenticated user (or null) to the
// layout and all child routes. The user is cloned to a stable snapshot so
// SvelteKit's devalue serializer can round-trip it safely (pb.authStore.record
// is a live reference — see src/lib/server/pocketbase.ts for the full rule).
//
// This is a server-only file; `locals.user` and `locals.pb` are server-only
// state, so the file MUST stay `.server.ts` and not become plain `.ts`.

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user ? structuredClone(locals.user) : null
	};
};
