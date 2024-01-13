import prisma from '$lib/prisma';
import { json, type RequestHandler } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params as Record<string, string>;
	console.log(`deleting game ${id}`);
	await prisma.games.delete({ where: { roomID: id } });
	return json(null, { status: 200 });
};
