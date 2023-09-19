import type { PageLoad } from './$types';

// const getChannelInfo = async (channel: string) => {
// 	const res = await fetch(`https://kick.com/api/v2/channels/${channel}`);
// 	const data = await res.text();
// 	return data;
// };

export const load: PageLoad = async ({ params, fetch }) => {
	const res = await fetch(`/api/v2/channels/${params.channel}`);
	const data = await res.text();
	console.log(data);

	return {
		channelInfo: data
	};
};
