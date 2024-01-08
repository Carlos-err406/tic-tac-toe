import type { FieldType, PlayerType, WinType } from '$lib/types';
import type {
	FieldStore,
	TurnStore,
	WinTypeStore,
	WinnerStore
} from '$lib/types/storeTypes';
import { derived, writable } from 'svelte/store';

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
