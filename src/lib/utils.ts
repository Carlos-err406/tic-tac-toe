import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import confetti from 'canvas-confetti';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type FlyAndScaleParams = {
	y?: number;
	x?: number;
	start?: number;
	duration?: number;
};

export const flyAndScale = (
	node: Element,
	params: FlyAndScaleParams = { y: -8, x: 0, start: 0.95, duration: 150 }
): TransitionConfig => {
	const style = getComputedStyle(node);
	const transform = style.transform === 'none' ? '' : style.transform;

	const scaleConversion = (valueA: number, scaleA: [number, number], scaleB: [number, number]) => {
		const [minA, maxA] = scaleA;
		const [minB, maxB] = scaleB;

		const percentage = (valueA - minA) / (maxA - minA);
		const valueB = percentage * (maxB - minB) + minB;

		return valueB;
	};

	const styleToString = (style: Record<string, number | string | undefined>): string => {
		return Object.keys(style).reduce((str, key) => {
			if (style[key] === undefined) return str;
			return str + `${key}:${style[key]};`;
		}, '');
	};

	return {
		duration: params.duration ?? 200,
		delay: 0,
		css: (t) => {
			const y = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
			const x = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
			const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);

			return styleToString({
				transform: `${transform} translate3d(${x}px, ${y}px, 0) scale(${scale})`,
				opacity: t
			});
		},
		easing: cubicOut
	};
};

export const getConfetti = () => {
	const crossPath =
		'M5.7 18.3C5.3 17.9 5.3 17.3 5.7 16.9L16.9 5.7C17.3 5.3 17.9 5.3 18.3 5.7C18.7 6.1 18.7 6.7 18.3 7.1L7.1 18.3C6.7 18.7 6.1 18.7 5.7 18.3L5.7 5.7C6.1 5.3 6.7 5.3 7.1 5.7L18.3 16.9C18.7 17.3 18.7 17.9 18.3 18.3C17.9 18.7 17.3 18.7 16.9 18.3L5.7 7.1C5.3 6.7 5.3 6.1 5.7 5.7Z';
	const circlePath =
		'M12 0c6.72784,0 12.2687,5.54046 12.2687,12.2683 0,6.72824 -5.54046,12.2687 -12.2687,12.2687 -6.73769,-0.00225193 -12.2683,-5.38613 -12.2683,-12.2687 0,-6.72784 5.54046,-12.2683 12.2683,-12.2683zm0 2.77791c-5.20503,0 -9.4904,4.28536 -9.4904,9.4904 0,5.20543 4.28497,9.49079 9.4904,9.49079 5.20543,0 9.49079,-4.28536 9.49079,-9.49079 0,-5.20543 -4.28536,-9.4904 -9.49079,-9.4904z';
	const crossColor = '#ef4444';
	const circleColor = '#3b82f6';
	const cross = confetti.shapeFromPath({
		path: crossPath
	});
	const circle = confetti.shapeFromPath({
		path: circlePath
	});

	return {
		cross: { cross, color: crossColor },
		circle: { circle, color: circleColor }
	};
};
