import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
import type { PlayerInfo } from '../../typings';

export async function load() {
	const res = await fetch(`${PUBLIC_BACKEND_API_URL}/players`);

	const players: PlayerInfo[] = await res.json();

	return {
		players
	};
}
