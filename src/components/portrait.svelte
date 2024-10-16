<script lang="ts">
	import { playersMock } from '../sdk/constants';
	import type { PlayerInfo } from '../typings';

	export let info: PlayerInfo;

	const wantedName = playersMock.find((player) => player.gameName === info.gameName)?.wantedName;

	const wantedPrice = Math.ceil(((info?.losses ?? 0) / (info?.wins ?? 1)) * 100) * 1000;
	const currencyFormatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	let isCriminoso = (info?.wins ?? 0) <= (info?.losses ?? 0);
</script>

<div class="flip-card m-4">
	<div class:flip-card-inner={isCriminoso}>
		<div class="flip-card-front">
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
				<img class="w-2/3" alt="elo" src={`/emblems/${info?.tier.toLowerCase()}.png`} />
				<span class=" font-semibold text-gold-1 text-xl -mt-4">{info.gameName}</span>
				<span class=" font-semibold text-gold-1 text-2xl transition-all duration-200 absolute"
					>{info?.rank}</span
				>
				<span class="font-spiegel text-white">
					{info?.leaguePoints} LP
				</span>
				<span class={`font-spiegel text-xs ${isCriminoso ? 'text-red-500' : 'text-white'}`}>
					{info?.wins}V/{info?.losses}D
				</span>
			</div>
		</div>
		{#if isCriminoso}
			<div class="flip-card-back bgcriminoso w-full h-full">
				<img
					class="absolute z-10 w-[86%] h-[44%] criminoso border-4 border-amber-950"
					alt="wanted"
					src={`/wanted/${info.gameName.toLowerCase()}.png`}
				/>
				<div
					class="flex flex-col items-center absolute z-10 bottom-[15%] left-2/4 translate-x-[-50%]"
				>
					<span class="text-xl text-amber-950 font-bold whitespace-nowrap">{wantedName}</span>
					<span class="text-2xl text-red-600 font-bold">
						{currencyFormatter.format(wantedPrice)}
					</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.flip-card {
		perspective: 1000px;
		width: 288px;
		height: 511px;
	}

	.flip-card-inner {
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
		transition: transform 0.4s ease-in-out;
		transform-style: preserve-3d;
	}

	.flip-card:hover .flip-card-inner {
		transform: rotateY(180deg);
	}

	.flip-card-front,
	.flip-card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		border: 1px solid gold;
		overflow: hidden;
	}

	.flip-card-front {
		background-color: #bbb;
		color: black;
	}

	.flip-card-back {
		transform: rotateY(180deg);
	}

	.bgcriminoso {
		background-image: url('/wanted.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
	}

	.criminoso {
		top: 43%;
		left: 51%;
		transform: translate(-50%, -50%);
	}
</style>
