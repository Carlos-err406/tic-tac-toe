<script lang="ts">
	import Cell from './Cell.svelte';
	const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
</script>

<div class="grid grid-cols-3 grid-rows w-full lg:w-4/5 gap-2">
	{#each cells as cell (cell)}
		<Cell index={cell} on:played />
	{/each}
</div>
