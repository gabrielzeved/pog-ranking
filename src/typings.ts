export type Tier =
	| 'UNRANKED'
	| 'IRON'
	| 'SILVER'
	| 'GOLD'
	| 'PLATINUM'
	| 'EMERALD'
	| 'DIAMOND'
	| 'MASTER'
	| 'GRANDMASTER'
	| 'CHALLENGER';

export type Rank = 'UNRANKED' | 'IV' | 'III' | 'II' | 'I';
export interface PlayerInfo {
	id: string;
	gameName: string;
	tagLine: string;
	tier: Tier;
	rank: Rank;
	wins: number;
	losses: number;
	leaguePoints: number;
	createdAt: string;
	updatedAt: string;
}
