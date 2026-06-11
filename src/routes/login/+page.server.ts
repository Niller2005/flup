// src/routes/login/+page.server.ts
//
// Login form action. On success the per-request PocketBase client (locals.pb)
// holds the new auth token, hooks.server.ts exports it to the pb_auth cookie
// on the way out, and we redirect to /account.
//
// We never persist a session across the request boundary here; the cookie
// export in hooks.server.ts is what keeps the user signed in.

import { fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	// Already authenticated? Skip the form.
	if (locals.user) {
		throw redirect(303, '/account');
	}
	return {};
};

export const actions: Actions = {
	signIn: async ({ request, locals }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '')
			.trim()
			.toLowerCase();
		const password = String(data.get('password') ?? '');

		if (!email || !password) {
			return fail(400, { error: 'Email and password are required', email });
		}

		try {
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (err) {
			if (err instanceof ClientResponseError) {
				return fail(400, { error: err.message, email });
			}
			throw err;
		}

		throw redirect(303, '/account');
	}
};
