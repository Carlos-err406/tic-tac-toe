<script lang="ts">
	import type { PlayerType } from '$lib/types';
	import type { ScoreStore } from '$lib/types/storeTypes';
	import { chunk } from '$lib/utils';
	import { getContext } from 'svelte';
	export let player: PlayerType;
	const score = getContext<ScoreStore>('score');
</script>

<div class="grid grid-cols-3 gap-x-3 py-2 w-full">
	{#each chunk(Array.from({ length: $score[player] }), 5) as grouped}
		<span class="grid grid-cols-5 gap-y-1 gap-x-0" class:line-through={grouped.length === 5}>
			{#each grouped as _}
				<span> | </span>
			{/each}
		</span>
	{/each}
</div>
