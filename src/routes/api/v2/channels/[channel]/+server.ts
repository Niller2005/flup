import { text, type RequestHandler } from '@sveltejs/kit';

const getChannelInfo = async (channel?: string) => {
	const url = 'https://flaresolverr.niller.xyz/v1';
	const options = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: `{"cmd":"request.get","url":"https://kick.com/api/v2/channels/${channel}"}`
	};

	const response = await fetch(url, options);
	const data = await response.json();

	return data.solution.response.replace(/<html>|<head>|<body>|<\/html>|<\/head>|<\/body>/gi, '');
};

export const GET: RequestHandler = async ({ url, params }) => {
	return text(await getChannelInfo(`${params.channel}`));
};
