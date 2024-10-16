<script lang="ts">
	import type { PlayerInfo } from '../typings';

	export let info: PlayerInfo;
	export let size: 'sm' | 'lg' = 'sm';

	const soloQueueData = info.league?.find((l) => l.queueType === 'RANKED_SOLO_5x5');

	let hovering: boolean = false;
	let element: HTMLDivElement;

	function handleMouseMove(e: MouseEvent) {
		const { left, top, width, height } = element.getBoundingClientRect();

		const x = (e.clientX - left - width / 2) / 10;
		const y = (e.clientY - top - height / 2) / 10;
		element.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
	}

	function onMouseEnter() {
		hovering = true;
	}

	function onMouseLeave() {
		hovering = false;
		element.style.transform = `rotateY(0deg) rotateX(0deg)`;
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->

<div
	bind:this={element}
	class={`card group to-black/10 perspective-600 transform-style-3d [&>*]:transform-style-3d ${$$props.class} relative overflow-hidden`}
	on:mouseenter={onMouseEnter}
	on:mousemove={handleMouseMove}
	on:mouseleave={onMouseLeave}
>
	{#if size === 'lg'}
		<div
			class="absolute w-[9999px] h-[9999px] -z-2 top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-no-repeat bg-[conic-gradient(rgba(0,0,0,0),gold,rgba(0,0,0,0)_25%)] animate-[rotate_4s_linear_infinite]"
		/>
	{/if}

	<div class="transform-style-3d h-full">
		<img
			class="w-full h-full object-cover p-1"
			src={`/criminosos/${info.gameName.toLowerCase()}.png`}
			onerror={`this.src = '/criminosos/fallback.png'`}
			alt={info.gameName}
		/>
		<div
			class="bg-gradient-to-t from-black/80 absolute w-full h-full top-0 left-0 pointer-events-none z-[1]"
		/>

		<div
			class="w-full absolute bottom-4 z-10 flex flex-col items-center justify-center transform-style-3d [&>*]:transform-style-3d"
		>
			<div
				class="translate-z-10 transform transition-all duration-200 flex justify-center items-center"
			>
				<img
					class={`${size === 'sm' ? 'w-1/3' : 'w-1/3'}`}
					alt="elo"
					src={`/emblems/${soloQueueData?.tier.toLowerCase()}.png`}
				/>

				<span
					class="font-beaufort font-semibold text-gold-1 text-2xl transition-all duration-200 absolute -mt-12"
					>{soloQueueData?.rank}</span
				>
			</div>

			<span
				class="font-beaufort font-semibold text-gold-1 text-2xl translate-z-4 transform transition-all duration-200"
				>{info.gameName}</span
			>

			<span class="font-spiegel translate-z-4 transform transition-all duration-200">
				{soloQueueData?.leaguePoints} LP
			</span>

			<span class="font-spiegel text-xs">
				{soloQueueData?.wins}V/{soloQueueData?.losses}D
			</span>

			<div class="flex flex-col">
				<div class="flex">
					<!-- <span
						class="font-beaufort font-semibold text-gold-1 text-2xl translate-z-4 transform transition-all duration-200"
						>{soloQueueData?.tier}</span
					> -->
				</div>
			</div>
		</div>
	</div>
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
