<script lang="ts">
	import Card from '../components/card.svelte';
	import Portrait from '../components/portrait.svelte';

	export let data;

	const top3 = data.players.slice(0, 3);

	const cards = data.players.slice(3);
</script>

<div class="mt-16 text-center font-beaufort">
	<h2 class="text-4xl text-gold-4 font-bold mb-2">TOP 3</h2>
	<img src="/decorator-hr-lg.png" alt="" class="max-w-52 m-auto mb-4" />
	<div class="flex flex-col items-center justify-center gap-4 md:flex-row md:items-end">
		{#if top3[0]}
			<div class="order-1 md:order-2">
				<Card class="w-[288px]" size="lg" info={top3[0]} />
			</div>
		{/if}
		{#if top3[1]}
			<div class="order-1 md:order-1">
				<Card class="w-[288px] md:w-[240px]" size="sm" info={top3[1]} />
			</div>
		{/if}
		{#if top3[2]}
			<div class="order-1 md:order-3">
				<Card class="w-[288px] md:w-[240px]" size="sm" info={top3[2]} />
			</div>
		{/if}
	</div>
</div>

<h1 class="text-4xl text-center font-bold text-gold-4 mt-10">CRIMINOSOS</h1>

<div class="flex w-full items-center justify-center mt-10">
	<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
		{#each cards as player}
			<Portrait info={player} />
		{/each}
	</div>
</div>
