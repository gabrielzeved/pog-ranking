<script lang="ts">
	import type { PlayerInfo } from '../typings';

	export let info: PlayerInfo;

	const soloQueueData = info.league?.find((l) => l.queueType === 'RANKED_SOLO_5x5');
</script>

<div class="flex w-full border-2 border-gold-4 relative">
	<img
		class="w-full h-full object-cover"
		src={`/criminosos/${info.gameName.toLowerCase()}.png`}
		onerror={`this.src = '/criminosos/fallback.png'`}
		alt={info.gameName}
	/>
	<div
		class="bg-gradient-to-t from-black/80 absolute w-full h-full top-0 left-0 pointer-events-none z-[1]"
	/>

	<div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
		<img class="w-2/3" alt="elo" src={`/emblems/${soloQueueData?.tier.toLowerCase()}.png`} />
		<span class="font-beaufort font-semibold text-gold-1 text-xl -mt-4">{info.gameName}</span>
		<span
			class="font-beaufort font-semibold text-gold-1 text-2xl transition-all duration-200 absolute"
			>{soloQueueData?.rank}</span
		>
		<span class="font-spiegel">
			{soloQueueData?.leaguePoints} LP
		</span>
	</div>
</div>
