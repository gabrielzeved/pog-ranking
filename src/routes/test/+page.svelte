<script lang="ts">
	import ModelViewer from '../../components/model-viewer.svelte';

	let container: HTMLDivElement;
</script>

<div class="group relative h-[500px] w-[300px]" bind:this={container}>
	{#if container}
		<ModelViewer {container} champion="talon" />
	{/if}
</div>
