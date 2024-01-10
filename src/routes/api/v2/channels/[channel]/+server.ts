import { text, type RequestHandler, json } from '@sveltejs/kit';

const getChannelInfo = async (channel?: string) => {
	const response = await fetch(`https://kick.com/api/v2/channels/${channel}`);

	const data = await response.text();

	return JSON.parse(data);
};

export const GET: RequestHandler = async ({ url, params }) => {
	return json(await getChannelInfo(`${params.channel}`));
};
