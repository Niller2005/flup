<script>
	let count = 0;
	const increment = () => {
		count += 1;
	};
</script>

<main class="flex flex-col justify-center items-center h-full">
	<img
		src="//cdn.discordapp.com/attachments/660333004861734935/1009164695149760562/nillerWavemonakS-4.gif"
		loading="lazy"
		alt=""
	/>
	<span class="text-5xl">Alo bois</span>
	<span class="text-xs">Fatty was here</span>
		<button class="btn" on:click={increment}> Click me {count} tiames</button>

</main>
