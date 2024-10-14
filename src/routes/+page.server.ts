import { playersMock } from '../sdk/constants';
import { comparePlayers } from '../sdk/utils';
import { getPlayerLeague } from '../services/getPlayerLeague';
import { getPlayerPuuid } from '../services/getPlayerPuuid';
import { getPlayerSummonerId } from '../services/getPlayerSummonerId';
import type { PlayerInfo } from '../typings';

export async function load() {
	const ranking: PlayerInfo[] = [];

	for (const player of playersMock) {
		const { puuid } = await getPlayerPuuid(player.gameName, player.tagLine);

		if (!puuid) continue;

		const { id } = await getPlayerSummonerId(puuid);

		const league = await getPlayerLeague(id);

		ranking.push({
			...player,
			league
		});
	}

	ranking.sort(comparePlayers);

	return {
		players: ranking
	};
}
