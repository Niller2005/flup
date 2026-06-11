<script lang="ts">
	// src/lib/components/LogList.svelte
	//
	// Reusable chat-log list with infinity scroll. Each page passes the
	// initial page from its `data` props; subsequent pages are fetched
	// from /api/logs as the user scrolls an IntersectionObserver sentinel.
	//
	// The reset `$effect` re-initializes internal state when the parent
	// navigates to a new list (e.g., /logs/foo → /logs/bar, or a new
	// search query) — SvelteKit reuses the component and updates props,
	// but keeps the same instance.

	import { onMount } from 'svelte';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import type { LogsResponse } from '$lib/pocketbase/types';
	import LogRow from './LogRow.svelte';

	type Props = {
		initialLogs: LogsResponse[];
		initialPage?: number;
		initialTotalPages?: number;
		perPage?: number;
		maxLogs?: number; // Stop loading more when logs.length >= maxLogs (default 2000)
		channel?: string;
		user?: string;
		q?: string;
	};

	let {
		initialLogs,
		initialPage = 1,
		initialTotalPages = 1,
		perPage = 200,
		maxLogs = 2000,
		channel,
		user,
		q
	}: Props = $props();

	let logs = $state<LogsResponse[]>([]);
	let page = $state<number>(1);
	let totalPages = $state<number>(1);
	let totalItems = $state<number>(0);
	let loading = $state<boolean>(false);
	let sentinel: HTMLDivElement | undefined = $state();

	// Reset internal state from the parent's initial props. Runs on mount
	// and again whenever the parent navigates to a new list (SvelteKit
	// updates the props on the same component instance). Reads of the
	// initial-* props track; writes to our own state don't.
	$effect(() => {
		logs = [...initialLogs];
		page = initialPage;
		totalPages = initialTotalPages;
		totalItems = 0;
	});

	async function loadMore() {
		if (loading || page >= totalPages || logs.length >= maxLogs) return;
		loading = true;
		try {
			const params = new SvelteURLSearchParams();
			params.set('page', String(page + 1));
			params.set('perPage', String(perPage));
			if (channel) params.set('channel', channel);
			if (user) params.set('user', user);
			if (q) params.set('q', q);

			const res = await fetch(`/api/logs?${params.toString()}`);
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			const data: {
				items: LogsResponse[];
				page: number;
				perPage: number;
				totalItems: number;
				totalPages: number;
			} = await res.json();

			logs = [...logs, ...data.items];
			page = data.page;
			totalPages = data.totalPages;
			totalItems = data.totalItems;
		} catch (err) {
			console.error('[LogList] loadMore failed:', err);
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		if (!sentinel) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) loadMore();
			},
			{ rootMargin: '400px' }
		);
		observer.observe(sentinel);
		// The observer fires once on observe() with the current intersection
		// state, so a sentinel that's already visible (very short lists)
		// triggers loadMore automatically — no separate initial check needed.
		return () => observer.disconnect();
	});
</script>

<div class="flex flex-col gap-2">
	{#if !loading && logs.length === 0}
		<div
			class="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900"
		>
			<p class="text-sm font-medium text-zinc-700 dark:text-zinc-300">No logs to display</p>
		</div>
	{:else}
		<ol class="flex flex-col gap-2" aria-label="Chat logs">
			{#each logs as log (log.id)}
				<li>
					<LogRow {log} />
				</li>
			{/each}
		</ol>

		{#if loading}
			<p class="py-2 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading more…</p>
		{:else if logs.length >= maxLogs && page < totalPages}
			<p class="py-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
				Showing {new Intl.NumberFormat().format(logs.length)} of {new Intl.NumberFormat().format(totalItems)} messages
				(<a class="underline hover:no-underline" href={channel ? `/logs/${encodeURIComponent(channel)}` : '/'}>load more</a>
				or refine your search)
			</p>
		{:else if page >= totalPages && logs.length > 0}
			<p class="py-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
				{new Intl.NumberFormat().format(logs.length)} messages loaded
			</p>
		{/if}
	{/if}

	<div bind:this={sentinel} class="h-1" aria-hidden="true"></div>
</div>
