<script lang="ts">
	import { createConfettiTrigger } from '$lib';
	import Game from '$lib/components/Game.svelte';
	import Score from '$lib/components/ScoreTable.svelte';
	import Winner from '$lib/components/Winner.svelte';
	import {
		createCrossTurnStore,
		createFieldStore,
		createGameOverStore,
		createIsTieStore,
		createResetterStore,
		createScoreStore,
		createTurnStore,
		createWinTypeStore,
		createWinnerStore
	} from '$lib/stores';
	import { setContext } from 'svelte';
	const score = setContext('score', createScoreStore());
	const turn = setContext('turn', createTurnStore());
	let field = setContext('field', createFieldStore());
	const winner = setContext('winner', createWinnerStore());
	const winType = setContext('winType', createWinTypeStore());
	const confettiTrigger = setContext('confettiTrigger', createConfettiTrigger());
	const gameOver = setContext('gameOver', createGameOverStore(turn, winner));
	setContext('crossTurn', createCrossTurnStore(turn));
	setContext('isTie', createIsTieStore(turn, winner));
	setContext(
		'resetter',
		createResetterStore({
			turn,
			winner,
			field,
			winType,
			confettiTrigger,
			score
		})
	);
</script>

<div class="flex flex-col items-center justify-center h-full">
	<Game />
	<Score />
	{#if $gameOver}
		<Winner />
	{/if}
</div>
