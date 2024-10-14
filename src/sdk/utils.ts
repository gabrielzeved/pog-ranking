import type { PlayerInfo } from '../typings';
import { RANK_ORDER, TIER_ORDER } from './constants';

export function comparePlayers(playerA: PlayerInfo, playerB: PlayerInfo) {
	const p1SoloQueueData = playerA.league?.find((l) => l.queueType === 'RANKED_SOLO_5x5');
	const p2SoloQueueData = playerB.league?.find((l) => l.queueType === 'RANKED_SOLO_5x5');

	if (!p1SoloQueueData || !p2SoloQueueData) return 0;

	const tierComparison =
		TIER_ORDER.indexOf(p2SoloQueueData.tier) - TIER_ORDER.indexOf(p1SoloQueueData.tier);

	if (tierComparison === 0) {
		const rankComparison =
			RANK_ORDER.indexOf(p2SoloQueueData.rank) - RANK_ORDER.indexOf(p1SoloQueueData.rank);

		if (rankComparison === 0) {
			return p2SoloQueueData.leaguePoints - p1SoloQueueData.leaguePoints;
		}

		return rankComparison;
	}

	return tierComparison;
}
