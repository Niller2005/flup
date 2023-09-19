import { json, text, type RequestHandler } from '@sveltejs/kit';

const getChannelInfo = async (channel?: string) => {
	console.log(channel);
	const res = await fetch(`https://kick.com/api/v2/channels/${channel}`);
	const data = await res.text();

	return data;
};

export const GET: RequestHandler = async ({ url, params }) => {
	return text(await getChannelInfo(`${params.channel}?${url.searchParams}`));
};
