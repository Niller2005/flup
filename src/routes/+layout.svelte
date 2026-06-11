<script lang="ts">
	// src/routes/+layout.svelte
	//
	// Root layout: dark-mode aware header with brand link, channel nav, and
	// a search form that GETs /search. The body just renders the route's
	// children inside a centered, max-width container.
	//
	// `data.user` is provided by +layout.server.ts and is either a cloned
	// snapshot of the authenticated user record or null when signed out.
	// We render different header links depending on that state.

	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { ModeWatcher } from 'mode-watcher';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();

	// page is now a Svelte 5 state object (SvelteKit ≥ 2.12), so `page.url`
	// is reactive without the old $app/stores subscription dance. The
	// pre-fill of the search box from ?q= now updates as the user paginates
	// or types in the URL bar.
	const currentQuery = $derived(page.url.searchParams.get('q') ?? '');
</script>

<ModeWatcher />
<svelte:head>
	<link rel="icon" href={favicon} />
	<title>flup.app</title>
</svelte:head>

<header
	class="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80"
>
	<div class="container mx-auto flex max-w-4xl items-center gap-4 px-4 py-3">
		<a
			href={resolve('/')}
			class="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100"
			aria-label="flup.app home"
		>
			flup<span class="text-purple-600 dark:text-purple-400">.</span>app
		</a>
		<nav class="flex gap-3 text-sm text-zinc-600 dark:text-zinc-400" aria-label="Primary">
			<a href={resolve('/channels')} class="hover:underline">Channels</a>
		</nav>
		<form
			action="/search"
			method="GET"
			class="ml-auto flex max-w-xs flex-1"
			role="search"
			aria-label="Site search"
		>
			<label for="header-search" class="sr-only">Search messages</label>
			<input
				id="header-search"
				type="search"
				name="q"
				value={currentQuery}
				placeholder="Search messages…"
				maxlength="100"
				autocomplete="off"
				class="w-full rounded border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
			/>
		</form>
		<div class="flex items-center gap-3 text-sm">
			{#if data.user}
				<a
					href={resolve('/account')}
					class="text-zinc-700 hover:underline dark:text-zinc-300"
					aria-label="Open account page"
				>
					{data.user.name || data.user.email}
				</a>
			{:else}
				<a href={resolve('/login')} class="text-zinc-700 hover:underline dark:text-zinc-300"
					>Sign in</a
				>
				<a href={resolve('/signup')} class="text-zinc-700 hover:underline dark:text-zinc-300"
					>Sign up</a
				>
			{/if}
		</div>
	</div>
</header>

<main class="container mx-auto max-w-4xl px-4 py-6">
	{@render children?.()}
</main>
