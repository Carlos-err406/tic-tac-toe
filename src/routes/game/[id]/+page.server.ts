import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	let game = await prisma.game.findUnique({
		where: { roomID: id },
		include: { challenger: true, opponent: true, board: true, score: true }
	});
	if (!game) throw redirect(302, '/');

	return { game };
};
