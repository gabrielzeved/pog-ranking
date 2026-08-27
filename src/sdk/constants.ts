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
		gameName: 'The Last Dance',
		tagLine: '2030',
		champion: 'talon',
		imageName: 'nenemz',
		wantedImage: '/criminosos/nenemz.png'
	},
	{
		gameName: 'Dreosh',
		tagLine: 'BR1',
		champion: 'sejuani',
		wantedName: 'Twink',
		imageName: 'dreosh',
		wantedImage: '/wanted/dreosh.png'
	},
	{
		gameName: 'Kaikan',
		tagLine: 'BR1',
		champion: 'lucian'
	},
	{
		gameName: 'YahToth',
		tagLine: 'BR1',
		wantedName: 'Eric Cartman',
		imageName: 'raizzeni',
		wantedImage: '/wanted/raizzeni.png'
	},
	{
		gameName: 'El Último Tango',
		tagLine: '2026',
		champion: 'thresh',
		wantedName: 'El Último Job',
		imageName: 'neyans',
		wantedImage: '/wanted/neyans.png'
	},
	{
		gameName: 'SrPBL',
		tagLine: 'BR1',
		wantedName: 'SrPBL',
		imageName: 'srpbl',
		wantedImage: '/wanted/srpbl.png',
		champion: 'angler_jax'
	},
	{
		gameName: 'carolconsoline',
		tagLine: 'BR1',
		champion: 'nami',
		wantedName: 'meu marido é rico',
	},
	{
		gameName: 'Kenai',
		tagLine: 'duo',
		wantedName: 'Sabryna'
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
		tagLine: 'BR1',
		wantedName: 'SrSSS'
	}
];

export const CHAMPIONS_SCALE: Record<string, number> = {
	jhin: 1.5,
	talon: 1.5,
	angler_jax: 0.60
};
