export type Tier =
	| 'UNRANKED'
	| 'IRON'
	| 'BRONZE'
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

export interface RankedPlayerInfo extends PlayerInfo {
	gamesPlayed: number;
	winRate: number;
	overallPosition: number;
	rankingPosition: number | null;
	bottomPosition: number | null;
}

export interface RankingView {
	players: RankedPlayerInfo[];
	ranking: RankedPlayerInfo[];
	top3: RankedPlayerInfo[];
	bottom3: RankedPlayerInfo[];
}
