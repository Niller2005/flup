<script lang="ts">
	import type { Input } from '$lib/types/predictions';
	import type { PageServerData } from './$types';

	export let data: PageServerData;

	let nextPage = data.predictions.next || '';
	let predictions = data.predictions.results;
	let isLoadMore = false;
	let blurEnabled = true;

	const nsfwWords = [
		'ass',
		'breast',
		'penis',
		'busty',
		'lingerie',
		'topless',
		'bikini',
		'trap',
		'femboy',
		'pussy',
		'butt',
		'busty',
		'bussy',
		'dildo',
		'anal',
		'sex',
		'futa',
		'cock',
		'dick',
		'nude',
		'bra',
		'naked',
		'nipples'
	];

	const getInput = (input?: Input) => {
		if (input?.positive_prompt) {
			return input.positive_prompt;
		} else {
			return input?.prompt?.replace('mdjrny-v4 style', '');
		}
	};
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
			if (!isLoadMore && nextPage) {
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
			{#if prediction.status === 'succeeded' && prediction.source === 'api' && prediction.input?.max_train_steps !== 2000}
				<a
					href={`/imagegen/${prediction.id}`}
					class="card bg-neutral shadow-xl text-neutral-content"
				>
					{#if prediction.output.length === 1}
						<img
							class:blur-2xl={nsfwWords.some((nw) =>
								getInput(prediction.input)?.toLowerCase().includes(nw)
							)}
							src={`/_vercel/image?url=${encodeURIComponent(prediction.output[0])}&w=500&q=75`}
							alt="AI Generated"
						/>
					{:else}
						<figure
							class="flex flex-wrap"
							class:blur-2xl={nsfwWords.some((nw) =>
								getInput(prediction.input)?.toLowerCase().includes(nw)
							) && blurEnabled}
						>
							{#each prediction.output as output}
								<!-- content here -->
								<img
									src={`/_vercel/image?url=${encodeURIComponent(output)}&w=150&q=75`}
									class=" w-1/2"
									alt="AI Generated"
								/>
							{/each}
						</figure>
					{/if}
					<div class="card-body">
						<!-- content here -->
						<p class=" text-lg">{getInput(prediction.input)}</p>
					</div>
				</a>
			{/if}
		{/each}
	</main>
	{#if nextPage}
		<button class="btn" on:click={loadMore}>Load more</button>
	{/if}
</div>
<button
	class="fixed rounded-full bg-primary w-20 h-20 p-4 bottom-4 right-8"
	on:click={() => (blurEnabled = !blurEnabled)}
>
	{#if blurEnabled}
		<img src="//cdn.7tv.app/emote/6346e1b78cb0dce8e422b05a/4x.webp" />
	{:else}
		<img src="//cdn.betterttv.net/emote/5fa99424eca18f6455c2bca5/3x" />
		<!-- else content here -->
	{/if}
</button>
