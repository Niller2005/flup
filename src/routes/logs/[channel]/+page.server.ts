// src/routes/logs/[channel]/+page.server.ts
//
// Per-channel log list. Verifies the channel exists (so /logs/anything
// returns 404 instead of an empty page for a typo) and paginates the open
// `logs` collection, newest first.

import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ChannelsResponse, LogsResponse } from '$lib/pocketbase/types';
import { getServerAdminPb } from '$lib/server/pocketbase';

const LOGS_PER_PAGE = 50;

export const load: PageServerLoad = async ({ params, url, locals, request }) => {
	// Strip a leading # from the URL — the bot sometimes stores channels with
	// a # prefix and sometimes without. Both `/logs/niller2005` and
	// `/logs/%23niller2005` should resolve to the same logical channel.
	const urlChannel = decodeURIComponent(params.channel).trim().replace(/^#/, '');
	if (!urlChannel) throw error(404, 'Channel not found');

	const adminPb = await getServerAdminPb({ request, locals });

	// Verify the channel exists. channels has null rules, so we need admin.
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

	// Fetch logs for this channel — query BOTH `name` and `#name` variants since
	// the bot may have written logs under either. We don't tie this to which
	// channel record was matched above.
	const escaped = channel.replace(/"/g, '\\"');
	const filter = `channel = "${escaped}" || channel = "#${escaped}"`;
	const result = await locals.pb.collection('logs').getList<LogsResponse>(page, LOGS_PER_PAGE, {
		filter,
		sort: '-created'
	});

	return {
		channel: channelRecord,
		logs: result.items,
		page: result.page,
		perPage: result.perPage,
		totalItems: result.totalItems,
		totalPages: result.totalPages
	};
};
