import type { Invalidator, Readable, Subscriber, Unsubscriber } from 'svelte/store';
import type { FieldType, PlayerType, WinType } from '.';

type Subscribe<T> = (
	this: void,
	run: Subscriber<T>,
	invalidate?: Invalidator<T> | undefined
) => Unsubscriber;
type Set<T> = (value: T) => void;
type Update<T> = (updater: (value: T) => T) => void;
type Store<T> = {
	subscribe: Subscribe<T>;
	set: Set<T>;
	update: Update<T>;
};
export type CrossTurnStore = Readable<boolean>;
export type IsTieStore = Readable<boolean>;

export type TurnStore = Store<number> & {
	reset: () => void;
};

export type FieldStore = Store<FieldType>;

export type WinnerStore = Store<PlayerType | null> & {
	reset: () => void;
};
export type WinTypeStore = Store<WinType | null> & {
	reset: () => void;
};
