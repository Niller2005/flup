import { SvelteKitAuth } from '@auth/sveltekit';
import Twitch from '@auth/core/providers/twitch';
import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [Twitch({ clientId: TWITCH_CLIENT_ID, clientSecret: TWITCH_CLIENT_SECRET })]
});
