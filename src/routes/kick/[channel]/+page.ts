import type { PageLoad } from './$types';
import type { KickChannelInfo } from './channel.type';

const getChannelInfo = async (channel: string) => {
	const res = await fetch(`https://kick.com/api/v2/channels/${channel}`);
	const data = await res.text();
	return data;
};

export const load: PageLoad = ({ params }) => ({
	channelInfo: getChannelInfo(params.channel)
});
