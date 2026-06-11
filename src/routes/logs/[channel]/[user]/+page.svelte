<script lang="ts">
	// src/routes/logs/[channel]/[user]/+page.svelte
	//
	// Per-user-in-channel log list. LogList handles the rendering, empty
	// state, and infinity scroll against /api/logs?channel=...&user=...

	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';
	import LogList from '$lib/components/LogList.svelte';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>Logs from {data.user} in #{data.channel.channel} · flup.app</title>
	<meta
		name="description"
		content="Browse chat messages from {data.user} in the #{data.channel.channel} Twitch channel."
	/>
</svelte:head>

<section class="flex flex-col gap-4">
	<nav class="text-xs text-zinc-500 dark:text-zinc-400" aria-label="Breadcrumb">
		<ol class="flex flex-wrap items-center gap-1">
			<li><a href={resolve('/channels')} class="hover:underline">Channels</a></li>
			<li aria-hidden="true">/</li>
			<li>
				<a
					href={resolve('/logs/[channel]', { channel: data.channel.channel })}
					class="hover:underline"
				>
					#{data.channel.channel}
				</a>
			</li>
			<li aria-hidden="true">/</li>
			<li class="font-medium text-zinc-700 dark:text-zinc-300">{data.user}</li>
		</ol>
	</nav>

	<header>
		<h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
			Logs from <span class="text-purple-700 dark:text-purple-300">{data.user}</span> in
			<span class="text-purple-700 dark:text-purple-300">#{data.channel.channel}</span>
		</h1>
	</header>

	<LogList
		initialLogs={data.logs}
		initialPage={data.page}
		initialTotalPages={data.totalPages}
		channel={data.channel.channel}
		user={data.user}
	/>
</section>
