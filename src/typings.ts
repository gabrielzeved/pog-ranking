export type Elo =
	| 'Iron'
	| 'Silver'
	| 'Gold'
	| 'Platinum'
	| 'Emerald'
	| 'Diamond'
	| 'Master'
	| 'GrandMaster'
	| 'Challenger';

export interface PlayerInfo {
	image: string;
	name: string;
	elo: Elo;
}
