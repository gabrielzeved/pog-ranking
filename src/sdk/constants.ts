export const PUUID_API = 'riot/account/v1/accounts/by-riot-id';
export const SUMMONER_API = 'lol/summoner/v4/summoners/by-puuid';
export const LEAGUE_API = 'lol/league/v4/entries/by-summoner';
export const ACCOUNT_API = 'riot/account/v1/accounts/by-riot-id'; // /gameName/tagLine

export const DEGREE_TO_RADIANS = 0.01745329251; // π/180;

export const TIER_ORDER = [
	'UNRANKED',
	'IRON',
	'BRONZE',
	'SILVER',
	'GOLD',
	'PLATINUM',
	'EMERALD',
	'DIAMOND',
	'MASTER',
	'GRANDMASTER',
	'CHALLENGER'
];

export const RANK_ORDER = ['UNRANKED', 'IV', 'III', 'II', 'I'];

export const playersMock = [
	{
		gameName: 'Nenemz',
		tagLine: '3514',
		champion: 'talon'
	},
	{
		gameName: 'Dreosh',
		tagLine: 'BR1',
		champion: 'sejuani'
	},
	{
		gameName: 'Kaikan',
		tagLine: 'BR1',
		champion: 'jhin'
	},
	{
		gameName: 'Raizzeni',
		tagLine: 'Toth'
	},
	{
		gameName: 'Neyans',
		tagLine: '001',
		champion: 'thresh'
	},
	{
		gameName: 'SrPBL',
		tagLine: 'BR1'
	},
	{
		gameName: 'Kenai',
		tagLine: 'duo',
		wantedName: 'LELEY DO CARRO BIXO'
	},
	{
		gameName: 'bobtheconstrutor',
		tagLine: '1596',
		wantedName: 'DOCTÔBOLHAS'
	},
	{
		gameName: 'Arzok',
		tagLine: 'BR1',
		wantedName: 'PAIUBER'
	},
	{
		gameName: 'SrSSS',
		tagLine: 'BR1'
	}
];

export const CHAMPIONS_SCALE: Record<string, number> = {
	jhin: 1.5,
	talon: 1.5
};
