import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params as Record<string, string>;
	try {
		await prisma.game.delete({ where: { roomID: id } });
	} catch {}
	return json(null, { status: 200 });
};
