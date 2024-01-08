<script lang="ts">
	import type { ConfettiTrigger } from '$lib/types';
	import type {
		FieldStore,
		ResetterStore,
		TurnStore,
		WinTypeStore,
		WinnerStore
	} from '$lib/types/storeTypes';
	import { getContext } from 'svelte';

	// const turn = getContext<TurnStore>('turn');
	const resetter = getContext<ResetterStore>('resetter');
	// const winType = getContext<WinTypeStore>('winType');
	const field = getContext<FieldStore>('field');
	// const winner = getContext<WinnerStore>('winner');
	// const confi = getContext<ConfettiTrigger>('confettiTrigger');

	const restart = () => {
		resetter.reset();
		// turn.reset();
		// winType.reset();
		// $field = [null, null, null, null, null, null, null, null, null];
		// winner.reset();
		// confi.clear();
	};
	$: disabled = !$field.some((value) => value);
</script>

<button
	on:click={restart}
	class="px-4 py-2 text-xl rounded-lg bg-slate-600 text-slate-200 font-semibold transition-all duration-200 hover:scale-105 hover:brightness-125 active:scale-90 disabled:opacity-50"
	class:pointer-events-none={disabled}
	{disabled}
>
	Restart
</button>
