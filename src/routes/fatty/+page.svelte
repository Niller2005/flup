<main class="flex flex-col justify-center items-center h-full">
	<!-- svelte-ignore a11y-img-redundant-alt -->
	<img
		src="//cdn.7tv.app/emote/61427ed40969108b67190411/4x.webp"
		loading="lazy"
		alt="a picture of a very fat frog with a sweaty blue shirt. he is very happy."
	/>
	<span class="text-xl">Fatty was here</span>
	<Counter />
	<TestingThing />

	<button on:click={incremt} class="btn btn-primary">{count}</button>

</main>

<script>
	import Counter from "./Counter.svelte";
	import TestingThing from "./TestingThing.svelte";
	//import FatButton from "./FatButton.svelte"
	//import Aplayer from 
	// Audio Player to be added. No TypeScript declaration file? .d.ts
	// import Aplayer from 'svelte-aplayer/dist/svelte/svelte-aplayer.es.js'
	//import Aplayer from 'H:/Programming/flup-1/node_modules/svelte-aplayer/dist/svelte/svelte-aplayer.es.js'
	import 'svelte-aplayer/dist/svelte/style.css'

	let count = 0;
	const incremt = () => {
		count++;
	}
</script>