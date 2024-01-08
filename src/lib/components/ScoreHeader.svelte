<script lang="ts">
	import type { PlayerType } from '$lib/types';
	import Circle from './Circle.svelte';
	import Cross from './Cross.svelte';
	export let player: PlayerType;
</script>

<div class="flex w-full h-full items-center justify-center top-0 sticky bg-background py-2">
	{#if player === 'X'}
		<Cross size={30} />
	{:else if player === 'O'}
		<Circle size={30} duration={3} />
	{/if}
</div>
