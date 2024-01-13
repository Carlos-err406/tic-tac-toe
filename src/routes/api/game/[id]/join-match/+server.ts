import prisma from '$lib/prisma';
import { $Enums } from '@prisma/client';
import { json, type RequestHandler } from '@sveltejs/kit';

export const PATCH: RequestHandler = async ({ request, params }) => {
	const { oponentName } = await request.json();
	const { id } = params as Record<string, string>;
	const game = await prisma.game.update({
		where: {
			roomID: id
		},
		data: {
			state: $Enums.GameState.IN_PROGRESS,
			opponent: {
				update: {
					name: oponentName
				}
			}
		}
	});
	return json(game);
};
