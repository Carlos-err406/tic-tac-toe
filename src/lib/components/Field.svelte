<script lang="ts">
	import { xs, xxs } from '$lib/stores';
	import Cell from './Cell.svelte';
	const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
</script>

<div class="grid grid-cols-3 grid-rows w-full gap-2 sm:w-4/5" class:w-full={$xs || $xxs}>
	{#each cells as cell (cell)}
		<Cell index={cell} on:played />
	{/each}
</div>
