import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const game = await prisma.game.findFirst({
		where: { roomID: id },
		include: { challenger: true, opponent: true }
	});
	return json({ challenger: game?.challenger || '', opponent: game?.opponent || '' });
};
