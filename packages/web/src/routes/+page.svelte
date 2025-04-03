<script lang="ts">
	import { ProgressRing } from '@skeletonlabs/skeleton-svelte';

	let value = $state(25);
	let max = 100;
</script>

<div class="flex flex-col items-center gap-4">
	<ProgressRing {value} onValueChange={(e) => (value = e.value)} {max} />
	<input type="range" class="input max-w-32" bind:value {max} />
</div>
