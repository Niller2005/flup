// src/hooks.server.ts
//
// SvelteKit request hook: per-request PocketBase client setup.
//
// 1. Create a per-request user-facing client from the pb_auth cookie.
// 2. If the cookie has a valid token, refresh it via authRefresh. On failure,
//    clear the auth store (L7 from the plan review: ALWAYS clear on refresh
//    failure).
// 3. Populate event.locals.pb and event.locals.user for the request.
// 4. Append the updated pb_auth cookie to the response so the client picks up
//    any token rotation.
// 5. event.locals.adminPb is null here; it's populated lazily by
//    getServerAdminPb(event) on the first admin-needing call.

import type { Handle } from '@sveltejs/kit';
import type { UsersRecord } from '$lib/pocketbase/types';
import { getServerPb } from '$lib/server/pocketbase';

const handle: Handle = async ({ event, resolve }) => {
	const pb = getServerPb(event);

	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch {
			// Refresh failed (expired token, revoked, etc.) — always clear.
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = pb.authStore.record
		? structuredClone(pb.authStore.record as unknown as UsersRecord)
		: undefined;
	event.locals.adminPb = null; // populated lazily by getServerAdminPb

	const response = await resolve(event);
	response.headers.append('set-cookie', pb.authStore.exportToCookie());
	return response;
};

export { handle };
