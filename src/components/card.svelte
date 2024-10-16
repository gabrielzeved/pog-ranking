<script lang="ts">
	import { playersMock } from '../sdk/constants';
	import type { PlayerInfo } from '../typings';
	import ModelViewer from './model-viewer.svelte';

	export let info: PlayerInfo;
	export let size: 'sm' | 'lg' = 'sm';

	let champion = playersMock.find((player) => player.gameName === info.gameName)?.champion;
	let container: HTMLDivElement;
</script>

<div class="w-fit h-fit relative group" bind:this={container}>
	<div
		class="transform-style-3d perspective-1000 px-0 group-hover:px-10 rotate-x-[70deg] rotate-z-[27deg] group-hover:transform group-hover:opacity-50 transition-all duration-500 ease-in-out"
	>
		<div class={`card to-black/10 ${$$props.class} overflow-hidden`}>
			{#if size === 'lg'}
				<div
					class="absolute w-[9999px] h-[9999px] -z-10 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-no-repeat bg-[conic-gradient(rgba(0,0,0,0),gold,rgba(0,0,0,0)_25%)] animate-[rotate_4s_linear_infinite]"
				/>
			{/if}

			<div class="h-full">
				<img
					class="w-full h-full object-cover p-1"
					src={`/criminosos/${info.gameName.toLowerCase()}.png`}
					onerror={`this.src = '/criminosos/fallback.png'`}
					alt={info.gameName}
				/>

				<div
					class="bg-gradient-to-t from-black/80 absolute w-full h-full top-0 left-0 pointer-events-none z-[1]"
				/>

				<div class="w-full absolute bottom-4 z-10 flex flex-col items-center justify-center">
					<div class="flex justify-center items-center">
						<img
							class={`${size === 'sm' ? 'w-1/3' : 'w-1/3'}`}
							alt="elo"
							src={`/emblems/${info?.tier.toLowerCase()}.png`}
						/>

						<span
							class="font-semibold text-gold-1 text-2xl transition-all duration-200 absolute -mt-12"
							>{info?.rank}</span
						>
					</div>

					<span class="font-semibold text-gold-1 text-2xl transition-all duration-200"
						>{info.gameName}</span
					>

					<span class="font-spiegel transition-all duration-200">
						{info?.leaguePoints} LP
					</span>

					<span class="font-spiegel text-xs">
						{info?.wins}V/{info?.losses}D
					</span>
				</div>
			</div>
		</div>
	</div>
	{#if container && champion}
		<ModelViewer {container} {champion} />
	{/if}
</div>

<style lang="postcss">
	.card {
		aspect-ratio: 0.71856287425;
		position: relative;
	}
	.card::before {
		content: '';
		z-index: 2;
		top: 0;
		left: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		background-image: url("data:image/svg+xml,%3Csvg width='240' height='334' viewBox='0 0 240 334' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg opacity='0.5'%3E%3Cmask id='path-1-inside-1_1463_3975' fill='white'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M0 18L18 0H240V316L222 334H0V18Z'/%3E%3C/mask%3E%3Cpath d='M0 18L-0.707107 17.2929L-1 17.5858V18H0ZM18 0V-1H17.5858L17.2929 -0.707107L18 0ZM240 0H241V-1H240V0ZM240 316L240.707 316.707L241 316.414V316H240ZM222 334V335H222.414L222.707 334.707L222 334ZM0 334H-1V335H0V334ZM0.707107 18.7071L18.7071 0.707107L17.2929 -0.707107L-0.707107 17.2929L0.707107 18.7071ZM240 -1H18V1H240V-1ZM241 316V0H239V316H241ZM222.707 334.707L240.707 316.707L239.293 315.293L221.293 333.293L222.707 334.707ZM0 335H222V333H0V335ZM-1 18V334H1V18H-1Z' fill='white' mask='url(%23path-1-inside-1_1463_3975)'/%3E%3C/g%3E%3C/svg%3E%0A");
		background-size: contain;
		background-repeat: no-repeat;
		aspect-ratio: 0.71856287425;
	}
</style>
