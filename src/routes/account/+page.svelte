<script lang="ts">
	// src/routes/account/+page.svelte
	//
	// Authenticated account page. Shows the user's name, email, verification
	// status, and ID; provides a sign-out form that posts to ?/signOut.

	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let signingOut = $state(false);
</script>

<svelte:head>
	<title>Account · flup.app</title>
	<meta name="description" content="Manage your flup.app account." />
</svelte:head>

<section class="mx-auto flex max-w-md flex-col gap-6">
	<header>
		<h1 class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">Account</h1>
		<p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Your signed-in flup.app profile.</p>
	</header>

	<dl
		class="flex flex-col gap-4 rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
	>
		<div>
			<dt class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
				Name
			</dt>
			<dd class="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
				{data.user.name || '(not set)'}
			</dd>
		</div>
		<div>
			<dt class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
				Email
			</dt>
			<dd class="mt-1 text-sm text-zinc-900 dark:text-zinc-100">{data.user.email}</dd>
		</div>
		<div>
			<dt class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
				Email verified
			</dt>
			<dd class="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
				{data.user.verified ? 'Yes' : 'No'}
			</dd>
		</div>
		<div>
			<dt class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
				User ID
			</dt>
			<dd class="mt-1 font-mono text-xs text-zinc-500 dark:text-zinc-400">{data.user.id}</dd>
		</div>
	</dl>

	<form
		method="POST"
		action="?/signOut"
		use:enhance={() => {
			signingOut = true;
			return async ({ update }) => {
				await update();
				signingOut = false;
			};
		}}
	>
		<button
			type="submit"
			disabled={signingOut}
			class="rounded border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-800 dark:bg-zinc-900 dark:text-red-300 dark:hover:bg-red-900/20"
		>
			{signingOut ? 'Signing out…' : 'Sign out'}
		</button>
	</form>
</section>
