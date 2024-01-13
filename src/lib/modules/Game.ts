import type { Game } from '@prisma/client';

export const createGame = async (challenger: string): Promise<Game> =>
	fetch('/api/game', { method: 'POST', body: JSON.stringify({ challengerName: challenger }) }).then(
		(res) => res.json()
	);

export const deleteGame = async (roomID: string): Promise<void> =>
	fetch(`/api/game/${roomID}`, { method: 'DELETE' }).then((res) => res.json());

export const joinMatch = async (roomID: string, oponent: string): Promise<Game> =>
	fetch(`/api/game/${roomID}/join-match`, {
		method: 'PATCH',
		body: JSON.stringify({ oponentName: oponent })
	}).then((res) => res.json());
