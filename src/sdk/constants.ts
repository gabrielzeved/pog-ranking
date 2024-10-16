export const PUUID_API = 'riot/account/v1/accounts/by-riot-id';
export const SUMMONER_API = 'lol/summoner/v4/summoners/by-puuid';
export const LEAGUE_API = 'lol/league/v4/entries/by-summoner';
export const ACCOUNT_API = 'riot/account/v1/accounts/by-riot-id'; // /gameName/tagLine

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
		tagLine: '3514'
	},
	{
		gameName: 'Dreosh',
		tagLine: 'BR1'
	},
	{
		gameName: 'Kaikan',
		tagLine: 'BR1'
	},
	{
		gameName: 'Raizzeni',
		tagLine: 'Toth'
	},
	{
		gameName: 'Neyans',
		tagLine: '001'
	},
	{
		gameName: 'SrPBL',
		tagLine: 'BR1'
	},
	{
		gameName: 'Kenai',
		tagLine: 'duo',
		wantedName: 'LELEY DO CARRO BIXO',
		wantedPrice: '15.000.00'
	},
	{
		gameName: 'bobtheconstrutor',
		tagLine: '1596',
		wantedName: 'DOCTÔBOLHAS',
		wantedPrice: '50.000.00'
	},
	{
		gameName: 'Arzok',
		tagLine: 'BR1',
		wantedName: 'PAIUBER',
		wantedPrice: '100.000.00'
	},
	{
		gameName: 'SrSSS',
		tagLine: 'BR1'
	}
];
