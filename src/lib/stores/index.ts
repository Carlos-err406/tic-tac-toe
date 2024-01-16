import type { Subscriber } from '$lib/events';
import type { FieldType, PlayerType, WinType } from '$lib/types';
import type {
	FieldStore,
	GameOverStore,
	ResetterStore,
	ResetterStores,
	ScoreStore,
	TurnStore,
	WinTypeStore,
	WinnerStore
} from '$lib/types/storeTypes';
import type { Game } from '@prisma/client';
import { derived, readable, writable } from 'svelte/store';

export const createTurnStore = (): TurnStore => {
	const { subscribe, set, update } = writable<number>(1);
	return {
		subscribe,
		set,
		update,
		reset: () => set(1)
	};
};
export const createCrossTurnStore = (turnStore: TurnStore) =>
	derived(turnStore, ($turn) => $turn % 2 === 1);

export const createIsTieStore = (turnStore: TurnStore, winnerStore: WinnerStore) =>
	derived([turnStore, winnerStore], ([$turn, $winner]) => $turn === 10 && $winner === null);

export const createFieldStore = (): FieldStore => {
	const initialValue: FieldType = [null, null, null, null, null, null, null, null, null];
	const { subscribe, set, update } = writable<FieldType>(initialValue);
	return {
		subscribe,
		set,
		update
	};
};

export const createWinnerStore = (): WinnerStore => {
	const { subscribe, set, update } = writable<PlayerType | null>(null);
	return {
		subscribe,
		set,
		update,
		reset: () => set(null)
	};
};

export const createWinTypeStore = (): WinTypeStore => {
	const { subscribe, set, update } = writable<WinType | null>(null);
	return {
		subscribe,
		set,
		update,
		reset: () => set(null)
	};
};

export const createGameOverStore = (
	turnStore: TurnStore,
	winnerStore: WinnerStore
): GameOverStore =>
	derived([turnStore, winnerStore], ([$turn, $winner]) => $turn === 10 || $winner !== null);

export const createResetterStore = ({
	turn,
	winner,
	field,
	winType,
	confettiTrigger,
	score
}: ResetterStores): ResetterStore => {
	const { subscribe } = readable({ turn, winner, field, winType, confettiTrigger, score });
	const reset = () => {
		turn.reset();
		winner.reset();
		winType.reset();
		field.set([null, null, null, null, null, null, null, null, null]);
		// score.reset();
		confettiTrigger.clear();
	};
	return {
		subscribe,
		reset
	};
};

export const createScoreStore = (): ScoreStore => {
	const { subscribe, set, update } = writable({ X: 0, O: 0 });
	const scoreX = () => {
		update((state) => {
			state.X = state.X + 1;
			return state;
		});
	};
	const scoreO = () => {
		update((state) => {
			state.O = state.O + 1;
			return state;
		});
	};
	const score = (player: PlayerType) => {
		if (player === 'X') scoreX();
		else if (player === 'O') scoreO();
	};

	const reset = () => {
		set({
			O: 0,
			X: 0
		});
	};
	return {
		subscribe,
		update,
		set,
		score,
		scoreX,
		scoreO,
		reset
	};
};

export const footerHeight = writable<number>(31);
export const clientWidth = writable<number>(1024);
export const xxs = derived(clientWidth, ($clientWidth) => $clientWidth < 320);
export const xs = derived(clientWidth, ($clientWidth) => $clientWidth >= 320);
export const sm = derived(clientWidth, ($clientWidth) => $clientWidth >= 640);
export const md = derived(clientWidth, ($clientWidth) => $clientWidth >= 768);
export const lg = derived(clientWidth, ($clientWidth) => $clientWidth >= 1024);
export const xl = derived(clientWidth, ($clientWidth) => $clientWidth >= 1280);
export const xxl = derived(clientWidth, ($clientWidth) => $clientWidth >= 1536);

export const playerSize = derived([xxs, xs, sm, md, lg, xl], ([$xxs, $xs, $sm, $md, $lg, $xl]) =>
	$xl ? 150 : $lg ? 120 : $md ? 100 : $sm ? 150 : $xs ? 90 : $xxs ? 50 : 0
);
