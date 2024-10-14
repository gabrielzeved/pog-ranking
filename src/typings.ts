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

export type QueueType = 'RANKED_SOLO_5x5' | 'RANKED_FLEX_SR';

export interface League {
	freshBlood: boolean;
	hotStreak: boolean;
	inactive: boolean;
	leagueId: string;
	leaguePoints: number;
	losses: number;
	queueType: QueueType;
	rank: Rank;
	summonerId: string;
	tier: Tier;
	veteran: boolean;
	wins: number;
}
export interface PlayerInfo {
	gameName: string;
	tagLine: string;
	league?: League[];
}
