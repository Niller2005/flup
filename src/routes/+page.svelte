<script lang="ts">
	// src/routes/+page.svelte
	//
	// Homepage: the most recent chat logs across all channels, newest first.
	// Data comes from +page.server.ts which queries the open `logs` collection.

	import type { PageProps } from './$types';
	import LogList from '$lib/components/LogList.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Recent chat logs · flup.app</title>
	<meta
		name="description"
		content="Browse the most recent Twitch chat logs captured by the flup.app bot."
	/>
</svelte:head>

<section>
	<h1 class="mb-4 text-xl font-bold text-zinc-900 dark:text-zinc-100">Recent chat logs</h1>
	<LogList initialLogs={data.logs} initialPage={data.page} initialTotalPages={data.totalPages} />
</section>
