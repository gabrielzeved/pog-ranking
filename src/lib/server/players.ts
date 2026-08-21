import { env } from '$env/dynamic/public';
import { playersMock } from '../../sdk/constants';
import type { PlayerInfo } from '../../typings';

function getMockPlayers(): PlayerInfo[] {
	return playersMock.map((player, index) => ({
		id: `mock-${index}`,
		gameName: player.gameName,
		tagLine: player.tagLine,
		tier: 'UNRANKED',
		rank: 'UNRANKED',
		wins: 0,
		losses: 0,
		leaguePoints: 0,
		createdAt: '',
		updatedAt: ''
	}));
}

export async function getPlayers(fetch: typeof globalThis.fetch): Promise<PlayerInfo[]> {
	const backendApiUrl = env.PUBLIC_BACKEND_API_URL?.trim().replace(/\/$/, '');

	if (!backendApiUrl) return getMockPlayers();

	const response = await fetch(`${backendApiUrl}/players`);

	if (!response.ok) {
		throw new Error(`O backend respondeu ${response.status} ao carregar /players.`);
	}

	return response.json();
}
