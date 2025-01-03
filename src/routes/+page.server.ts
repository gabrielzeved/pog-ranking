import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
import { comparePlayers } from '../sdk/utils';
import type { PlayerInfo } from '../typings';

export async function load() {
	const res = await fetch(`${PUBLIC_BACKEND_API_URL}/players`);

	const players: PlayerInfo[] = await res.json();

	players.sort(comparePlayers);

	return {
		players
	};
}
