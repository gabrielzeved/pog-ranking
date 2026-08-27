import { env } from '$env/dynamic/public';
import type { RecentMatch } from '../typings';

export async function getRecentMatches(playerId: string): Promise<RecentMatch[]> {
	const backendApiUrl = env.PUBLIC_BACKEND_API_URL?.trim().replace(/\/$/, '');

	if (!backendApiUrl) {
		throw new Error('O histórico não está disponível no modo de demonstração.');
	}

	const response = await fetch(`${backendApiUrl}/players/${encodeURIComponent(playerId)}/matches`);

	if (!response.ok) {
		throw new Error(
			response.status === 502
				? 'A Riot não respondeu ao carregar as partidas. Tente novamente em instantes.'
				: `Não foi possível carregar as partidas (${response.status}).`
		);
	}

	return response.json();
}
