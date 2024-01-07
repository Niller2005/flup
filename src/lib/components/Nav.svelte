<script lang="ts">
	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';
	import bars3Solid from '@iconify/icons-heroicons/bars-3-solid';
	import type { PageLink } from '$lib/types/pagelink';
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	export let pages: PageLink[];
</script>

<div class="navbar bg-neutral text-neutral-content shadow rounded-lg">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-xl" href="/">Flupbot</a>
	</div>
	<div class="flex-none lg:hidden">
		<label for="nav-drawer" class="btn btn-square btn-ghost">
			<Icon icon={bars3Solid} class="w-7 h-7" />
		</label>
	</div>
	<div class="flex-none hidden lg:block">
		<ul class="menu menu-horizontal p-0">
			{#each pages as page}
				<li><a href={page.href}>{page.title}</a></li>
			{/each}

			{#if $page.data.session?.user}
				<button on:click={() => signOut()}>
					<img
						src={$page.data.session.user.image}
						class="rounded-full overflow-hidden h-16 p-2"
						alt="twitch profile"
					/>
				</button>
			{:else}
				<li>
					<button on:click={() => signIn('twitch')} class="btn btn-primary">LOGIN</button>
				</li>
			{/if}
		</ul>
	</div>
</div>
