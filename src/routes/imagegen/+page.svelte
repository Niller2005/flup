<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;
</script>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<main
	class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5 gap-4"
>
	{#each data.predictions.results as prediction}
		{#if prediction.status === 'succeeded' && prediction.source === 'api'}
			<a href={`/imagegen/${prediction.id}`} class="card bg-neutral shadow-xl text-neutral-content">
				{#if prediction.output.length === 1}
					<img
						src={prediction.output?.at(0)}
						alt={prediction.input?.prompt.replace('mdjrny-v4 style', '')}
					/>
				{:else}
					<figure class="flex flex-wrap">
						{#each prediction.output as output}
							<!-- content here -->
							<img
								src={output}
								alt={prediction.input?.prompt.replace('mdjrny-v4 style', '')}
								class=" w-1/2"
							/>
						{/each}
					</figure>
				{/if}
				<div class="card-body">
					<p class=" text-lg">{prediction.input?.prompt.replace('mdjrny-v4 style', '')}</p>
				</div>
			</a>
		{/if}
	{/each}
</main>
