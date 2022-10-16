<script lang="ts">
	import Nav from '../lib/components/Nav.svelte';
	import '../app.css';
</script>

<div class="p-4 h-screen">
	<Nav />
	<slot />
</div>
