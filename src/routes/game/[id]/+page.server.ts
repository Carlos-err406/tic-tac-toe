import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	let game = await prisma.games.findUnique({
		where: { roomID: id },
		include: { challenger: true, opponent: true }
	});
	if (!game) throw redirect(302, '/');

	return { game };
};
