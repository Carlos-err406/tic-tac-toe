<script lang="ts">
	import type { CrossTurnStore, IsTieStore, WinnerStore } from '$lib/types/storeTypes';
	import { getContext } from 'svelte';
	import Circle from './Circle.svelte';
	import Cross from './Cross.svelte';
	const crossTurn = getContext<CrossTurnStore>('crossTurn');
	const winner = getContext<WinnerStore>('winner');
	const isTie = getContext<IsTieStore>('isTie');
	const [xName, oName] = getContext<[string, string]>('names');
</script>

<div class="text-2xl gap-3 h-full justify-center flex items-center">
	{#if $isTie}
		-
	{:else if $winner === 'X'}
		{xName}
		<Cross size={30} />
	{:else if $winner === 'O'}
		{oName}
		<Circle size={30} duration={3} />
	{:else if $crossTurn}
		{xName}
		<Cross size={30} />
	{:else}
		{oName}
		<Circle size={30} duration={3} />
	{/if}
</div>
