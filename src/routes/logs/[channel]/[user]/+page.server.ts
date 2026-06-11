// src/routes/logs/[channel]/[user]/+page.server.ts
//
// Per-user-in-channel log list. Same shape as the per-channel page, but
// adds a `user =` predicate to the filter.

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ChannelsResponse, LogsResponse } from '$lib/pocketbase/types';
import { getServerAdminPb } from '$lib/server/pocketbase';

const LOGS_PER_PAGE = 50;

export const load: PageServerLoad = async ({ params, url, locals, request }) => {
	// Strip a leading # from the URL — the bot sometimes stores channels with
	// a # prefix and sometimes without. Both `/logs/niller2005/...` and
	// `/logs/%23niller2005/...` should resolve to the same logical channel.
	const urlChannel = decodeURIComponent(params.channel).trim().replace(/^#/, '');
	const user = decodeURIComponent(params.user).trim();
	if (!urlChannel || !user) throw error(404, 'Not found');

	const adminPb = await getServerAdminPb({ request, locals });

	// Verify the channel exists (typo on the channel part should 404).
	// Try matching both variants: with and without leading #.
	let channelRecord: ChannelsResponse;
	try {
		const escaped = urlChannel.replace(/"/g, '\\"');
		channelRecord = await adminPb
			.collection('channels')
			.getFirstListItem<ChannelsResponse>(`channel = "${escaped}" || channel = "#${escaped}"`);
	} catch {
		throw error(404, `No such channel: ${urlChannel}`);
	}

	// Use the actual channel name (with or without #) from the matched record
	// for subsequent log queries — that way the log filter matches the exact
	// format the bot used when writing the logs.
	const channel = channelRecord.channel;

	const page = Math.max(1, Number(url.searchParams.get('page') ?? 1));

	// Fetch logs for this user in this channel — query BOTH `name` and `#name`
	// variants of the channel since the bot may have written logs under either.
	const escapedChannel = channel.replace(/"/g, '\\"');
	const escapedUser = user.replace(/"/g, '\\"');
	const filter = `(channel = "${escapedChannel}" || channel = "#${escapedChannel}") && user = "${escapedUser}"`;
	const result = await locals.pb.collection('logs').getList<LogsResponse>(page, LOGS_PER_PAGE, {
		filter,
		sort: '-created'
	});

	return {
		channel: channelRecord,
		user,
		logs: result.items,
		page: result.page,
		perPage: result.perPage,
		totalItems: result.totalItems,
		totalPages: result.totalPages
	};
};
