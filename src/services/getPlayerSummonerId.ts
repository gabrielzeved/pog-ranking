import { RIOT_API_KEY, RIOT_BR1_BASE_API_URL } from '$env/static/private';
import { SUMMONER_API } from '../sdk/constants';

interface IGetPlayerSummonerIdResponse {
	id: string;
	accountId: string;
	puuid: string;
	profileIconId: number;
	revisionDate: number;
	summonerLevel: number;
}

export async function getPlayerSummonerId(puuid: string): Promise<IGetPlayerSummonerIdResponse> {
	const response = await fetch(`${RIOT_BR1_BASE_API_URL}/${SUMMONER_API}/${puuid}`, {
		headers: {
			'X-Riot-Token': RIOT_API_KEY
		}
	});

	const data = await response.json();

	if (response.status !== 200) {
		throw new Error(data?.status?.message || 'Something went wrong');
	}

	return data;
}
