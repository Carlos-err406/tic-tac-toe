import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { gameID } = params;
	return {
		name1: 'ASD',
		name2: 'DSA'
	};
};
