import prisma from '$lib/prisma';
import { $Enums, type Challenger, type Opponent } from '@prisma/client';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	let game = await prisma.game.findUnique({
		where: { roomID: id },
		include: { challenger: true, opponent: true }
	});
	if (!game) throw redirect(302, '/');

	return { game };
};
