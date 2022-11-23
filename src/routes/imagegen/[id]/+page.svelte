<script lang="ts">
	import { each } from 'svelte/internal';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="flex flex-col mt-5 gap-5">
	<div
		class="flex flex-wrap m-auto place-content-center gap-4 max-w-screen-lg place-items-center"
		class:md:grid-cols-2={data.prediction.output.length > 1}
	>
		<div class="alert shadow-lg bg-neutral max-w-lg md:max-w-5xl">
			<span>{data.prediction.input?.prompt.replace('mdjrny-v4 style', '')}</span>
		</div>
		{#each data.prediction.output as image}
			<img
				src={image}
				alt={data.prediction.input?.prompt.replace('mdjrny-v4 style', '')}
				class="rounded-lg grow max-w-lg w-full md:w-5/12"
			/>
		{/each}
	</div>
</main>
