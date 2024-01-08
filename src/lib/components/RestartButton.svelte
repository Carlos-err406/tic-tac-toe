<script lang="ts">
	import type {
		ClearConfettiStore,
		FieldStore,
		TurnStore,
		WinTypeStore,
		WinnerStore
	} from '$lib/types/storeTypes';
	import confetti from 'canvas-confetti';
	import { getContext } from 'svelte';

	const turn = getContext<TurnStore>('turn');
	const winType = getContext<WinTypeStore>('winType');
	const field = getContext<FieldStore>('field');
	const winner = getContext<WinnerStore>('winner');
	const clearConfetti = getContext<ClearConfettiStore>('clearConfetti');
	const restart = () => {
		turn.reset();
		winType.reset();
		$field = [null, null, null, null, null, null, null, null, null];
		winner.reset();
		clearConfetti.clear();
		confetti.reset();
	};
</script>

<button
	on:click={restart}
	class="px-4 py-2 rounded-lg bg-slate-600 text-slate-200 font-semibold transition-all duration-200 hover:scale-105 hover:brightness-125 active:scale-90"
	class:pointer-events-none={!$field.some((value) => value)}
>
	Restart
</button>
