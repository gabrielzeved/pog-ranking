<script lang="ts">
	import Card from '../components/card.svelte';
	import Portrait from '../components/portrait.svelte';
	import { getRankedLpGap, HORS_CONCOURS_LP_GAP } from '../sdk/ranking';
	import type { RankedPlayerInfo, RankingView } from '../typings';

	export let data;

	let ranking: RankingView;
	let horsConcours: RankedPlayerInfo | null;
	let horsConcoursGap = 0;
	let showHorsConcours = false;
	let top3: RankedPlayerInfo[];
	let bottom3: RankedPlayerInfo[];
	let cards: RankedPlayerInfo[];
	const lpFormatter = new Intl.NumberFormat('pt-BR');

	$: ranking = data.ranking;
	$: {
		const eligiblePlayers = ranking.ranking.length > 0 ? ranking.ranking : ranking.top3;
		const leader = eligiblePlayers[0];
		const runnerUp = eligiblePlayers[1];
		const leaderGap = leader && runnerUp ? getRankedLpGap(leader, runnerUp) : 0;

		horsConcours = leaderGap > HORS_CONCOURS_LP_GAP ? leader : null;
		horsConcoursGap = horsConcours ? leaderGap : 0;
		top3 = eligiblePlayers.slice(horsConcours ? 1 : 0, horsConcours ? 4 : 3);
	}
	$: bottom3 = ranking.bottom3;
	$: {
		const featuredIds = new Set(
			[...(horsConcours ? [horsConcours] : []), ...top3, ...bottom3].map((player) => player.id)
		);
		cards = ranking.players.filter((player) => !featuredIds.has(player.id));
	}
</script>

{#if horsConcours}
	<section class="hors-concours-stage mx-auto mt-14 max-w-3xl">
		<button
			type="button"
			class="hors-concours-summary"
			aria-expanded={showHorsConcours}
			aria-controls="hors-concours-details"
			on:click={() => (showHorsConcours = !showHorsConcours)}
		>
			<span class="hors-concours-crown" aria-hidden="true">♛</span>
			<span class="hors-concours-player">
				<span>HORS CONCOURS</span>
				<strong>{horsConcours.gameName}</strong>
				<small>{horsConcours.tier} · {horsConcours.leaguePoints} PDL</small>
			</span>
			<span class="lp-gap-badge">
				<strong>+{lpFormatter.format(horsConcoursGap)}</strong>
				<span>PDL de vantagem</span>
			</span>
			<span class="hors-concours-toggle">
				{showHorsConcours ? 'Recolher' : 'Ver destaque'}
				<span class:expanded={showHorsConcours} aria-hidden="true">⌄</span>
			</span>
		</button>

		{#if showHorsConcours}
			<div id="hors-concours-details" class="hors-concours-details">
				<div class="max-w-xs text-center md:text-left">
					<span class="case-label">FORA DA DISPUTA</span>
					<h2 class="mt-2 font-beaufort text-3xl font-bold text-gold-1">LÍDER ISOLADO</h2>
					<p class="mt-3 text-sm leading-relaxed text-gold-1/70">
						Uma vantagem grande demais para uma disputa justa. O líder ocupa uma categoria própria,
						enquanto o pódio fica aberto aos demais jogadores.
					</p>
				</div>

				<div class="hors-concours-card">
					<Card class="w-[220px]" size="sm" info={horsConcours} />
				</div>
			</div>
		{/if}
	</section>
{/if}

<div class="mt-16 text-center font-beaufort">
	<h2 class="text-4xl text-gold-4 font-bold mb-2">TOP 3</h2>
	{#if horsConcours}
		<p class="mb-2 text-xs uppercase tracking-[0.2em] text-gold-1/60">
			Pódio disputado pelos demais jogadores
		</p>
	{/if}
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
	.hors-concours-stage {
		position: relative;
		overflow: hidden;
		border: 1px solid rgb(200 155 60 / 32%);
		background: linear-gradient(100deg, rgb(200 155 60 / 8%), transparent 38%), rgb(2 11 20 / 82%);
		box-shadow:
			inset 0 0 35px rgb(200 155 60 / 5%),
			0 10px 30px rgb(0 0 0 / 24%);
	}

	.hors-concours-summary {
		position: relative;
		z-index: 1;
		display: grid;
		width: 100%;
		grid-template-columns: auto 1fr auto auto;
		align-items: center;
		gap: 16px;
		padding: 14px 18px;
		color: #f0e6d2;
		text-align: left;
		transition: background-color 180ms ease;
	}

	.hors-concours-summary:hover {
		background: rgb(200 155 60 / 7%);
	}

	.hors-concours-summary:focus-visible {
		outline: 2px solid #e8c26b;
		outline-offset: -3px;
	}

	.hors-concours-crown {
		color: #d6b65f;
		font-size: 27px;
		line-height: 1;
		text-shadow: 0 0 12px rgb(232 194 107 / 35%);
	}

	.hors-concours-player {
		display: flex;
		min-width: 0;
		flex-direction: column;
	}

	.hors-concours-player > span {
		color: #bda36b;
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.2em;
	}

	.hors-concours-player strong {
		overflow: hidden;
		font-family: 'beaufort';
		font-size: 18px;
		line-height: 1.2;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.hors-concours-player small {
		color: rgb(240 230 210 / 55%);
		font-size: 9px;
	}

	.lp-gap-badge {
		display: flex;
		border-left: 1px solid rgb(200 155 60 / 25%);
		padding-left: 18px;
		flex-direction: column;
		text-align: right;
	}

	.lp-gap-badge strong {
		color: #d6b65f;
		font-family: 'beaufort';
		font-size: 18px;
		line-height: 1;
	}

	.lp-gap-badge span {
		margin-top: 3px;
		color: rgb(240 230 210 / 50%);
		font-size: 7px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
	}

	.hors-concours-toggle {
		display: flex;
		align-items: center;
		gap: 7px;
		color: rgb(240 230 210 / 55%);
		font-size: 9px;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.hors-concours-toggle span {
		display: inline-block;
		font-size: 15px;
		transition: transform 180ms ease;
	}

	.hors-concours-toggle span.expanded {
		transform: rotate(180deg);
	}

	.hors-concours-details {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 50px;
		border-top: 1px solid rgb(200 155 60 / 18%);
		padding: 28px 20px 34px;
	}

	@media (max-width: 640px) {
		.hors-concours-stage {
			margin-right: 16px;
			margin-left: 16px;
		}

		.hors-concours-summary {
			grid-template-columns: auto 1fr auto;
			gap: 11px;
			padding: 12px 14px;
		}

		.lp-gap-badge {
			padding-left: 12px;
		}

		.hors-concours-toggle {
			grid-column: 2 / 4;
			justify-self: end;
		}

		.hors-concours-details {
			flex-direction: column;
			gap: 28px;
		}
	}

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
