<script lang="ts">
	import Nav from '../lib/components/Nav.svelte';
	import '../app.css';
	import { inject } from '@vercel/analytics';
	inject();
</script>

<svelte:head>
	<title>Flupbot</title>
</svelte:head>

<div class="p-4 h-screen">
	<Nav />
	<slot />
</div>
