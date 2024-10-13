<script lang="ts">
	import type { PlayerInfo } from '../typings';

	export let info: PlayerInfo;
</script>

<div class="flex w-full border-2 border-gold-4 relative">
	<img class="w-full h-full object-cover" src={info.image} alt={info.name} />
	<div
		class="bg-gradient-to-t from-black/80 absolute w-full h-full top-0 left-0 pointer-events-none z-[1]"
	/>

	<div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
		<img class="w-2/3" alt="elo" src={`/emblems/${info.elo.toLowerCase()}.png`} />
		<span class="font-beaufort font-semibold text-gold-1 text-xl -mt-4">{info.name}</span>
	</div>
</div>
