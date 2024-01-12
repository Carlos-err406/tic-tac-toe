<script lang="ts">
	export let text: string;
	export let speed = 80;
	export let type: 'text' | 'url' = 'text';
	let copy = text;
	interface TypingOptions {
		text: string;
		speed?: number;
	}
	let remount = false;
	$: if (copy != text) {
		remount = true;
		setTimeout(() => (remount = false), 100);
		copy = text;
	}
	const typingMachine = (span: HTMLSpanElement, { text, speed }: TypingOptions) => {
		let index = 0;
		let interval = speed || 150;
		const intervalID = setInterval(() => {
			span.innerHTML += text.charAt(index++);
			if (index === text.length) {
				clearInterval(intervalID);
			}
		}, interval);
	};
	const classes = ($$restProps.class || '') as string;
</script>

{#if !remount}
	{#if type === 'text'}
		<span use:typingMachine={{ speed, text }} class={classes} />
	{:else}
		<a
			href={text}
			use:typingMachine={{ speed, text }}
			class="hover:undeline focus:underline outline-none active:underline {classes}">{''}</a
		>
	{/if}
{/if}
