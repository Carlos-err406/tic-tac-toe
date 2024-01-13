<script lang="ts">
	import type { PlayerType } from '$lib/types';
	import { v4 } from 'uuid';
	export let id = v4();
	export let value: string;
	export let playerType: PlayerType;
</script>

<label for={id}>
	<span class="text-slate-500">Player {playerType}</span>
	<input
		{id}
		type="text"
		required
		placeholder="player {playerType} name"
		maxlength="8"
		bind:value
	/>
</label>
