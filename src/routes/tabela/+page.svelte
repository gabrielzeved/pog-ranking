<script lang="ts">
	import RankingTable from '../../components/ranking-table.svelte';
	import type { RankingView } from '../../typings';

	export let data: { ranking: RankingView };
</script>

<svelte:head>
	<title>Tabela completa | POG Ranking</title>
	<meta
		name="description"
		content="Compare Elo, LP, win rate e histórico recente de todos os jogadores do POG Ranking."
	/>
</svelte:head>

<main class="mx-auto min-h-[70vh] max-w-7xl px-4 pb-16 pt-20 md:px-8 md:pt-24">
	<header class="mb-8 text-center">
		<span class="text-[10px] font-bold uppercase tracking-[.24em] text-[#bda36b]"
			>Classificação geral</span
		>
		<h1 class="mt-2 font-beaufort text-4xl font-bold text-gold-1 md:text-5xl">TABELA COMPLETA</h1>
		<img src="/decorator-hr-lg.png" alt="" class="mx-auto mt-3 max-w-52" />
		<p class="mx-auto mt-4 max-w-2xl text-sm text-gold-1/55">
			Ordene qualquer coluna para comparar os jogadores. Clique em uma linha para consultar as três
			partidas ranqueadas mais recentes.
		</p>
	</header>

	<RankingTable players={data.ranking.players} />
</main>
