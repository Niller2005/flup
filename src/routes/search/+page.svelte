<script lang="ts">
	// src/routes/search/+page.svelte
	//
	// Full-text search over the `logs.message` field, via the PocketBase
	// `~` (contains) operator. The form is a plain GET so URLs are
	// shareable and the header search bar can post here.
	//
	// LogList takes over rendering + infinity scroll once a query is set.

	import type { PageProps } from './$types';
	import LogList from '$lib/components/LogList.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.q ? `Search: ${data.q}` : 'Search'} · flup.app</title>
	<meta name="description" content="Search chat messages captured by the flup.app bot." />
</svelte:head>

<section class="flex flex-col gap-4">
	<header>
		<h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Search</h1>
	</header>

	<form
		action="/search"
		method="GET"
		class="flex gap-2"
		role="search"
		aria-label="Search chat messages"
	>
		<label for="search-q" class="sr-only">Search query</label>
		<input
			id="search-q"
			type="search"
			name="q"
			value={data.q}
			placeholder="Search messages…"
			maxlength="100"
			autocomplete="off"
			class="flex-1 rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
		/>
		<button
			type="submit"
			class="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
		>
			Search
		</button>
	</form>

	{#if data.q === ''}
		<div
			class="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900"
		>
			<p class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Enter a query above</p>
			<p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
				Substring match is case-insensitive.
			</p>
		</div>
	{:else}
		<LogList
			initialLogs={data.logs}
			initialPage={data.page}
			initialTotalPages={data.totalPages}
			q={data.q}
		/>
	{/if}
</section>
