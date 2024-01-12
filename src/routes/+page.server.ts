import type { PageServerLoad } from './$types';
import { USE_RANDOM_NAMES } from '$env/static/private';
const useRandom = USE_RANDOM_NAMES === '1';
export const load: PageServerLoad = async () => {
	const promises: [Promise<string>, Promise<string>, Promise<string>] = [
		useRandom
			? fetch('https://api.namefake.com/english-united-states')
					.then((res) => res.json())
					.then((data) => data.maiden_name)
					.catch(() => '')
			: Promise.resolve(''),
		useRandom
			? fetch('https://api.namefake.com/english-united-states')
					.then((res) => res.json())
					.then((data) => data.maiden_name)
					.catch(() => '')
			: Promise.resolve(''),
		useRandom
			? fetch('https://api.namefake.com/english-united-states')
					.then((res) => res.json())
					.then((data) => data.maiden_name)
					.catch(() => '')
			: Promise.resolve('')
	];
	const [name1, name2, name3] = await Promise.all(promises);
	return { name1, name2, name3 };
};
