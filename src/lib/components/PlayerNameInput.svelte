<script lang="ts">
	import type { PlayerType } from '$lib/types';

	export let value: string;
	export let playerType: PlayerType;
</script>

<label for="player-{playerType}-name">
	<span class="text-slate-500">Player {playerType}</span>
	<input type="text" required placeholder="player {playerType} name" maxlength="8" bind:value />
</label>
