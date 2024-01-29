import type { PageLoad } from './$types';
import type { KickChannelInfo } from './channel.type';

// const getChannelInfo = async (channel: string) => {
// 	const res = await fetch(`https://kick.com/api/v2/channels/${channel}`);
// 	const data = await res.text();
// 	return data;
// };

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/v2/channels/${params.channel}`);
	res.headers.append('Access-Control-Allow-Origin', '*');
	const data: KickChannelInfo = await res.json();

	return {
		channelInfo: data
	};
};
