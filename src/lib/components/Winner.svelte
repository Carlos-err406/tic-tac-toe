<script lang="ts">
	import type { IsTieStore, ResetterStore, WinnerStore } from '$lib/types/storeTypes';
	import { getContext } from 'svelte';
	import Circle from './Circle.svelte';
	import Cross from './Cross.svelte';

	const winner = getContext<WinnerStore>('winner');
	const isTie = getContext<IsTieStore>('isTie');
	const resetter = getContext<ResetterStore>('resetter');

	const focus = (node: HTMLButtonElement) => node.focus();
	const handleKeyDown = (event: KeyboardEvent) => {
		const { key } = event;
		if (key === 'Escape') {
			event.preventDefault();
			close();
		} else if (key === 'Tab' || (event.shiftKey && key === 'Tab')) {
			event.preventDefault();
		}
	};
	const close = () => {
		resetter.reset();
	};
</script>

<svelte:window on:keydown={handleKeyDown} />
<button
	use:focus
	type="button"
	class="fixed flex w-full h-full items-center justify-center backdrop-blur-sm bg-slate-50/10 cursor-default outline-none border-none"
	on:click={close}
>
	<div class="text-7xl font-bold font-mono">
		{#if $isTie}
			IT'S A TIE!
		{:else if $winner === 'X'}
			<div class="flex justify-center items-center gap-5">
				AND THE WINNER IS PLAYER <Cross />
			</div>
		{:else if $winner === 'O'}
			<div class="flex justify-center items-center gap-5">
				AND THE WINNER IS PLAYER <Circle />
			</div>
		{/if}
	</div>
</button>
