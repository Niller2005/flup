// src/routes/account/+page.server.ts
//
// Authenticated account page. The load function returns a serializable
// snapshot of locals.user (the live auth record is cloned so the layout
// +page.svelte can render it without holding a reference to the auth
// store).
//
// The signOut action clears the in-request auth store; hooks.server.ts
// writes the now-empty cookie back to the response so the browser
// discards the session.

import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}
	return {
		user: structuredClone(locals.user)
	};
};

export const actions: Actions = {
	signOut: async ({ locals }) => {
		locals.pb.authStore.clear();
		throw redirect(303, '/');
	}
};
