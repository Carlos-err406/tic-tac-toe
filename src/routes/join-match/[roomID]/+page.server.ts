import { USE_RANDOM_NAMES } from '$env/static/private';
import prisma from '$lib/prisma';
import { $Enums } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const useRandom = USE_RANDOM_NAMES === '1';

export const load: PageServerLoad = async ({ params }) => {
	let game = await prisma.game.findUnique({
		where: {
			roomID: params.roomID
		}
	});

	//TODO error page for these cases
	if (!game || game.state  === $Enums.GameState.IN_PROGRESS) throw redirect(302, '/');

	game = await prisma.game.update({
		where: {
			roomID: params.roomID
		},
		data: {
			state: $Enums.GameState.OPONENT_JOINING
		}
	});
	const name: string = useRandom
		? await fetch('https://api.namefake.com/english-united-states')
				.then((res) => res.json())
				.then((data) => data.maiden_name)
				.catch(() => '')
		: await Promise.resolve('');

	return { name, game };
};
