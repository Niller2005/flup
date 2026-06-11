<script lang="ts">
	// src/routes/login/+page.svelte
	//
	// Sign-in form. Posts to ?/signIn; on success SvelteKit follows the 303
	// to /account. On failure the server action returns `fail()` with the
	// error message which we render above the form. The `use:enhance`
	// callback keeps the form a real form (works without JS) but skips the
	// full page reload on JS-enabled submissions.

	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { ActionData, PageProps } from './$types';

	let { form }: PageProps & { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Sign in · flup.app</title>
	<meta name="description" content="Sign in to your flup.app account." />
</svelte:head>

<section class="mx-auto flex max-w-sm flex-col gap-6">
	<header>
		<h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Sign in</h1>
		<p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
			Welcome back. Enter your credentials to continue.
		</p>
	</header>

	{#if form?.error}
		<div
			class="rounded border border-red-300 bg-red-50 px-4 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
			role="alert"
		>
			{form.error}
		</div>
	{/if}

	<form
		method="POST"
		action="?/signIn"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
		class="flex flex-col gap-4"
	>
		<label class="flex flex-col gap-1">
			<span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Email</span>
			<input
				type="email"
				name="email"
				value={form?.email ?? ''}
				required
				autocomplete="email"
				class="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
			/>
		</label>
		<label class="flex flex-col gap-1">
			<span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</span>
			<input
				type="password"
				name="password"
				required
				autocomplete="current-password"
				minlength="8"
				class="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
			/>
		</label>
		<button
			type="submit"
			disabled={submitting}
			class="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
		>
			{submitting ? 'Signing in…' : 'Sign in'}
		</button>
	</form>

	<p class="text-center text-sm text-zinc-600 dark:text-zinc-400">
		Don't have an account?
		<a href={resolve('/signup')} class="font-medium text-zinc-900 underline dark:text-zinc-100"
			>Sign up</a
		>
	</p>
</section>
