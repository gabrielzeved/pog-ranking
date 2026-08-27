import { getRanking } from '$lib/server/players';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => ({
	ranking: await getRanking(fetch)
});
