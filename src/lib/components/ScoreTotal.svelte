<script lang="ts">
	import type { PlayerType } from '$lib/types';
	import type { ScoreStore } from '$lib/types/storeTypes';
	import { getContext } from 'svelte';
	const score = getContext<ScoreStore>('score');
	export let player: PlayerType;
</script>

<div class="cross-total flex items-center justify-center w-full sticky bottom-0 py-2 bg-background">
	{$score[player]}
</div>
