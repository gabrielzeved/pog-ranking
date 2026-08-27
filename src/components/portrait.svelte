<script lang="ts">
	import { playersMock } from '../sdk/constants';
	import { getCriminalProfile } from '../sdk/criminal';
	import type { PlayerInfo } from '../typings';

	export let info: PlayerInfo;
	export let featured = false;
	export let mostWanted = false;
	export let rankPosition = 0;
	export let badgeLabel = '';

	const playerMock = playersMock.find(
	(player) => player.gameName.toLowerCase() === info.gameName.toLowerCase()
);
	const wantedName = playerMock?.wantedName;
	const imageName = playerMock?.imageName ?? info.gameName.toLowerCase();
	const criminalImage = `/criminosos/${imageName}.png`;
	const wantedImage = playerMock?.wantedImage ?? `/wanted/${imageName}.png`;

	const criminalProfile = getCriminalProfile(info, mostWanted);
	const bounty = new Intl.NumberFormat('pt-BR').format(criminalProfile.bounty);

	let isCriminoso = featured || (info?.wins ?? 0) <= (info?.losses ?? 0);
</script>

<div class:most-wanted-card={mostWanted} class="flip-card">
	<div class:flip-card-inner={isCriminoso}>
		<div class="flip-card-front">
			{#if mostWanted}
				<div class="most-wanted-ribbon">INIMIGO PÚBLICO Nº 1</div>
			{/if}
			{#if badgeLabel || rankPosition > 0}
				<div class="ranking-stamp">{badgeLabel || `#${rankPosition}`}</div>
			{/if}
			<img
				class="w-full h-full object-cover"
				src={criminalImage}
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
					src={wantedImage}
					onerror={`this.onerror = null; this.src = '/criminosos/fallback.png'`}
				/>
				<div class="criminal-details">
					<span class="criminal-title">{criminalProfile.title}</span>
					<span class="criminal-name">{wantedName ?? info.gameName}</span>
					<ul class="charges" aria-label="Acusações">
						{#each criminalProfile.charges as charge}
							<li>{charge}</li>
						{/each}
					</ul>
					<div class="bounty">
						<span>RECOMPENSA</span>
						<strong>฿ {bounty}</strong>
					</div>
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
		transition:
			filter 0.3s ease,
			transform 0.3s ease;
	}

	.most-wanted-card {
		filter: drop-shadow(0 0 18px rgba(185, 28, 28, 0.55));
		transform: translateY(-8px) scale(1.03);
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

	.most-wanted-ribbon {
		position: absolute;
		top: 29px;
		left: -42px;
		z-index: 20;
		width: 190px;
		transform: rotate(-38deg);
		background: #8d1717;
		box-shadow: 0 3px 8px rgb(0 0 0 / 55%);
		color: #f6e7c1;
		font-family: 'beaufort';
		font-size: 10px;
		font-weight: 700;
		letter-spacing: 0.12em;
		padding: 7px 0;
		text-align: center;
	}

	.ranking-stamp {
		position: absolute;
		top: 12px;
		right: 12px;
		z-index: 20;
		display: grid;
		place-items: center;
		min-width: 44px;
		height: 44px;
		padding: 0 8px;
		border: 2px solid #e8c26b;
		border-radius: 999px;
		background: rgb(2 11 20 / 82%);
		box-shadow: 0 0 0 3px rgb(2 11 20 / 45%);
		color: #f0e6d2;
		font-family: 'beaufort';
		font-size: 10px;
		font-weight: 700;
		white-space: nowrap;
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

	.criminal-details {
		position: absolute;
		z-index: 10;
		top: 72%;
		left: 50%;
		display: flex;
		width: 82%;
		transform: translateX(-50%);
		flex-direction: column;
		align-items: center;
		color: #451a03;
		line-height: 1.05;
	}

	.criminal-title {
		font-size: 9px;
		font-weight: 700;
		letter-spacing: 0.16em;
	}

	.criminal-name {
		max-width: 100%;
		overflow: hidden;
		font-family: 'beaufort';
		font-size: 24px;
		font-weight: 700;
	}

	.charges {
		display: flex;
		width: 100%;
		margin: 3px 0;
		padding: 0;
		flex-direction: column;
		gap: 1px;
		font-size: 8px;
		font-weight: 700;
		list-style: none;
		text-transform: uppercase;
	}

	.charges li::before {
		content: '✦ ';
	}

	.bounty {
		display: flex;
		flex-direction: column;
		color: #991b1b;
	}

	.bounty span {
		font-size: 7px;
		font-weight: 700;
		letter-spacing: 0.2em;
	}

	.bounty strong {
		font-size: 16px;
	}
</style>
