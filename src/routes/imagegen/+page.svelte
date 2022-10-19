<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<main class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mt-5 gap-4">
	{#each data.predictions.results as prediction}
		{#if prediction.status === 'succeeded' && prediction.source === 'api'}
			<div class="card bg-neutral shadow-xl text-neutral-content">
				<figure><img src={prediction.output?.at(0)} alt={prediction.input?.prompt} /></figure>
				<div class="card-body">
					<p class=" text-lg">{prediction.input?.prompt}</p>
				</div>
			</div>
		{/if}
	{/each}
</main>
