<script lang="ts">
	import Nav from '../lib/components/Nav.svelte';
	import '../app.css';
	import { inject } from '@vercel/analytics';
	import type { PageLink } from '$lib/types/pagelink';
	inject();
	const pages: PageLink[] = [
		{ title: 'Music', href: '/music' },
		{ title: 'Generated images', href: '/imagegen' }
	];
</script>

<svelte:head>
	<title>Flupbot</title>
</svelte:head>

<div class=" h-screen drawer drawer-end">
	<input id="nav-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col p-4">
		<Nav {pages} />
		<slot />
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
