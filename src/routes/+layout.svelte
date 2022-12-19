<script lang="ts">
	import Nav from '../lib/components/Nav.svelte';
	import '../app.css';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/vitals';
	import { page } from '$app/stores';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({ path: $page.url, params: $page.params, analyticsId });
	}
</script>

<svelte:head>
	<title>Flupbot</title>
</svelte:head>

<div class="p-4 h-screen">
	<Nav />
	<slot />
</div>
