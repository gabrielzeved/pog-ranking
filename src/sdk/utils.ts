import type { PlayerInfo } from '../typings';
import { RANK_ORDER, TIER_ORDER } from './constants';

export function comparePlayers(playerA: PlayerInfo, playerB: PlayerInfo) {
	const tierComparison =
		TIER_ORDER.indexOf(playerB.tier) - TIER_ORDER.indexOf(playerA.tier);

	if (tierComparison === 0) {
		const rankComparison =
			RANK_ORDER.indexOf(playerB.rank) - RANK_ORDER.indexOf(playerA.rank);

		if (rankComparison === 0) {
			return playerB.leaguePoints - playerA.leaguePoints;
		}

		return rankComparison;
	}

	return tierComparison;
}
