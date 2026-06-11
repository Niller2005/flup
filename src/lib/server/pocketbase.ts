// src/lib/server/pocketbase.ts
//
// Per-request PocketBase client helpers.
//
// The SvelteKit viewer is deployed to Vercel (serverless), where module-level
// singletons don't work (each cold start is a fresh process). All clients are
// created per-request and cached on event.locals for the duration of that
// request only.
//
// - getServerPb(event)         — user-facing client, hydrated from pb_auth cookie
// - getServerAdminPb(event)    — superuser client for reading locked collections
//
// Both clients authenticate lazily on first call within the request. The admin
// client caches its authenticated state on event.locals.adminPb so the same
// request only does one auth round-trip even if called multiple times.
//
// ============================================================================
// SvelteKit data-flow rules for PocketBase
// ----------------------------------------------------------------------------
// When working with `locals.pb`, `locals.adminPb`, and `locals.user` in any
// SvelteKit route:
//
// 1. `locals.pb` and `locals.adminPb` are server-only — never return them from
//    a `load()` function. SvelteKit serializes `load()` return values via
//    `devalue`, and PocketBase client instances are not serializable (they
//    hold live class references, auth state, and event listeners).
//
// 2. `locals.user` should be `structuredClone`'d before being returned from
//    `load()` — `pb.authStore.record` is a live reference; cloning it ensures
//    SvelteKit serializes a stable snapshot. The hooks.server.ts already does
//    this; if you re-fetch and assign `locals.user` in a route action, clone
//    it before returning.
//
// 3. All routes that call `locals.pb` or `locals.adminPb` MUST be `.server.ts`
//    (not `.ts`) — `.ts` files in SvelteKit run on both server and client; the
//    PocketBase client is server-only. Using `.server.ts` guarantees the file
//    only runs on the server.
//
// 4. PUBLIC_* env vars MUST be read from `$env/dynamic/public`, not
//    `$env/dynamic/private`. SvelteKit filters any var whose name starts with
//    `PUBLIC_` out of the private module — a read from the wrong module
//    returns `undefined` silently (no warning). The two modules are
//    intentionally separated: `private` is server-only, `public` is bundled
//    to the client. We import both below and use the appropriate one per var.
// ============================================================================

import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '$lib/pocketbase/types';

// Note: PB_URL is resolved at call time inside each function rather than at
// module load, because module-level reads of $env/dynamic/private can break
// Vite's postbuild analysis (which runs in a process that doesn't inherit
// the runtime env). The per-function check still produces a fail-fast
// experience for runtime callers — the server will throw on the first
// request, not the first import.

/**
 * Create a per-request, user-facing PocketBase client.
 * Hydrates auth from the incoming `pb_auth` cookie.
 * The client is a fresh PocketBase instance per request (no shared state).
 */
export function getServerPb(event: { request: Request }): TypedPocketBase {
	if (!publicEnv.PUBLIC_POCKETBASE_URL) {
		throw new Error('PUBLIC_POCKETBASE_URL is not set');
	}
	const pb = new PocketBase(publicEnv.PUBLIC_POCKETBASE_URL) as TypedPocketBase;
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	return pb;
}

/**
 * Create a per-request superuser (admin) client for reading locked collections
 * like `channels`, `botSessions`, `emotes`, etc. that have null rules.
 *
 * Authenticates lazily on first call within the request. Caches the
 * in-flight auth promise on event.locals.adminPb so concurrent callers
 * within the same request share a single auth round-trip. Each new request
 * gets a fresh client (Vercel serverless constraint).
 *
 * Race fix (H1 from the Phase 4 review): without caching the Promise, two
 * concurrent awaits in the same request can both observe a falsy
 * `adminPb`, both call `authWithPassword`, and both write a fresh client
 * back — wasting a PocketBase auth round-trip and risking inconsistency if
 * one of them throws after the other has already cached a successful
 * client. By storing the in-flight promise synchronously *before* the
 * first await, any concurrent caller awaits the same promise.
 */
export async function getServerAdminPb(event: {
	request: Request;
	locals: App.Locals;
}): Promise<TypedPocketBase> {
	// If we already have a cached admin client (resolved or pending), return it.
	// This prevents the race where two concurrent calls both see a falsy
	// adminPb and both trigger a fresh authWithPassword.
	if (event.locals.adminPb) {
		return event.locals.adminPb;
	}

	if (!privateEnv.POCKETBASE_ADMIN_EMAIL || !privateEnv.POCKETBASE_ADMIN_PASSWORD) {
		throw new Error('POCKETBASE_ADMIN_EMAIL and POCKETBASE_ADMIN_PASSWORD must be set');
	}

	// Build the promise synchronously so we can store it BEFORE the first await.
	// Any concurrent caller will see the in-flight promise and await it instead
	// of starting a second auth.
	const authPromise = (async (): Promise<TypedPocketBase> => {
		const pb = new PocketBase(publicEnv.PUBLIC_POCKETBASE_URL!) as TypedPocketBase;
		try {
			await pb.admins.authWithPassword(privateEnv.POCKETBASE_ADMIN_EMAIL!, privateEnv.POCKETBASE_ADMIN_PASSWORD!);
		} catch (err) {
			console.error('[pocketbase] admin auth failed:', err);
			throw err;
		}
		return pb;
	})();

	event.locals.adminPb = authPromise;
	return authPromise;
}
