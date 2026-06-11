<script lang="ts">
	// src/routes/signup/+page.svelte
	//
	// Account creation form. Posts to ?/signUp. On success the server
	// creates the user and immediately signs them in, then redirects to
	// /account. The `use:enhance` callback keeps the form a real form
	// (works without JS) but skips the full page reload on JS-enabled
	// submissions.

	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { ActionData, PageProps } from './$types';

	let { form }: PageProps & { form: ActionData } = $props();
	let submitting = $state(false);
</script>

<svelte:head>
	<title>Sign up · flup.app</title>
	<meta name="description" content="Create a flup.app account." />
</svelte:head>

<section class="mx-auto flex max-w-sm flex-col gap-6">
	<header>
		<h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
			Create an account
		</h1>
		<p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Sign up to start using flup.app.</p>
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
		action="?/signUp"
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
			<span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Name</span>
			<input
				type="text"
				name="name"
				value={form?.name ?? ''}
				required
				maxlength="120"
				autocomplete="name"
				class="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
			/>
		</label>
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
				autocomplete="new-password"
				minlength="8"
				class="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
			/>
			<span class="text-xs text-zinc-500 dark:text-zinc-400">At least 8 characters</span>
		</label>
		<label class="flex flex-col gap-1">
			<span class="text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm password</span>
			<input
				type="password"
				name="passwordConfirm"
				required
				autocomplete="new-password"
				minlength="8"
				class="rounded border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
			/>
		</label>
		<button
			type="submit"
			disabled={submitting}
			class="rounded bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
		>
			{submitting ? 'Creating account…' : 'Sign up'}
		</button>
	</form>

	<p class="text-center text-sm text-zinc-600 dark:text-zinc-400">
		Already have an account?
		<a href={resolve('/login')} class="font-medium text-zinc-900 underline dark:text-zinc-100"
			>Sign in</a
		>
	</p>
</section>
