import { getPlayers } from '$lib/server/players';
import { comparePlayers } from '../sdk/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const players = await getPlayers(fetch);

	players.sort(comparePlayers);

	return {
		players
	};
};
