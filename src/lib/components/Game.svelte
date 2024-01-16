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

	const [winner, winType, score, turn, board, confettiTrigger] = [
		getContext<WinnerStore>('winner'),
		getContext<WinTypeStore>('winType'),
		getContext<ScoreStore>('score'),
		getContext<TurnStore>('turn'),
		getContext<FieldStore>('board'),
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
		{ cells: [$board[0], $board[1], $board[2]], winType: WinType.ROW_1 },
		{ cells: [$board[3], $board[4], $board[5]], winType: WinType.ROW_2 },
		{ cells: [$board[6], $board[7], $board[8]], winType: WinType.ROW_3 },
		{ cells: [$board[0], $board[3], $board[6]], winType: WinType.COL_1 },
		{ cells: [$board[1], $board[4], $board[7]], winType: WinType.COL_2 },
		{ cells: [$board[2], $board[5], $board[8]], winType: WinType.COL_3 },
		{ cells: [$board[0], $board[4], $board[8]], winType: WinType.DIAG_1 },
		{ cells: [$board[2], $board[4], $board[6]], winType: WinType.DIAG_2 }
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

<div class="flex flex-col items-center gap-4 p-2">
	<div class="grid grid-cols-2 md:grid-cols-3 gap-y-5 md:gap-y-3 w-full">
		<div>
			<Player />
		</div>
		<div>
			<Turn />
		</div>
		<div class="w-full flex justify-center items-center col-span-2 md:col-span-1">
			<RestartButton />
		</div>
	</div>
	<Field on:played={() => $turn > 5 && !$winner && analyze()} />
</div>
