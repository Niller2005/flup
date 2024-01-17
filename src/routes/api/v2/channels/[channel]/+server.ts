import { type RequestHandler, json, type Config } from '@sveltejs/kit';

export const config: Config = {
	runtime: 'edge'
};

const getChannelInfo = async (channel?: string) => {
	const response = await fetch(`https://kick.com/api/v2/channels/${channel}`);

	const data = await response.text();

	return data;
};

export const GET: RequestHandler = async ({ url, params }) => {
	return json(await getChannelInfo(`${params.channel}`));
};
