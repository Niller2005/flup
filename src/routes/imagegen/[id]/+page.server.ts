import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { REPLICATE_API_TOKEN } from '$env/static/private';
import type { Prediction } from '$lib/types/predictions';

export const load: PageServerLoad = async ({ params }) => {
	const response = await fetch(`https://api.replicate.com/v1/predictions/${params.id}`, {
		headers: {
			Authorization: `Token ${REPLICATE_API_TOKEN}`,
			'Content-Type': 'application/json'
		}
	});

	const prediction: Prediction = await response.json();

	if (prediction) return { prediction };

	throw error(404, 'Not found');
};
