// src/routes/api/logs/+server.ts
//
// GET /api/logs?page=N&perPage=M&channel=...&user=...&q=...
//
// JSON API for the open `logs` collection. Powers the LogList
// infinity-scroll component; also useful for any future programmatic
// access. Returns the same shape the page server loads return, so
// LogList can use either source interchangeably for initial state.
//
// Auth: `logs` has open listRule/viewRule, so locals.pb (the
// per-request user-facing client) is sufficient. No admin needed.

import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { LogsResponse } from '$lib/pocketbase/types';

const MAX_PER_PAGE = 200;
const DEFAULT_PER_PAGE = 200;
const MAX_QUERY_LENGTH = 100;

export const GET: RequestHandler = async ({ url, locals }) => {
	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));
	const perPage = Math.min(
		MAX_PER_PAGE,
		Math.max(1, Number(url.searchParams.get('perPage') ?? DEFAULT_PER_PAGE))
	);
	const channel = url.searchParams.get('channel')?.trim() || undefined;
	const user = url.searchParams.get('user')?.trim() || undefined;
	const q = url.searchParams.get('q')?.trim().slice(0, MAX_QUERY_LENGTH) || undefined;

	let filter: string | undefined;
	if (channel && user) {
		filter = locals.pb.filter('channel = {:channel} && user = {:user}', { channel, user });
	} else if (channel) {
		filter = locals.pb.filter('channel = {:channel}', { channel });
	} else if (q) {
		// Escape backslashes and double quotes for the LIKE pattern
		const escaped = q.replace(/[\\"]/g, '\\$&');
		filter = locals.pb.filter('message ~ {:q}', { q: `%${escaped}%` });
	}

	const result = await locals.pb.collection('logs').getList<LogsResponse>(page, perPage, {
		filter,
		sort: '-created'
	});

	return json({
		items: result.items,
		page: result.page,
		perPage: result.perPage,
		totalItems: result.totalItems,
		totalPages: result.totalPages
	});
};
