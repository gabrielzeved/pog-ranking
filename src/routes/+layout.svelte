<script>
	import '../app.css';
	import Header from '../components/header.svelte';
</script>

<Header />
<div class="overlay"></div>
<slot />

<style global lang="postcss">
	.overlay {
		z-index: -1;
		background-image: url(/noise.webp);
		-webkit-user-select: none;
		-moz-user-select: none;
		user-select: none;
		width: 100%;
		inset: 0;
		position: absolute;
		background-size: 192px;
		background-repeat: repeat;
		mix-blend-mode: soft-light;
		opacity: 0.15;
		background-position: 0 0;
		pointer-events: none;
	}
</style>
