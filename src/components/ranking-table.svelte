<script lang="ts">
	import { onMount } from 'svelte';
	import { getRecentMatches } from '$lib/players';
	import { RANK_ORDER, TIER_ORDER } from '../sdk/constants';
	import type { RankedPlayerInfo, RecentMatch } from '../typings';

	export let players: RankedPlayerInfo[];

	type SortKey = 'position' | 'player' | 'elo' | 'lp' | 'winRate' | 'wins' | 'losses' | 'games';
	type SortDirection = 'asc' | 'desc';

	const defaultDirections: Record<SortKey, SortDirection> = {
		position: 'asc',
		player: 'asc',
		elo: 'desc',
		lp: 'desc',
		winRate: 'desc',
		wins: 'desc',
		losses: 'desc',
		games: 'desc'
	};
	const columns: Array<{ key: SortKey; label: string }> = [
		{ key: 'position', label: '#' },
		{ key: 'player', label: 'Jogador' },
		{ key: 'elo', label: 'Elo' },
		{ key: 'lp', label: 'LP' },
		{ key: 'winRate', label: 'WR' },
		{ key: 'wins', label: 'Vitórias' },
		{ key: 'losses', label: 'Derrotas' },
		{ key: 'games', label: 'Partidas' }
	];

	let sortKey: SortKey = 'position';
	let sortDirection: SortDirection = 'asc';
	let expandedPlayerId: string | null = null;
	let matchesByPlayer: Record<string, RecentMatch[]> = {};
	let winStreaksByPlayer: Record<string, number> = {};
	let lossStreaksByPlayer: Record<string, number> = {};
	let errorsByPlayer: Record<string, string> = {};
	let loadingByPlayer: Record<string, boolean> = {};
	let sortedPlayers: RankedPlayerInfo[] = [];

	$: sortedPlayers = [...players].sort((a, b) => comparePlayers(a, b, sortKey, sortDirection));

	onMount(() => {
		void preloadRecentMatches();
	});

	function comparePlayers(
		a: RankedPlayerInfo,
		b: RankedPlayerInfo,
		selectedKey: SortKey,
		selectedDirection: SortDirection
	): number {
		let comparison = 0;

		switch (selectedKey) {
			case 'position':
				comparison = a.displayPosition - b.displayPosition;
				break;
			case 'player':
				comparison = a.gameName.localeCompare(b.gameName, 'pt-BR');
				break;
			case 'elo':
				comparison =
					TIER_ORDER.indexOf(a.tier) - TIER_ORDER.indexOf(b.tier) ||
					RANK_ORDER.indexOf(a.rank) - RANK_ORDER.indexOf(b.rank) ||
					a.leaguePoints - b.leaguePoints;
				break;
			case 'lp':
				comparison = a.leaguePoints - b.leaguePoints;
				break;
			case 'winRate':
				comparison = a.winRate - b.winRate;
				break;
			case 'wins':
				comparison = a.wins - b.wins;
				break;
			case 'losses':
				comparison = a.losses - b.losses;
				break;
			case 'games':
				comparison = a.gamesPlayed - b.gamesPlayed;
		}

		const directed = selectedDirection === 'asc' ? comparison : -comparison;
		return directed || a.displayPosition - b.displayPosition;
	}

	function setSort(nextKey: SortKey) {
		if (sortKey === nextKey) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
			return;
		}

		sortKey = nextKey;
		sortDirection = defaultDirections[nextKey];
	}

	function ariaSort(key: SortKey): 'ascending' | 'descending' | 'none' {
		if (sortKey !== key) return 'none';
		return sortDirection === 'asc' ? 'ascending' : 'descending';
	}

	function sortLabel(key: SortKey): string {
		if (sortKey !== key) return '↕';
		return sortDirection === 'asc' ? '↑' : '↓';
	}

	async function loadPlayerMatches(player: RankedPlayerInfo) {
		loadingByPlayer = { ...loadingByPlayer, [player.id]: true };
		errorsByPlayer = { ...errorsByPlayer, [player.id]: '' };

		try {
			const matches = await getRecentMatches(player.id);
			matchesByPlayer = { ...matchesByPlayer, [player.id]: matches };
			winStreaksByPlayer = {
				...winStreaksByPlayer,
				[player.id]: getWinStreak(matches)
			};
			lossStreaksByPlayer = {
				...lossStreaksByPlayer,
				[player.id]: getLossStreak(matches)
			};
		} catch (error) {
			errorsByPlayer = {
				...errorsByPlayer,
				[player.id]:
					error instanceof Error ? error.message : 'Não foi possível carregar as partidas.'
			};
		} finally {
			loadingByPlayer = { ...loadingByPlayer, [player.id]: false };
		}
	}

	async function preloadRecentMatches() {
		const queue = players.filter(
			(player) => !matchesByPlayer[player.id] && !loadingByPlayer[player.id]
		);
		const workerCount = Math.min(3, queue.length);

		await Promise.allSettled(
			Array.from({ length: workerCount }, async () => {
				let player = queue.shift();

				while (player) {
					await loadPlayerMatches(player);
					player = queue.shift();
				}
			})
		);
	}

	function getWinStreak(matches: RecentMatch[]): number {
		let streak = 0;

		for (const match of matches) {
			if (!match.win) break;
			streak += 1;
		}

		return streak;
	}

	function getLossStreak(matches: RecentMatch[]): number {
		let streak = 0;

		for (const match of matches) {
			if (match.win) break;
			streak += 1;
		}

		return streak;
	}

	async function togglePlayer(player: RankedPlayerInfo) {
		if (expandedPlayerId === player.id) {
			expandedPlayerId = null;
			return;
		}

		expandedPlayerId = player.id;
		if (matchesByPlayer[player.id] || loadingByPlayer[player.id]) return;

		await loadPlayerMatches(player);
	}

	function formatWinRate(value: number): string {
		return new Intl.NumberFormat('pt-BR', {
			style: 'percent',
			minimumFractionDigits: 1,
			maximumFractionDigits: 1
		}).format(value);
	}

	function formatDuration(seconds: number): string {
		const wholeSeconds = Math.floor(seconds);
		return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, '0')}`;
	}

	function formatGold(value: number): string {
		return new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1, notation: 'compact' }).format(
			value
		);
	}

	function formatDate(value: string): string {
		return new Intl.DateTimeFormat('pt-BR', {
			day: '2-digit',
			month: 'short',
			hour: '2-digit',
			minute: '2-digit'
		}).format(new Date(value));
	}

	function formatRole(role: string): string {
		return (
			{
				TOP: 'Topo',
				JUNGLE: 'Selva',
				MIDDLE: 'Meio',
				BOTTOM: 'Atirador',
				UTILITY: 'Suporte'
			}[role] ?? 'Posição livre'
		);
	}
</script>

<div class="table-shell">
	<div class="overflow-x-auto">
		<table class="w-full min-w-[920px] border-collapse text-left">
			<thead>
				<tr>
					<th class="w-14"><span class="sr-only">Expandir jogador</span></th>
					{#each columns as column}
						<th aria-sort={ariaSort(column.key)}>
							<button class="sort-button" on:click={() => setSort(column.key)}>
								{column.label}
								<span aria-hidden="true" class:active-sort={sortKey === column.key}>
									{sortLabel(column.key)}
								</span>
							</button>
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each sortedPlayers as player (player.id)}
					<tr
						class:expanded={expandedPlayerId === player.id}
						class:hot-streak-row={(winStreaksByPlayer[player.id] ?? 0) >= 3}
						class:loss-streak-row={(lossStreaksByPlayer[player.id] ?? 0) >= 3}
						class="player-row"
					>
						<td>
							<button
								class="expand-button"
								class:expanded={expandedPlayerId === player.id}
								on:click={() => togglePlayer(player)}
								aria-expanded={expandedPlayerId === player.id}
								aria-label={`${expandedPlayerId === player.id ? 'Recolher' : 'Expandir'} ${player.gameName}`}
								>⌄</button
							>
						</td>
						<td class="position">#{player.displayPosition}</td>
						<td>
							<button class="player-name" on:click={() => togglePlayer(player)}>
								<span class="player-name-line">
									<strong>{player.gameName}</strong>
									{#if (winStreaksByPlayer[player.id] ?? 0) >= 3}
										<span
											class="hot-streak-badge"
											title="Em uma sequência de pelo menos três vitórias"
										>
											<span aria-hidden="true">🔥</span> 3+ vitórias
										</span>
									{:else if (lossStreaksByPlayer[player.id] ?? 0) >= 3}
										<span
											class="loss-streak-badge"
											title="Em uma sequência de pelo menos três derrotas"
										>
											<span aria-hidden="true">💀</span> 3+ derrotas
										</span>
									{/if}
								</span>
								<span class="tag-line">#{player.tagLine}</span>
							</button>
						</td>
						<td>
							<div class="elo-cell">
								<img src={`/emblems/${player.tier.toLowerCase()}.png`} alt="" />
								<span>{player.tier} {player.rank === 'UNRANKED' ? '' : player.rank}</span>
							</div>
						</td>
						<td class="numeric">{player.leaguePoints}</td>
						<td class="numeric win-rate">{formatWinRate(player.winRate)}</td>
						<td class="numeric text-emerald-300">{player.wins}</td>
						<td class="numeric text-red-300">{player.losses}</td>
						<td class="numeric">{player.gamesPlayed}</td>
					</tr>

					{#if expandedPlayerId === player.id}
						<tr class="details-row">
							<td colspan="9">
								<div class="details-content">
									<div class="details-heading">
										<div>
											<span class="eyebrow">Histórico recente</span>
											<h3>Últimas partidas ranqueadas</h3>
										</div>
										<span class="record">{player.wins}V · {player.losses}D na temporada</span>
									</div>

									{#if loadingByPlayer[player.id]}
										<p class="state-message">Consultando a ficha do jogador…</p>
									{:else if errorsByPlayer[player.id]}
										<div class="state-message error-state">
											<p>{errorsByPlayer[player.id]}</p>
											<button on:click={() => loadPlayerMatches(player)}>Tentar novamente</button>
										</div>
									{:else if matchesByPlayer[player.id]?.length}
										<div class="matches-grid">
											{#each matchesByPlayer[player.id] as match}
												<article class:win={match.win} class="match-card">
													<div class="result">
														<span>{match.win ? 'Vitória' : 'Derrota'}</span>
														<small>{formatDate(match.endedAt)}</small>
													</div>
													<div class="champion-avatar">
														<img
															src={`/champions/${match.championId}.png`}
															alt={`Ícone de ${match.championName}`}
															loading="lazy"
														/>
													</div>
													<div class="champion">
														<strong>{match.championName}</strong>
														<span>{formatRole(match.role)}</span>
													</div>
													<div class="kda">
														<strong>{match.kills} / {match.deaths} / {match.assists}</strong>
														<span>KDA</span>
													</div>
													<div class="match-stat">
														<strong>{match.minionsKilled}</strong><span>CS</span>
													</div>
													<div class="match-stat">
														<strong>{match.visionScore}</strong><span>Visão</span>
													</div>
													<div class="match-stat">
														<strong>{formatGold(match.goldEarned)}</strong><span>Ouro</span>
													</div>
													<div class="match-stat">
														<strong>{formatDuration(match.durationSeconds)}</strong><span
															>Duração</span
														>
													</div>
												</article>
											{/each}
										</div>
									{:else}
										<p class="state-message">Nenhuma partida ranqueada recente encontrada.</p>
									{/if}
								</div>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.table-shell {
		overflow: hidden;
		border: 1px solid rgb(200 155 60 / 28%);
		background: rgb(5 15 26 / 92%);
		box-shadow: 0 24px 80px rgb(0 0 0 / 35%);
	}
	th {
		padding: 0;
		border-bottom: 1px solid rgb(200 155 60 / 35%);
		background: rgb(200 155 60 / 7%);
		color: #bda36b;
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.sort-button {
		display: flex;
		width: 100%;
		align-items: center;
		gap: 8px;
		padding: 16px 12px;
		white-space: nowrap;
	}
	.sort-button span {
		color: rgb(189 163 107 / 45%);
		font-size: 14px;
	}
	.sort-button .active-sort {
		color: #c89b3c;
	}
	td {
		padding: 12px;
		border-bottom: 1px solid rgb(240 230 210 / 8%);
		color: rgb(240 230 210 / 82%);
	}
	.player-row {
		transition: background 0.18s ease;
	}
	.player-row:hover,
	.player-row.expanded {
		background: rgb(200 155 60 / 7%);
	}
	.player-row.hot-streak-row {
		background: linear-gradient(90deg, rgb(234 88 12 / 8%), transparent 34%);
	}
	.player-row.hot-streak-row:hover,
	.player-row.hot-streak-row.expanded {
		background: linear-gradient(90deg, rgb(234 88 12 / 14%), rgb(200 155 60 / 6%) 55%);
	}
	.player-row.loss-streak-row {
		background: linear-gradient(90deg, rgb(153 27 27 / 9%), transparent 34%);
	}
	.player-row.loss-streak-row:hover,
	.player-row.loss-streak-row.expanded {
		background: linear-gradient(90deg, rgb(185 28 28 / 15%), rgb(127 29 29 / 5%) 55%);
	}
	.expand-button {
		width: 30px;
		height: 30px;
		border: 1px solid rgb(200 155 60 / 32%);
		color: #c89b3c;
		font-size: 20px;
		line-height: 1;
		transition:
			transform 0.18s ease,
			background 0.18s ease;
	}
	.expand-button:hover {
		background: rgb(200 155 60 / 12%);
	}
	.expand-button.expanded {
		transform: rotate(180deg);
	}
	.position {
		color: #c89b3c;
		font-family: 'beaufort';
		font-size: 18px;
		font-weight: 700;
	}
	.player-name {
		display: flex;
		flex-direction: column;
		text-align: left;
	}
	.player-name-line {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.player-name-line > strong {
		color: #f0e6d2;
	}
	.player-name > .tag-line {
		color: rgb(240 230 210 / 45%);
		font-size: 12px;
	}
	.hot-streak-badge {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		border: 1px solid rgb(251 146 60 / 35%);
		border-radius: 9999px;
		background: rgb(124 45 18 / 28%);
		box-shadow: 0 0 12px rgb(249 115 22 / 10%);
		color: #fdba74;
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 2px 6px;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.hot-streak-badge > span {
		animation: streak-flame 1.4s ease-in-out infinite;
		font-size: 10px;
	}
	.loss-streak-badge {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		border: 1px solid rgb(248 113 113 / 35%);
		border-radius: 9999px;
		background: rgb(127 29 29 / 25%);
		box-shadow: 0 0 12px rgb(220 38 38 / 10%);
		color: #fca5a5;
		font-size: 8px;
		font-weight: 700;
		letter-spacing: 0.08em;
		padding: 2px 6px;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.loss-streak-badge > span {
		animation: loss-pulse 1.8s ease-in-out infinite;
		font-size: 10px;
	}
	@keyframes streak-flame {
		0%,
		100% {
			filter: drop-shadow(0 0 2px rgb(249 115 22 / 35%));
			transform: translateY(0) scale(1);
		}
		50% {
			filter: drop-shadow(0 0 5px rgb(251 146 60 / 70%));
			transform: translateY(-1px) scale(1.08);
		}
	}
	@keyframes loss-pulse {
		0%,
		100% {
			filter: drop-shadow(0 0 2px rgb(220 38 38 / 30%));
			opacity: 0.78;
		}
		50% {
			filter: drop-shadow(0 0 5px rgb(248 113 113 / 65%));
			opacity: 1;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hot-streak-badge > span,
		.loss-streak-badge > span {
			animation: none;
		}
	}
	.elo-cell {
		display: flex;
		align-items: center;
		gap: 10px;
		white-space: nowrap;
	}
	.elo-cell img {
		width: 34px;
		height: 34px;
		object-fit: contain;
	}
	.numeric {
		font-variant-numeric: tabular-nums;
	}
	.win-rate {
		color: #f0e6d2;
		font-weight: 700;
	}
	.details-row td {
		padding: 0;
		background: rgb(1 8 15 / 70%);
	}
	.details-content {
		padding: 24px 28px 28px 68px;
		border-bottom: 1px solid rgb(200 155 60 / 20%);
	}
	.details-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 16px;
	}
	.eyebrow {
		color: #bda36b;
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.details-heading h3 {
		color: #f0e6d2;
		font-family: 'beaufort';
		font-size: 20px;
		font-weight: 700;
	}
	.record {
		color: rgb(240 230 210 / 45%);
		font-size: 12px;
	}
	.matches-grid {
		display: grid;
		gap: 8px;
	}
	.match-card {
		display: grid;
		grid-template-columns: 110px 40px minmax(110px, 1fr) 120px repeat(4, 68px);
		align-items: center;
		gap: 12px;
		padding: 12px 16px;
		border-left: 3px solid #b34a4a;
		background: rgb(179 74 74 / 7%);
	}
	.match-card.win {
		border-left-color: #319b8b;
		background: rgb(49 155 139 / 7%);
	}
	.result {
		display: flex;
		flex-direction: column;
		color: #e07b73;
		font-weight: 700;
	}
	.win .result {
		color: #5cc4b4;
	}
	.result small {
		color: rgb(240 230 210 / 38%);
		font-size: 10px;
		font-weight: 400;
	}
	.champion-avatar {
		width: 38px;
		height: 38px;
		border: 1px solid rgb(200 155 60 / 38%);
		border-radius: 50%;
		overflow: hidden;
		box-shadow: 0 0 12px rgb(0 0 0 / 45%);
	}
	.champion-avatar img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.champion,
	.kda,
	.match-stat {
		display: flex;
		flex-direction: column;
	}
	.champion strong,
	.kda strong,
	.match-stat strong {
		color: #f0e6d2;
	}
	.champion span,
	.kda span,
	.match-stat span {
		color: rgb(240 230 210 / 42%);
		font-size: 10px;
		text-transform: uppercase;
	}
	.state-message {
		padding: 22px;
		border: 1px dashed rgb(200 155 60 / 24%);
		color: rgb(240 230 210 / 55%);
		text-align: center;
	}
	.error-state button {
		margin-top: 10px;
		color: #c89b3c;
		font-size: 12px;
		text-decoration: underline;
	}
	@media (max-width: 900px) {
		.details-content {
			padding-left: 24px;
		}
		.match-card {
			grid-template-columns: 100px 40px 1fr 110px repeat(4, 60px);
		}
	}
</style>
