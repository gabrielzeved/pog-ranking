<script lang="ts">
	import { env } from '$env/dynamic/public';
	import type { PlayerInfo } from '../../typings';

	export let data;

	let players: PlayerInfo[] = data.players;
	const backendApiUrl = env.PUBLIC_BACKEND_API_URL?.trim().replace(/\/$/, '');
	const playersUrl = backendApiUrl ? `${backendApiUrl}/players` : undefined;

	async function createPlayer(event: SubmitEvent) {
		event.preventDefault();
		if (!playersUrl) return;
		const formData = new FormData(event.target as HTMLFormElement);
		const gameName = formData.get('gameName') as string;
		const tagLine = formData.get('tagLine') as string;
		const res = await fetch(playersUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ gameName, tagLine })
		});

		if (res.status >= 400) return;

		players = [...players, await res.json()];
	}

	async function updatePlayer(player: PlayerInfo) {
		if (!playersUrl) return;

		const res = await fetch(`${playersUrl}/${player.id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: '{}'
		});

		players = [...players.filter((p) => p.id !== player.id), await res.json()];
	}

	async function deletePlayer(player: PlayerInfo) {
		if (!playersUrl) return;

		const res = await fetch(`${playersUrl}/${player.id}`, {
			method: 'DELETE'
		});

		if (res.ok) {
			players = players.filter((p) => p.id !== player.id);
		}
	}
</script>

<div class="container mx-auto py-8">
	<h1 class="text-3xl font-bold">Players</h1>
	{#if !playersUrl}
		<p class="text-gold-4 py-3">
			Modo de demonstração: configure PUBLIC_BACKEND_API_URL para habilitar o CRUD.
		</p>
	{/if}

	<form class="flex flex-col gap-1 max-w-96" on:submit={createPlayer}>
		<label class="text-white" for="gameName">Game Name:</label>
		<input class="p-1 rounded-sm text-black" type="text" id="gameName" name="gameName" required />
		<label class="text-white" for="tagLine">Tag Line:</label>
		<input class="p-1 rounded-sm text-black" type="text" id="tagLine" name="tagLine" required />
		<button class="bg-gold-4 p-2" type="submit" disabled={!playersUrl}>Create</button>
	</form>

	<div class="grid grid-cols-3 gap-4 mt-4">
		{#each players as player}
			<div class="flex flex-col gap-2 bg-gold-4 p-4 rounded-lg relative">
				<h2 class="text-2xl font-bold">{player.gameName}#{player.tagLine}</h2>

				<div class="flex flex-col gap-1">
					<span class="text-xl">{player.tier} {player.rank} {player.leaguePoints} LP</span>
					<span class="text-xl">{player.wins}V/{player.losses}D</span>
				</div>

				<div class="absolute top-0 right-0">
					<button class="bg-blue-950 p-2" on:click={() => updatePlayer(player)}>Update</button>
					<button class="bg-red-950 p-2" on:click={() => deletePlayer(player)}>Delete</button>
				</div>
			</div>
		{/each}
	</div>
</div>
