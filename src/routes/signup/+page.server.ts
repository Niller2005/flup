// src/routes/signup/+page.server.ts
//
// Account creation flow:
//   1. Validate inputs at the boundary (Parse, Don't Validate).
//   2. Create the user via the public createRule on the `users` auth
//      collection. This is the documented PocketBase way to sign up.
//   3. Immediately sign the new user in so they don't have to retype their
//      password. authWithPassword populates pb.authStore; hooks.server.ts
//      exports the cookie.
//
// We never modify any existing user record; this action only creates new
// users via the public collection.create() path.

import { fail, redirect } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) {
		throw redirect(303, '/account');
	}
	return {};
};

export const actions: Actions = {
	signUp: async ({ request, locals }) => {
		const data = await request.formData();
		const email = String(data.get('email') ?? '')
			.trim()
			.toLowerCase();
		const password = String(data.get('password') ?? '');
		const passwordConfirm = String(data.get('passwordConfirm') ?? '');
		const name = String(data.get('name') ?? '').trim();

		if (!email || !password || !name) {
			return fail(400, { error: 'All fields are required', email, name });
		}
		if (password.length < 8) {
			return fail(400, { error: 'Password must be at least 8 characters', email, name });
		}
		if (password !== passwordConfirm) {
			return fail(400, { error: 'Passwords do not match', email, name });
		}

		try {
			await locals.pb.collection('users').create({
				email,
				password,
				passwordConfirm,
				name
			});
			await locals.pb.collection('users').authWithPassword(email, password);
		} catch (err) {
			if (err instanceof ClientResponseError) {
				return fail(400, { error: err.message, email, name });
			}
			throw err;
		}

		throw redirect(303, '/account');
	}
};
