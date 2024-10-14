<script lang="ts">
	import Card from '../components/card.svelte';
	import Portrait from '../components/portrait.svelte';
	import type { PlayerInfo } from '../typings';

	export let data;

  const top3 = data.players.slice(0, 3);
  const cards = data.players.slice(3);

	// const cards: PlayerInfo[] = [
	// 	{
	// 		image: '/criminosos/nenemz.png',
	// 		name: 'Nenemz',
	// 		elo: 'GrandMaster'
	// 	},
	// 	{
	// 		image: '/criminosos/dreosh.png',
	// 		name: 'Dreosh',
	// 		elo: 'Master'
	// 	},
	// 	{
	// 		image: '/criminosos/neyans.png',
	// 		name: 'Neyans',
	// 		elo: 'Diamond'
	// 	}
	// ];
</script>

<div class="mt-16 text-center">
	<h2 class="font-beaufort text-4xl text-gold-4 font-bold mb-2">TOP 3</h2>
	<img src="/decorator-hr-lg.png" alt="" class="max-w-52 m-auto mb-4" />
	<div class="flex items-end justify-center gap-4">
    {#each top3 as player}
      <Card class="w-[240px]" size="sm" info={player} />
    {/each}
		<!-- <Card class="w-[240px]" size="sm" info={cards[0]} />
		<Card class="w-[280px]" size="lg" info={cards[1]} />
		<Card class="w-[240px]" size="sm" info={cards[2]} /> -->
	</div>
</div>

<h1 class="font-beaufort text-4xl text-center font-bold text-gold-4 mt-10">CRIMINOSOS</h1>

<div class="grid grid-cols-6 mt-10 gap-4 mx-4">
  {#each cards as player}
    <Portrait info={player} />
  {/each}
</div>

<style lang="postcss">
	/* .decorated {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
	}

	.decorated::before,
	.decorated::after {
		content: '';
		display: inline-block;
		height: 16px;
		aspect-ratio: 1.8;
		background-size: contain;
	}

	.decorated::before {
		background-image: url('./decorator-left.png');
	}

	.decorated::after {
		background-image: url('./decorator-right.png');
	} */
</style>
