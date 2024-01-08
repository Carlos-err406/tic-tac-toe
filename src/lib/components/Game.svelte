<script lang="ts">
	import { WinType, type ThreeCells, type WinCheck } from '$lib/types';
	import { getConfetti } from '$lib/utils';
	import confetti from 'canvas-confetti';
	import { setContext } from 'svelte';
	import Field from './Field.svelte';
	import Player from './Player.svelte';
	import RestartButton from './RestartButton.svelte';
	import Turn from './Turn.svelte';
	import {
		createClearConfettiStore,
		createCrossTurnStore,
		createFieldStore,
		createIsTieStore,
		createTurnStore,
		createWinTypeStore,
		createWinnerStore
	} from './stores';

	let turn = createTurnStore();
	let field = createFieldStore();
	let winner = createWinnerStore();
	let winType = createWinTypeStore();
	let crossTurn = createCrossTurnStore(turn);
	let isTie = createIsTieStore(turn, winner);
	const clearConfetti = createClearConfettiStore();
	setContext('field', field);
	setContext('turn', turn);
	setContext('crossTurn', crossTurn);
	setContext('winner', winner);
	setContext('winType', winType);
	setContext('isTie', isTie);
	setContext('clearConfetti', clearConfetti);
	const analyze = () => {
		const check: WinCheck[] = getWinCheckArray();
		for (const row of check) {
			const { cells, winType: win } = row;
			$winner = checkRow(cells);
			if ($winner) {
				$winType = win;
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
		const {
			cross: { cross, color: crossColor },
			circle: { circle, color: circleColor }
		} = getConfetti();

		let shapes: confetti.Shape[] = [];
		let colors: string[] = [];
		if ($winner === 'X') {
			shapes = [cross];
			colors = [crossColor];
		} else if ($winner === 'O') {
			shapes = [circle];
			colors = [circleColor];
		} else {
			shapes = [cross, circle];
			colors = [crossColor, circleColor];
		}
		const defaults: confetti.Options = {
			scalar: 2,
			particleCount: 2,
			spread: 89,
			startVelocity: 70,
			shapes,
			colors
		};
		const end = Date.now() + 5 * 1000;
		const frame = () => {
			confetti({ ...defaults, angle: 60, origin: { x: 0, y: 1 } });
			confetti({ ...defaults, angle: 120, origin: { x: 1, y: 1 } });
			if (Date.now() < end && !$clearConfetti) {
				requestAnimationFrame(frame);
			}
		};
		if (!$clearConfetti) {
			requestAnimationFrame(frame);
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
