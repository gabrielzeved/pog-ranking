<script lang="ts">
	const leaderboardData = [
		{
			rank: 1,
			name: 'Faker',
			icon: '/criminosos/nenemz.png',
			tier: 'Challenger',
			lp: 1500,
			winRate: 65,
			championImage: '/criminosos/neyans.png'
		},
		{
			rank: 2,
			name: 'Caps',
			icon: '/criminosos/nenemz.png',
			tier: 'Challenger',
			lp: 1450,
			winRate: 62,
			championImage: '/criminosos/neyans.png'
		},
		{
			rank: 3,
			name: 'Showmaker',
			icon: '/criminosos/nenemz.png',
			tier: 'Challenger',
			lp: 1400,
			winRate: 60,
			championImage: '/criminosos/neyans.png'
		},
		{
			rank: 4,
			name: 'Chovy',
			icon: '/criminosos/nenemz.png',
			tier: 'Challenger',
			lp: 1350,
			winRate: 59
		},
		{
			rank: 5,
			name: 'Rookie',
			icon: '/criminosos/nenemz.png',
			tier: 'Challenger',
			lp: 1300,
			winRate: 58
		}
	];
</script>

<table class="w-full border-collapse">
	<thead>
		<tr class="border-b border-gold-4">
			<th class="py-3 px-4 text-left text-sm font-semibold uppercase tracking-wider">Rank</th>
			<th class="py-3 text-left text-sm font-semibold uppercase tracking-wider">Summoner</th>
			<th class="py-3 text-left text-sm font-semibold uppercase tracking-wider">Tier</th>
			<th class="py-3 text-left text-sm font-semibold uppercase tracking-wider">LP</th>
			<th class="py-3 text-left text-sm font-semibold uppercase tracking-wider">Win Rate</th>
		</tr>
	</thead>
	<tbody>
		{#each leaderboardData as player}
			<tr class="border-b border-gold-4 hover:bg-[#1E2328] transition-colors">
				<td class="py-4 px-4">
					<div class="flex items-center">
						<span class="text-2xl font-bold mr-2">{player.rank}</span>
					</div>
				</td>
				<td class="py-4">
					<div class="flex items-center">
						<img
							src="https://ddragon.leagueoflegends.com/cdn/14.20.1/img/champion/Aatrox.png"
							alt={`${player.name}'s icon`}
							width={48}
							height={48}
							class="w-12 h-12 rounded-full object-fill mr-3 border-2 border-gold-4"
						/>
						<span class="font-semibold">{player.name}</span>
					</div>
				</td>
				<td class="py-4">{player.tier}</td>
				<td class="py-4">{player.lp} LP</td>
				<td class="py-4">{player.winRate}%</td>
			</tr>
		{/each}
	</tbody>
</table>
