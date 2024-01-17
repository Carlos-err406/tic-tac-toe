import prisma from '$lib/prisma';
import { randString } from '$lib/utils';
import { json } from '@sveltejs/kit';

const generateInviteLink = (roomID: string): string => `/join-match/${roomID}`;
const generateGameLink = (roomID: string): string => `/game/${roomID}`;

export const POST = async ({ request }) => {
	const id = randString(6);
	const { challengerName } = await request.json();
	const game = await prisma.game.create({
		data: {
			roomID: id,
			inviteLink: generateInviteLink(id),
			gameLink: generateGameLink(id),
			challenger: {
				create: {
					name: challengerName
				}
			},
			opponent: {
				create: { name: '' }
			},
			board: {
				create: {}
			},
			score: {
				create: {}
			}
		}
	});
	return json(game);
};
