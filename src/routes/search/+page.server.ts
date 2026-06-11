// src/routes/search/+page.server.ts
//
// Full-text-ish search over chat messages.
//
// PocketBase's filter language has no `LIKE`/`ILIKE` operator, but the `~`
// (contains) operator on a text field does a case-insensitive substring
// match — exactly what we want for a chat search box. The `message` field
// on `logs` is the plain-text body (separate from `html`, which contains
// inlined emote <img> tags).
//
// We wrap the user's query in `%...%` for `~` semantics. The query itself
// is interpolated through `pb.filter()` so the SDK handles escaping
// (quotes, backslashes, parens) safely.

import type { PageServerLoad } from './$types';
import type { LogsResponse } from '$lib/pocketbase/types';

const LOGS_PER_PAGE = 50;
const MAX_QUERY_LENGTH = 100;

export const load: PageServerLoad = async ({ url, locals }) => {
	const raw = url.searchParams.get('q') ?? '';
	const q = raw.trim().slice(0, MAX_QUERY_LENGTH);

	if (!q) {
		return {
			q: '',
			logs: [],
			page: 1,
			perPage: LOGS_PER_PAGE,
			totalItems: 0,
			totalPages: 0
		};
	}

	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));

	// pb.filter() escapes the bound param; the surrounding %...% are literal
	// LIKE wildcards and safe to concatenate.
	const filter = locals.pb.filter('message ~ {:q}', { q: `%${q}%` });
	const result = await locals.pb.collection('logs').getList<LogsResponse>(page, LOGS_PER_PAGE, {
		filter,
		sort: '-created'
	});

	return {
		q,
		logs: result.items,
		page: result.page,
		perPage: result.perPage,
		totalItems: result.totalItems,
		totalPages: result.totalPages
	};
};
