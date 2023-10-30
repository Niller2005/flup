<script lang="ts">
	import Nav from '../lib/components/Nav.svelte';
	import '../app.css';
	import type { PageLink } from '$lib/types/pagelink';
	import { browser } from '$app/environment';
	import { webVitals } from '$lib/vitals';
	import { page } from '$app/stores';

	const pages: PageLink[] = [
		{ title: 'Music', href: '/music' },
		{ title: 'Generated images', href: '/imagegen' }
	];

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	$: if (browser && analyticsId) {
		webVitals({ path: $page.url, params: $page.params, analyticsId });
	}
</script>

<svelte:head>
	<title>Flupbot</title>
</svelte:head>

<div class=" h-screen drawer drawer-end">
	<input id="nav-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col p-4">
		<Nav {pages} />
		<slot />
		<pre>{JSON.stringify($page.data.session?.user, null, 2)}</pre>
	</div>
	<div class="drawer-side">
		<label for="nav-drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 divide-y divide-base-content bg-base-100">
			{#each pages as page}
				<li><a href={page.href}>{page.title}</a></li>
			{/each}
		</ul>
	</div>
</div>
