export const createGame = async () => {
	await fetch('/api/game', { method: 'POST', body: JSON.stringify({ asd: 'asd' }) });
};
