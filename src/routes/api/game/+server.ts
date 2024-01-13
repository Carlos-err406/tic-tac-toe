import { PROTOCOL, VERCEL_URL } from '$env/static/private';
import prisma from '$lib/prisma';
import { randString } from '$lib/utils.js';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const generateInviteLink = (roomID: string): string =>
		`${PROTOCOL}${VERCEL_URL}/join-match/${roomID}`;

	const generateGameLink = (roomID: string): string => `${PROTOCOL}${VERCEL_URL}/game/${roomID}`;
	const { challengerName } = await request.json();
	const roomID = randString(6);
	const game = await prisma.games.create({
		data: {
			roomID,
			inviteLink: generateInviteLink(roomID),
			gameLink: generateGameLink(roomID),
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
