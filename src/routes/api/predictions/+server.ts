import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { REPLICATE_API_TOKEN } from '$env/static/private';
import type { Predictions } from '$lib/types/predictions';

export const GET: RequestHandler = async ({ params, url }) => {
	const response = await fetch(
		`https://api.replicate.com/v1/predictions?cursor=${url.searchParams.get('cursor')}`,
		{
			headers: {
				Authorization: `Token ${REPLICATE_API_TOKEN}`,
				'Content-Type': 'application/json'
			}
		}
	);

	const predictions: Predictions = await response.json();
	return json(predictions);
};
