// src/routes/channels/+page.server.ts
//
// Channel directory: every channel the bot is tracking, with a per-channel
// log count.
//
// `channels` has null rules (locked), so we read it through the admin
// client. `logs` is open to anyone, but we use the admin client for the
// per-channel count to keep the load function on a single auth surface and
// avoid mixing two clients in the same request.

import type { PageServerLoad } from './$types';
import type { ChannelsResponse } from '$lib/pocketbase/types';
import { getServerAdminPb } from '$lib/server/pocketbase';

export const load: PageServerLoad = async ({ locals, request }) => {
	const adminPb = await getServerAdminPb({ request, locals });

	const channels = await adminPb.collection('channels').getFullList<ChannelsResponse>({
		sort: 'channel'
	});

	// Per-channel log count: one cheap `getList(1, 1)` per channel. This is
	// N+1; for the current scale (handful of channels) it's fine. If the
	// channel count grows, switch to a single `getList` of `logs` and group
	// in memory, or use a /api/channels/summary endpoint with a denormalized
	// counter on the channels record.
	const channelsWithCounts = await Promise.all(
		channels.map(async (channel) => {
			const safe = (channel.channel ?? '').replace(/"/g, '\\"');
			const filter = `channel = "${safe}"`;
			const result = await adminPb.collection('logs').getList(1, 1, { filter });
			return {
				id: channel.id,
				channel: channel.channel ?? '',
				logCount: result.totalItems
			};
		})
	);

	return { channels: channelsWithCounts };
};
