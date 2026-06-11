// src/app.d.ts
//
// SvelteKit app type augmentation. locals types come from the SvelteKit
// request hook in src/hooks.server.ts.
//
// SvelteKit data-flow rules (apply to all routes that use these):
//   - locals.pb is server-only — never return from load()
//   - locals.adminPb is server-only — never return from load()
//   - locals.user should be structuredClone'd before returning from load()
//   - All routes that call locals.pb must be .server.ts (not .ts)

import type { TypedPocketBase, UsersRecord } from '$lib/pocketbase/types';

declare global {
	namespace App {
		interface Locals {
			pb: TypedPocketBase;
			user?: UsersRecord;
			// adminPb holds the in-flight (or resolved) auth promise so
			// concurrent callers share one auth round-trip per request.
			adminPb: TypedPocketBase | Promise<TypedPocketBase> | null;
		}
	}
}

export {};
