<script lang="ts">
	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';
	import bars3Solid from '@iconify/icons-heroicons/bars-3-solid';
	import type { PageLink } from '$lib/types/pagelink';

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
		</ul>
	</div>
</div>
