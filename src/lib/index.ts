// place files you want to import through the `$lib` alias in this folder.
import confi from 'canvas-confetti';
import type { ConfettiTrigger } from './types';
export const createConfettiTrigger = (): ConfettiTrigger => {
	let shouldClear = false;
	const defaults: confi.Options = {
		scalar: 2,
		particleCount: 2,
		spread: 89,
		startVelocity: 70
	};
	const fire = (defaults: confi.Options) => {
		const end = Date.now() + 5 * 1000;
		const frame = () => {
			confi({ ...defaults, angle: 60, origin: { x: 0, y: 1 } });
			confi({ ...defaults, angle: 120, origin: { x: 1, y: 1 } });
			if (Date.now() < end && !shouldClear) {
				requestAnimationFrame(frame);
			}
		};
		if (!shouldClear) {
			requestAnimationFrame(frame);
		}
	};
	const getConfetti = () => {
		const crossPath =
			'M5.7 18.3C5.3 17.9 5.3 17.3 5.7 16.9L16.9 5.7C17.3 5.3 17.9 5.3 18.3 5.7C18.7 6.1 18.7 6.7 18.3 7.1L7.1 18.3C6.7 18.7 6.1 18.7 5.7 18.3L5.7 5.7C6.1 5.3 6.7 5.3 7.1 5.7L18.3 16.9C18.7 17.3 18.7 17.9 18.3 18.3C17.9 18.7 17.3 18.7 16.9 18.3L5.7 7.1C5.3 6.7 5.3 6.1 5.7 5.7Z';
		const circlePath =
			'M12 0c6.72784,0 12.2687,5.54046 12.2687,12.2683 0,6.72824 -5.54046,12.2687 -12.2687,12.2687 -6.73769,-0.00225193 -12.2683,-5.38613 -12.2683,-12.2687 0,-6.72784 5.54046,-12.2683 12.2683,-12.2683zm0 2.77791c-5.20503,0 -9.4904,4.28536 -9.4904,9.4904 0,5.20543 4.28497,9.49079 9.4904,9.49079 5.20543,0 9.49079,-4.28536 9.49079,-9.49079 0,-5.20543 -4.28536,-9.4904 -9.49079,-9.4904z';
		const crossColor = '#ef4444';
		const circleColor = '#3b82f6';
		const cross = confi.shapeFromPath({
			path: crossPath
		});
		const circle = confi.shapeFromPath({
			path: circlePath
		});

		return {
			cross: { cross, color: crossColor },
			circle: { circle, color: circleColor }
		};
	};

	const triggerCrossConfetti = () => {
		const {
			cross: { cross, color }
		} = getConfetti();
		let shapes: confetti.Shape[] = [cross];
		let colors: string[] = [color];
		fire({ ...defaults, shapes, colors });
	};
	const triggerCircleConfetti = () => {
		const {
			circle: { circle, color }
		} = getConfetti();
		let shapes: confetti.Shape[] = [circle];
		let colors: string[] = [color];
		fire({ ...defaults, shapes, colors });
	};
	const triggerTieConfetti = () => {
		const {
			circle: { circle, color: circleColor },
			cross: { cross, color: crossColor }
		} = getConfetti();
		let shapes: confetti.Shape[] = [cross, circle];
		let colors: string[] = [crossColor, circleColor];
		fire({ ...defaults, shapes, colors });
	};
	const clear = () => {
		shouldClear = true;
		confi.reset();
		setTimeout(() => (shouldClear = false), 100);
	};
	return {
		clear,
		triggerCrossConfetti,
		triggerCircleConfetti,
		triggerTieConfetti
	};
};
