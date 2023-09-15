<script>
	import { Player, Hls, DefaultUi } from '@vime/svelte';
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@vime/core@^5/themes/default.css" />
</svelte:head>

<Player theme="dark" style="--vm-player-theme: #e86c8b;">
	<Hls crossOrigin poster="https://media.vimejs.com/poster.png">
		<source
			data-src="https://video-weaver.cph01.hls.live-video.net/v1/playlist/CswFsUFQfex2-yLzYe_YmJn9n_ZZHYhi1Fk3UTlyA-IbnpFAL1Y8BWOelnGCn0-OFO8Nd43x6SSZIy6VhwhSd3xhsnMnOtuQn2BO_jkhdEeKE3QPwKSoaY0WaOQjfPwf4u4DTVzrJ6yjybCX9mo4DZozkFpVVYZ3sls7hFR0XlF9Af-IJIf7H8mgSwPAgcMqT3ydXCaJeI-n9QCb4SxB3V5Y50x58_3BVy6sEWBld8gSlv74nQRurwRYa3HVxvX0mmrag2Q-jBnoc3rredbDS-xTbohWchrsnKEPiawwh4Q2LUWeYFUI-9QqQ5D1K7d1aJSLCtoO8DZsqdwu6nKKv1OZBnnTJnlr-SSa9rmxlzRYI_sVOfgE2xz68Hp7kagHJlTLwuhfdVPI4Gxi-yJJAeHhAV-UGQ6hdutplAHCfnVSJYBd2w4CcMMXW2Ijij1UY0vHw7lbMIGeGCovyAwNMFBDY7EvTkIAEnuPI2HjVJBKrb4ABNO-4SDciWZUDKhm_pg8vcnPhiGc75MAOCGc6Snyb8sgC_foy13r5h-ddg3MYhedL24TWVVXfJuzECTZshkxm8L_vnXZCZh4D_uSnImeL4VCWA2y1mmipQVy7IAyNLiqC0G3Dp2TxqZtdIgFHmYytPJ4fb2sBZDjvOCAPkdkFmYtCT00hEd25hN0GOjSKZgerct9K1ryxFxBg2qoxUdkP-zqwWC3pp7rFADi6hgVtPg52Sw6lP681yKAjYu21T-srWSSBQY5NWzwX_6lfek_3BR8PZurtRKhOVmBUvXECcZXW-qKfo_vdUAX4yoYc24iRSUIN1I0tmOT6YrokrzxPQdI3DqqxSMYJz-TBCkm6DG7NeqKQqEHfTKrSdeokwl_wQhnXqao3MFy1eIPVSHvr8rP62EOoDl13Fs1A1MREm9RCd0OgI6z7WcjA4w55h7XqP5B_1TSmoUVbRgaDDmZQJkGmHd77_ARsyABKgl1cy1lYXN0LTIwwgc.m3u8"
			type="application/x-mpegURL"
		/>
	</Hls>

	<DefaultUi />
</Player>
