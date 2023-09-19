<script lang="ts">
	import type { PageData } from './$types';
	import type { KickChannelInfo } from './channel.type';
	export let data: PageData;

	$: parsedData =
		data.channelInfo.charAt(0) === '{'
			? (JSON.parse(data.channelInfo) as KickChannelInfo)
			: (data.channelInfo as unknown as KickChannelInfo);
</script>

<!-- <main class="flex gap-4 items-center justify-center h-full">
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
</main> -->

{@html parsedData}
<pre>
	{JSON.stringify(parsedData, null, 2)}
</pre>
