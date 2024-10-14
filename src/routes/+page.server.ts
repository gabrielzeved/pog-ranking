import { RIOT_BR1_BASE_API_URL, RIOT_API_KEY } from '$env/static/private';
import { LEAGUE_API, playersMock } from '../sdk/constants';
import { comparePlayers } from '../sdk/utils';
import type { League } from '../typings';

async function fetchSummonerLeagues(summonerId: string) {
	const response = await fetch(`${RIOT_BR1_BASE_API_URL}/${LEAGUE_API}/${summonerId}`, {
		headers: {
			'X-Riot-Token': RIOT_API_KEY
		}
	});
	const data = await response.json();
	return data;
}

async function getSummonerLeague(summonerId: string): Promise<League[]> {
	try {
		const leagues = await fetchSummonerLeagues(summonerId);

		return leagues;
	} catch (error) {
		console.error(`error: ${error}`);
		return [];
	}
}

export async function load() {
	const ranking = [];

	for (const player of playersMock) {
		const league = await getSummonerLeague(player.id);

		if (!Array.isArray(league)) {
			ranking.push({
				...player,
				league: []
			});

      continue;
		}

		ranking.push({
			...player,
			league
		});
	}

	const orderedPlayers = ranking.sort(comparePlayers);

	return {
		players: orderedPlayers
	};
}
