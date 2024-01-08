<script lang="ts">
	import type { CrossTurnStore, IsTieStore, TurnStore, WinnerStore } from '$lib/types/storeTypes';
	import { getContext } from 'svelte';

	let turn = getContext<TurnStore>('turn');
	let winner = getContext<WinnerStore>('winner');
	let isTie = getContext<IsTieStore>('isTie');
	let crossTurn = getContext<CrossTurnStore>('crossTurn');
</script>

<div class="text-3xl h-full flex items-center justify-center">
	Turn:
	{#if $winner}
		<span
			class="ml-2 font-semibold"
			class:text-blue-500={$winner === 'O'}
			class:text-red-500={$winner === 'X'}
		>
			{$turn - 1}
		</span>
	{:else if $isTie}
		<span class="ml-2 font-semibold">
			{$turn}
		</span>
	{:else}
		<span
			class="ml-2 font-semibold"
			class:text-blue-500={!$crossTurn}
			class:text-red-500={$crossTurn}
		>
			{$turn}
		</span>
	{/if}
</div>
