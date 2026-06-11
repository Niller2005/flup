<script lang="ts">
	// src/lib/components/LogRow.svelte
	//
	// A single chat-log row, classic IRC-style: `date time  user:  message`.
	// Renders `log.html` (bot-trusted HTML with Twitch emote <img> tags inlined)
	// via {@html}. The single-tenant bot is the only writer for v1; v2 should
	// pipe through DOMPurify on write before that trust boundary loosens.

	import { resolve } from '$app/paths';
	import type { LogsResponse } from '$lib/pocketbase/types';

	type Props = {
		log: LogsResponse;
	};

	let { log }: Props = $props();

	const timestamp = $derived(formatTimestamp(log.created));

	function formatTimestamp(iso: string): string {
		const d = new Date(iso);
		const pad = (n: number) => String(n).padStart(2, '0');
		return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
	}
</script>

<div
	class="flex gap-2 border-b border-zinc-200 px-2 py-1 font-mono items-center text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50"
>
	<time
		datetime={log.created}
		title={log.created}
		class="shrink-0 text-zinc-500 tabular-nums dark:text-zinc-400"
	>
		{timestamp}
	</time>
	<a
		href={resolve('/logs/[channel]/[user]', { channel: log.channel, user: log.user })}
		class="shrink-0 font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
	>
		{log.user}:
	</a>
	<!--
		`log.html` is the bot-rendered HTML with Twitch emote <img> tags
		inlined. Trusted for v1 (single-tenant, the bot is the only writer).
		TODO(v2): pipe through DOMPurify on the server before write so we can
		drop this exception once we accept writes from less-trusted sources.
	-->
	<span class="min-w-0 break-words text-zinc-900 dark:text-zinc-100">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html log.html || ''}
	</span>
</div>
