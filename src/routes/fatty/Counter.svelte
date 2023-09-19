<script lang="ts">
	let count = 5;
	$: doubled = count * 2;

	const increment = () => {
		count += 2;
	}
</script>

<div id="counter">
	<button class="btn btn-primary" on:click={increment}>
		Incremented: {count} {count === 1 ? 'time': 'times'} 
	</button>

	<p>{count} doubled is {doubled}</p>
</div>