import { TIER_ORDER } from './constants';
import type { PlayerInfo } from '../typings';

export interface CriminalProfile {
	title: string;
	charges: string[];
	bounty: number;
	lossRate: number;
}

export function getWinRate(player: PlayerInfo): number {
	const games = player.wins + player.losses;
	return games > 0 ? player.wins / games : 0;
}

export function getCriminalProfile(player: PlayerInfo, mostWanted = false): CriminalProfile {
	const games = player.wins + player.losses;
	const lossRate = games > 0 ? 1 - getWinRate(player) : 0;
	const charges: string[] = [];

	if (mostWanted) {
		charges.push('Inimigo público nº 1');
	}

	if (games === 0) {
		charges.push('Evasão de partidas ranqueadas');
	} else if (lossRate >= 0.6) {
		charges.push('Feed qualificado');
	} else if (lossRate >= 0.5) {
		charges.push('Atentado contra a win rate');
	}

	if (player.losses > player.wins) {
		charges.push('Carregamento ilícito do time inimigo');
	}

	if (player.tier === 'UNRANKED') {
		charges.push('Identidade ranqueada desconhecida');
	} else if (TIER_ORDER.indexOf(player.tier) <= TIER_ORDER.indexOf('SILVER')) {
		charges.push('Residência fixa no low elo');
	}

	if (player.leaguePoints <= 20 && player.tier !== 'UNRANKED') {
		charges.push('Estacionamento irregular de LP');
	}

	if (charges.length === 0) charges.push('Conduta suspeita na Solo Queue');

	const tierIndex = Math.max(0, TIER_ORDER.indexOf(player.tier));
	const lowEloBonus = Math.max(0, 6 - tierIndex) * 25_000;
	const bounty =
		50_000 +
		player.losses * 12_500 +
		Math.round(lossRate * 100) * 1_000 +
		lowEloBonus +
		(mostWanted ? 250_000 : 0);

	let title = 'SOB INVESTIGAÇÃO';
	if (player.tier === 'UNRANKED') title = 'FORAGIDO DA MD10';
	if (lossRate >= 0.6) title = 'AMEAÇA À SOLO QUEUE';
	if (mostWanted) title = 'INIMIGO PÚBLICO Nº 1';

	return {
		title,
		charges: charges.slice(0, 3),
		bounty,
		lossRate
	};
}
