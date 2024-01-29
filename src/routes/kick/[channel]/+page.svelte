<script lang="ts">
	import type { PageData } from './$types';
	import Hls from 'hls.js';
	import type { KickChannelInfo } from './channel.type';
	import { onMount } from 'svelte';
	export let data: PageData;

	$: parsedData = data.channelInfo;

	let videoEl: HTMLMediaElement;

	onMount(() => {
		if (Hls.isSupported() && data.channelInfo.livestream) {
			const hls = new Hls();

			console.log(data.channelInfo);

			hls.on(Hls.Events.MEDIA_ATTACHED, function () {
				videoEl.muted = true;
				videoEl.play();
			});
			hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
				console.log('manifest loaded, found ' + data.levels.length + ' quality level');
			});
			hls.loadSource(data.channelInfo.playback_url);
			// bind them together
			hls.attachMedia(videoEl);
		}
	});
</script>

<main class="flex gap-4 items-center justify-center h-full flex-col">
	<div class="flex gap-4 items-center justify-center">
		<div class="avatar">
			<div class="w-24 rounded">
				<img
					src={parsedData.user?.profile_pic}
					alt={`${parsedData.user?.username} profile picture`}
				/>
			</div>
		</div>
		<div class="flex flex-col">
			<span class="text-3xl">{parsedData.user?.username}</span>
			{#if parsedData.livestream}
				<span class="text-success">LIVE</span>
				<div class="flex gap-4">
					<a href={`https://kick.com/${parsedData.slug}`} class="link">Kick</a>
					<a href={`${parsedData.playback_url}`} class="link">Direct link (For VLC/MPV)</a>
				</div>
			{:else}
				<span class="text-error">OFFLINE</span>
			{/if}
		</div>
	</div>
	{#if parsedData.livestream}
		<video bind:this={videoEl} controls autoplay class="w-full aspect-video">
			<track kind="captions" />
		</video>
	{/if}
</main>

<!-- <pre>
	{JSON.stringify(parsedData, null, 2)}
</pre> -->
