<main class="flex flex-col justify-center items-center h-full">
	<!-- Intro Message -->
	<span class="text-xl">Welcome, fatty</span>
	<img
		src="//cdn.7tv.app/emote/63fd2d890fd141cefb09397d/4x.webp"
		loading="lazy"
		alt=""
	/>
	<!-- Navigation -->
	<h2>Enter the website address below and hit Enter:</h2>
	<!-- Input Box Navigation -->
	<input on:keydown={handleKeyPress} type="text" placeholder="Favorite Streamer" id="urlBox"/> 
	<!-- Button Navigation -->
	<h2>Or</h2>
	<h2>Choose your favorite streamer below.</h2>
	<button on:click={updateUrlXQC} class="btn btn-primary">XQC</button>
</main>

<script lang="ts">
	import { goto } from "$app/navigation";

	// Handle KeyPress for "Enter" key. If true, navigate URL to Kick site for text in input box.
	const handleKeyPress = (e: { keyCode: any; which: any; }) => {
		var key=e.keyCode || e.which;
		if(key==13) {
			let url = window.location.href + "/" + document.getElementById("urlBox").value; // It works, but why is it red... I also don't like the idea of getElementById. There must be a more elegant way to implement this in the HTML above?
			//console.log(url); Logging for testing
			goto(url);
		}
	}

	// Kick URL for XQC
	const updateUrlXQC = () => {
		let url = window.location.href + "/" + "XQC";
		goto(url);
	}

</script>