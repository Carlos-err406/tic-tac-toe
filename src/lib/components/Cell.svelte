<script lang="ts">
	import { WinType } from '$lib/types';
	import type {
		CrossTurnStore,
		FieldStore,
		IsTieStore,
		TurnStore,
		WinTypeStore,
		WinnerStore
	} from '$lib/types/storeTypes';
	import { createEventDispatcher, getContext } from 'svelte';
	import { scale } from 'svelte/transition';
	import Circle from './Circle.svelte';
	import Cross from './Cross.svelte';
	import { lg, md, sm, xl, xs, xxs } from '$lib/stores';

	export let index: number;
	let cell: HTMLButtonElement;
	const turn = getContext<TurnStore>('turn');
	const winType = getContext<WinTypeStore>('winType');
	const field = getContext<FieldStore>('field');
	const winner = getContext<WinnerStore>('winner');
	const isTie = getContext<IsTieStore>('isTie');
	const crossTurn = getContext<CrossTurnStore>('crossTurn');
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		if (!$field[index]) {
			$field[index] = $crossTurn ? 'X' : 'O';
			cell.blur();
			turn.update((state) => state + 1);
			dispatch('played');
		}
	};

	$: belongsToWinType =
		([0, 1, 2].includes(index) && $winType === WinType.ROW_1) ||
		([3, 4, 5].includes(index) && $winType === WinType.ROW_2) ||
		([6, 7, 8].includes(index) && $winType === WinType.ROW_3) ||
		([0, 3, 6].includes(index) && $winType === WinType.COL_1) ||
		([1, 4, 7].includes(index) && $winType === WinType.COL_2) ||
		([2, 5, 8].includes(index) && $winType === WinType.COL_3) ||
		([0, 4, 8].includes(index) && $winType === WinType.DIAG_1) ||
		([2, 4, 6].includes(index) && $winType === WinType.DIAG_2);

	$: playerSize = $xl ? 150 : $lg ? 120 : $md ? 100 : $sm ? 150 : $xs ? 90 : $xxs ? 50 : 0;
</script>

<button
	id="field-cell-{index}"
	type="button"
	class="flex overflow-clip flex-none items-center justify-center rounded-lg transition-all duration-150 aspect-square bg-white/5 backdrop-blur-md hover:brightness-125"
	bind:this={cell}
	on:click={handleClick}
	tabindex={$field[index] ? -1 : 0}
	class:cross={$field[index] === 'X'}
	class:circle={$field[index] === 'O'}
	class:empty={!$field[index]}
	class:game-over={!!$winner || $isTie}
	class:winner={$winner && belongsToWinType}
	class:pointer-events-none={$field[index] || $winner}
	disabled={!!$winner || !!$field[index]}
	in:scale={{ delay: index * 1000, duration: 200 }}
>
	{#if $field[index] === 'X'}
		<div out:scale={{ duration: 200, delay: index * 100 }}>
			<Cross size={playerSize} />
		</div>
	{:else if $field[index] === 'O'}
		<div out:scale={{ duration: 200, delay: index * 100 }}>
			<Circle size={playerSize} />
		</div>
	{/if}
</button>

<style lang="postcss">
	.cross.winner {
		@apply brightness-100 bg-red-500/30;
	}
	button.game-over:not(.winner) {
		@apply brightness-75;
	}
	.circle.winner {
		@apply brightness-100 bg-blue-500/30;
	}
</style>
