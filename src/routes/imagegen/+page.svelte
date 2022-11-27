<script lang="ts">
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let nextPage = data.predictions.next || '';
	let predictions = data.predictions.results;
	let isLoadMore = false;

	const loadMore = async () => {
		const res = await fetch(`/api/predictions?cursor=${nextPage.split('=')[1]}`);
		const data = await res.json();
		nextPage = data.next;
		predictions = [...predictions, ...data.results];
	};

	const onScroll = (e) => {
		const offset =
			e.target.scrollingElement.scrollHeight -
			e.target.scrollingElement.clientHeight -
			e.target.scrollingElement.scrollTop;

		if (offset <= 1000) {
			if (!isLoadMore && nextPage !== '') {
				loadMore();
			}
			isLoadMore = true;
		} else {
			isLoadMore = false;
		}
	};
</script>

<svelte:window on:scroll={onScroll} />

<!-- <pre>{JSON.stringify(predictions, null, 2)}</pre> -->
<div class="flex flex-col gap-2">
	<main
		class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mt-5 gap-4"
	>
		{#each predictions as prediction}
			{#if prediction.status === 'succeeded' && prediction.source === 'api' && prediction.id !== 'jh7jfcimeff5no5jatuv4zrwja'}
				<a
					href={`/imagegen/${prediction.id}`}
					class="card bg-neutral shadow-xl text-neutral-content"
				>
					{#if prediction.output.length === 1}
						<img src={prediction.output?.at(0)} />
					{:else}
						<figure class="flex flex-wrap">
							{#each prediction.output as output}
								<!-- content here -->
								<img src={output} class=" w-1/2" />
							{/each}
						</figure>
					{/if}
					<div class="card-body">
						{#if prediction.input?.positive_prompt}
							<!-- content here -->
							<p class=" text-lg">{prediction.input?.positive_prompt}</p>
						{:else}
							<p class=" text-lg">{prediction.input?.prompt?.replace('mdjrny-v4 style', '')}</p>
						{/if}
					</div>
				</a>
			{/if}
		{/each}
	</main>
	{#if nextPage !== ''}
		<button class="btn" on:click={loadMore}>Load more</button>
	{/if}
</div>
