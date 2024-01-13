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
	import type { PageData } from './$types';
	export let data: PageData;
	const { game } = data;
	setContext('names', [game.challenger.name, game.opponent.name]);
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

<div class="grid grid-cols-2">
	<div class="col-span-2 w-full md:col-span-1 md:w-auto">
		<Game />
	</div>
	<div class="flex w-full col-span-2 md:col-span-1 justify-center md:justify-start">
		<Score />
	</div>
	{#if $gameOver}
		<Winner />
	{/if}
</div>
