<script lang="ts">
	import type { CrossTurnStore, IsTieStore, WinnerStore } from '$lib/types/storeTypes';
	import { getContext } from 'svelte';
	import Circle from './Circle.svelte';
	import Cross from './Cross.svelte';
	const crossTurn = getContext<CrossTurnStore>('crossTurn');
	const winner = getContext<WinnerStore>('winner');
	const isTie = getContext<IsTieStore>('isTie');
</script>

<div class="text-3xl flex gap-3 h-full justify-center items-center">
	Player
	<span>
		{#if $isTie}
			-
		{:else if $winner === 'X'}
			<Cross size={30} />
		{:else if $winner === 'O'}
			<Circle size={30} duration={3} />
		{:else if $crossTurn}
			<Cross size={30} />
		{:else}
			<Circle size={30} duration={3} />
		{/if}
	</span>
</div>
