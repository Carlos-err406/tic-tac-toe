<script lang="ts">
	import { WinType, type ConfettiTrigger, type ThreeCells, type WinCheck } from '$lib/types';
	import type {
		FieldStore,
		ScoreStore,
		TurnStore,
		WinTypeStore,
		WinnerStore
	} from '$lib/types/storeTypes';
	import { getContext } from 'svelte';
	import Field from './Field.svelte';
	import Player from './Player.svelte';
	import RestartButton from './RestartButton.svelte';
	import Turn from './Turn.svelte';

	const [winner, winType, score, turn, field, confettiTrigger] = [
		getContext<WinnerStore>('winner'),
		getContext<WinTypeStore>('winType'),
		getContext<ScoreStore>('score'),
		getContext<TurnStore>('turn'),
		getContext<FieldStore>('field'),
		getContext<ConfettiTrigger>('confettiTrigger')
	];
	const analyze = () => {
		const check: WinCheck[] = getWinCheckArray();
		for (const row of check) {
			const { cells, winType: win } = row;
			$winner = checkRow(cells);
			if ($winner) {
				$winType = win;
				score.score($winner);
				triggerWinAnimation();
				return;
			}
		}
		if ($turn === 10) {
			triggerWinAnimation();
		}
	};

	const getWinCheckArray = (): WinCheck[] => [
		{ cells: [$field[0], $field[1], $field[2]], winType: WinType.ROW_1 },
		{ cells: [$field[3], $field[4], $field[5]], winType: WinType.ROW_2 },
		{ cells: [$field[6], $field[7], $field[8]], winType: WinType.ROW_3 },
		{ cells: [$field[0], $field[3], $field[6]], winType: WinType.COL_1 },
		{ cells: [$field[1], $field[4], $field[7]], winType: WinType.COL_2 },
		{ cells: [$field[2], $field[5], $field[8]], winType: WinType.COL_3 },
		{ cells: [$field[0], $field[4], $field[8]], winType: WinType.DIAG_1 },
		{ cells: [$field[2], $field[4], $field[6]], winType: WinType.DIAG_2 }
	];

	const checkRow = ([a, b, c]: ThreeCells) => {
		if (a && b && c && a === b && a === c) {
			return a;
		}
		return null;
	};

	const triggerWinAnimation = async () => {
		if ($winner === 'X') {
			confettiTrigger.triggerCrossConfetti();
		} else if ($winner === 'O') {
			confettiTrigger.triggerCircleConfetti();
		} else {
			confettiTrigger.triggerTieConfetti();
		}
	};
</script>

<div class="flex flex-col items-center gap-4">
	<div class="grid grid-cols-3 w-full">
		<Player />
		<Turn />
		<RestartButton />
	</div>
	<Field on:played={() => $turn > 5 && !$winner && analyze()} />
</div>
