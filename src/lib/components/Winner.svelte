<script lang="ts">
	import { playerSize } from '$lib/stores';
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
	class="fixed flex w-full h-full items-start py-10 md:py-0 md:items-center justify-center backdrop-blur-sm bg-slate-500/50 cursor-default outline-none border-none"
	on:click={close}
>
	<div class="xl:text-7xl lg:text-6xl md:text-4xl text-xl font-bold font-mono">
		{#if $isTie}
			IT'S A TIE!
		{:else if $winner === 'X'}
			<div class="flex flex-col md:flex-row items-center gap-5">
				AND THE WINNER IS PLAYER <Cross size={$playerSize} />
			</div>
		{:else if $winner === 'O'}
			<div class="flex flex-col md:flex-row justify-center items-center gap-5">
				AND THE WINNER IS PLAYER <Circle size={$playerSize} />
			</div>
		{/if}
	</div>
</button>
