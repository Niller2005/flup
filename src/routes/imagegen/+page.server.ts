import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { REPLICATE_API_TOKEN } from '$env/static/private';
import type { Predictions } from '$lib/types/predictions';

export const load: PageServerLoad = async () => {
	const response = await fetch('https://api.replicate.com/v1/predictions', {
		headers: {
			Authorization: `Token ${REPLICATE_API_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	const predictions: Predictions = await response.json();

	if (predictions) return { predictions };

	throw error(404, 'Not found');
};
