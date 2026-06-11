// src/routes/logs/+page.ts
//
// Bare `/logs` (no channel) is not a meaningful page — redirect to the
// homepage's "all recent logs" view. 307 preserves the request method in
// case anyone ever POSTs here, though that shouldn't happen.

import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	throw redirect(307, '/');
};
