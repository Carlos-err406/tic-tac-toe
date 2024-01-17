<script lang="ts">
	import type { FieldStore, ResetterStore } from '$lib/types/storeTypes';
	import { getContext } from 'svelte';

	const resetter = getContext<ResetterStore>('resetter');
	const board = getContext<FieldStore>('board');

	const restart = () => {
		resetter.reset();
	};
	$: disabled = !$board.some((value) => value);
</script>

<button
	on:click={restart}
	class="h-fit px-4 py-2 text-xl rounded-lg bg-slate-600 text-slate-200 font-semibold transition-all duration-200 hover:scale-105 hover:brightness-125 active:scale-90 disabled:opacity-50"
	class:pointer-events-none={disabled}
	{disabled}
>
	Restart
</button>
