import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { cubicOut } from 'svelte/easing';
import type { TransitionConfig } from 'svelte/transition';
import confetti from 'canvas-confetti';
import { writable } from 'svelte/store';
import { spring } from 'svelte/motion';

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

export interface HeightSpringOptions {
	stiffness: number;
	damping: number;
}
export interface WidthSpringOptions extends HeightSpringOptions {
	initialw: number;
}
export function springHeight(
	element: HTMLElement,
	options: HeightSpringOptions = { stiffness: 0.1, damping: 0.4 }
) {
	if (!element) return;
	const internalStore = writable<number | null>(null, (set) => {
		const obeserver = new ResizeObserver(() => element && set(element.offsetHeight));
		obeserver.observe(element);
		return () => obeserver.disconnect();
	});
	const springStore = spring(0, options);
	internalStore.subscribe((value) => {
		value !== null && springStore.set(value);
	});
	return springStore;
}

export const chunk = <T extends any>(array: T[], size: number = 1): T[][] => {
	const slice = (array: T[], start: number, end?: number) => {
		let length = array == null ? 0 : array.length;
		if (!length) {
			return [];
		}
		start = start == null ? 0 : start;
		end = end === undefined ? length : end;

		if (start < 0) {
			start = -start > length ? 0 : length + start;
		}
		end = end > length ? length : end;
		if (end < 0) {
			end += length;
		}
		length = start > end ? 0 : (end - start) >>> 0;
		start >>>= 0;

		let index = -1;
		const result = new Array(length);
		while (++index < length) {
			result[index] = array[index + start];
		}
		return result;
	};
	size = Math.max(size, 0);
	const length = array == null ? 0 : array.length;
	if (!length || size < 1) {
		return [];
	}
	let index = 0;
	let resIndex = 0;
	const result = new Array(Math.ceil(length / size));

	while (index < length) {
		result[resIndex++] = slice(array, index, (index += size));
	}
	return result;
};
