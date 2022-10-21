<script lang="ts">
	import { each } from 'svelte/internal';
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="flex flex-col mt-5 gap-5">
	<div class="alert shadow-lg bg-neutral">
		<div>
			<span>{data.prediction.input?.prompt}</span>
		</div>
	</div>
	<div
		class="grid grid-cols-1  m-auto gap-4  "
		class:lg:grid-cols-2={data.prediction.output.length > 1}
	>
		{#each data.prediction.output as image}
			<img src={image} alt={data.prediction.input?.prompt} class="rounded-lg" />
		{/each}
	</div>
</main>
