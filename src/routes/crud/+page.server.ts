import { getPlayers } from '$lib/server/players';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	const players = await getPlayers(fetch);

	return {
		players
	};
};
