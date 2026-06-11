<script lang="ts">
	// src/routes/channels/+page.svelte
	//
	// Channel directory: a card grid of every tracked channel with its log
	// count. Each card links to the per-channel log list.

	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Channels · flup.app</title>
	<meta
		name="description"
		content="Browse Twitch channels tracked by the flup.app bot and see how many messages each has logged."
	/>
</svelte:head>

<section class="flex flex-col gap-4">
	<header class="flex flex-wrap items-baseline justify-between gap-2">
		<h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Channels</h1>
		<p class="text-sm text-zinc-500 dark:text-zinc-400">
			{data.channels.length}
			{data.channels.length === 1 ? 'channel' : 'channels'} tracked
		</p>
	</header>

	{#if data.channels.length === 0}
		<div
			class="rounded-lg border border-dashed border-zinc-300 bg-white px-6 py-12 text-center dark:border-zinc-700 dark:bg-zinc-900"
		>
			<p class="text-sm font-medium text-zinc-700 dark:text-zinc-300">No channels yet</p>
			<p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
				Once the bot joins a channel, it'll show up here.
			</p>
		</div>
	{:else}
		<ul class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3" aria-label="Tracked channels">
			{#each data.channels as ch (ch.id)}
				<li>
					<a
						href={resolve('/logs/[channel]', { channel: ch.channel })}
						class="group flex h-full items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
					>
						<div class="min-w-0">
							<p
								class="truncate font-semibold text-zinc-900 group-hover:text-zinc-700 dark:text-zinc-100 dark:group-hover:text-zinc-200"
							>
								#{ch.channel}
							</p>
							<p class="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
								{ch.logCount.toLocaleString()}
								{ch.logCount === 1 ? 'message' : 'messages'}
							</p>
						</div>
						<span
							aria-hidden="true"
							class="text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300"
						>
							→
						</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</section>
