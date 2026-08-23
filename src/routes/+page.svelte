<script lang="ts">
	import Card from '../components/card.svelte';
	import Portrait from '../components/portrait.svelte';
	import type { RankedPlayerInfo, RankingView } from '../typings';

	export let data;

	let ranking: RankingView;
	let top3: RankedPlayerInfo[];
	let bottom3: RankedPlayerInfo[];
	let cards: RankedPlayerInfo[];

	$: ranking = data.ranking;
	$: top3 = ranking.top3;
	$: bottom3 = ranking.bottom3;
	$: {
		const featuredIds = new Set([...top3, ...bottom3].map((player) => player.id));
		cards = ranking.players.filter((player) => !featuredIds.has(player.id));
	}
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

{#if bottom3.length > 0}
	<section class="most-wanted-stage mx-auto mt-20 max-w-6xl px-4 py-12">
		<div class="relative z-10 mb-12 text-center">
			<span class="case-label">UNIDADE DE REPRESSÃO AO WIN RATE</span>
			<h2 class="mt-2 font-beaufort text-4xl font-bold text-gold-1 md:text-5xl">BOTTOM 3</h2>
			<p class="mx-auto mt-3 max-w-2xl text-sm text-gold-1/70">
				Os três menores win rates do Ranking POG ocupam as últimas posições. O menor WR recebe a
				última posição e o destaque da fiscalização.
			</p>
		</div>

		<div
			class="relative z-10 flex flex-col items-center justify-center gap-10 md:flex-row md:items-center"
		>
			{#each bottom3 as player, index}
				<div
					class={index === 0
						? 'order-1 md:order-1'
						: index === 1
							? 'order-2 md:order-3'
							: 'order-3 md:order-2'}
				>
					<Portrait
						info={player}
						featured
						mostWanted={index === 2}
						rankPosition={player.bottomPosition ?? player.overallPosition}
					/>
				</div>
			{/each}
		</div>
	</section>
{/if}

{#if cards.length > 0}
	<div class="mt-16 text-center">
		<span class="case-label">CASOS EM ABERTO</span>
		<h2 class="mt-2 font-beaufort text-4xl font-bold text-gold-4">ARQUIVO CRIMINAL</h2>
		<img src="/decorator-hr-lg.png" alt="" class="m-auto mt-3 max-w-52" />
	</div>

	<div class="mt-10 flex w-full items-center justify-center px-4">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{#each cards as player}
				<Portrait info={player} rankPosition={player.displayPosition} />
			{/each}
		</div>
	</div>
{/if}

<style>
	.most-wanted-stage {
		position: relative;
		overflow: hidden;
		border: 1px solid rgb(200 155 60 / 32%);
		background: radial-gradient(circle at 50% 15%, rgb(153 27 27 / 25%), transparent 38%),
			linear-gradient(180deg, rgb(15 23 32 / 96%), rgb(2 11 20 / 98%));
		box-shadow:
			inset 0 0 80px rgb(0 0 0 / 55%),
			0 24px 80px rgb(0 0 0 / 35%);
	}

	.most-wanted-stage::before,
	.most-wanted-stage::after {
		position: absolute;
		z-index: 0;
		width: 420px;
		height: 26px;
		transform: rotate(-12deg);
		background: repeating-linear-gradient(
			135deg,
			#c89b3c 0,
			#c89b3c 18px,
			#141414 18px,
			#141414 36px
		);
		content: '';
		opacity: 0.14;
	}

	.most-wanted-stage::before {
		top: 35px;
		left: -120px;
	}

	.most-wanted-stage::after {
		right: -120px;
		bottom: 35px;
	}

	.case-label {
		color: #bda36b;
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
</style>
