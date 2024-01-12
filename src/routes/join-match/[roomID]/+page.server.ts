import { USE_RANDOM_NAMES } from '$env/static/private';
import type { PageServerLoad } from './$types';
const useRandom = USE_RANDOM_NAMES === '1';
export const load: PageServerLoad = async () => {
	const name: string = useRandom
		? await fetch('https://api.namefake.com/english-united-states')
				.then((res) => res.json())
				.then((data) => data.maiden_name)
				.catch(() => '')
		: await Promise.resolve('');

	return { name };
};
