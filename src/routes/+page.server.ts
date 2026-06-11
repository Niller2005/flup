// src/routes/+page.server.ts
//
// Homepage: the most recent chat logs across all channels.
//
// `logs` has an open listRule (empty string = anyone can read), so we can
// query it with the per-request user-facing client on locals.pb. No admin
// auth needed.

import type { PageServerLoad } from './$types';
import type { LogsResponse } from '$lib/pocketbase/types';

const RECENT_LOGS_PER_PAGE = 200;

export const load: PageServerLoad = async ({ locals }) => {
	const result = await locals.pb.collection('logs').getList<LogsResponse>(1, RECENT_LOGS_PER_PAGE, {
		sort: '-created'
	});

	return {
		logs: result.items,
		page: result.page,
		perPage: result.perPage,
		totalItems: result.totalItems,
		totalPages: result.totalPages
	};
};
