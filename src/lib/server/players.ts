import { env } from '$env/dynamic/public';
import { playersMock } from '../../sdk/constants';
import type { PlayerInfo, RankedPlayerInfo, RankingView } from '../../typings';

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

function getMockRanking(): RankingView {
	const players = getMockPlayers().map<RankedPlayerInfo>((player, index) => ({
		...player,
		gamesPlayed: 0,
		winRate: 0,
		overallPosition: index + 1,
		rankingPosition: null,
		bottomPosition: null,
		displayPosition: index + 1
	}));

	return {
		players,
		ranking: [],
		top3: [],
		bottom3: []
	};
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

export async function getRanking(fetch: typeof globalThis.fetch): Promise<RankingView> {
	const backendApiUrl = env.PUBLIC_BACKEND_API_URL?.trim().replace(/\/$/, '');

	if (!backendApiUrl) return getMockRanking();

	const response = await fetch(`${backendApiUrl}/players/ranking`);

	if (!response.ok) {
		throw new Error(`O backend respondeu ${response.status} ao carregar /players/ranking.`);
	}

	return response.json();
}
