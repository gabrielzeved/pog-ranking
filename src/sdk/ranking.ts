import { RANK_ORDER, TIER_ORDER } from './constants';
import type { PlayerInfo } from '../typings';

export const HORS_CONCOURS_LP_GAP = 1_000;

const LP_PER_DIVISION = 100;
const DIVISIONS_PER_TIER = 4;
const FIRST_RANKED_TIER_INDEX = TIER_ORDER.indexOf('IRON');
const DIAMOND_TIER_INDEX = TIER_ORDER.indexOf('DIAMOND');
const APEX_TIER_BASE =
	(DIAMOND_TIER_INDEX - FIRST_RANKED_TIER_INDEX + 1) * DIVISIONS_PER_TIER * LP_PER_DIVISION;

/**
 * Converte tier, divisão e PDL em uma escala contínua para medir a
 * distância entre jogadores. Mestre, Grão-Mestre e Desafiante compartilham
 * a mesma base, pois o PDL das filas apex já é contínuo.
 */
export function getRankedLp(player: PlayerInfo): number {
	const tierIndex = TIER_ORDER.indexOf(player.tier);

	if (tierIndex < FIRST_RANKED_TIER_INDEX) return 0;

	if (tierIndex > DIAMOND_TIER_INDEX) {
		return APEX_TIER_BASE + player.leaguePoints;
	}

	const tierBase = (tierIndex - FIRST_RANKED_TIER_INDEX) * DIVISIONS_PER_TIER * LP_PER_DIVISION;
	const rankIndex = Math.max(0, RANK_ORDER.indexOf(player.rank) - 1);

	return tierBase + rankIndex * LP_PER_DIVISION + player.leaguePoints;
}

export function getRankedLpGap(leader: PlayerInfo, runnerUp: PlayerInfo): number {
	return Math.max(0, getRankedLp(leader) - getRankedLp(runnerUp));
}
