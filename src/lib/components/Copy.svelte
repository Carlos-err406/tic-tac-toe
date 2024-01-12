<script lang="ts">
	import { copy } from '$lib/utils';
	import { fly, slide } from 'svelte/transition';
	export let text: string | undefined;
	export let type: 'text' | 'url' = 'text';
	let copiedText = false;
	const copyText = () => {
		copy(text, () => {
			copiedText = true;
			setTimeout(() => (copiedText = false), 1000);
		});
	};
</script>

<div class="relative min-h-8 flex flex-wrap md:flex-nowrap min-w-full">
	<span class:pulse={!text} class="font-bold"><slot /></span>
	{#if text}
		<div in:slide={{ duration: 250, axis: 'x' }}>
			{#if type == 'text'}
				<button class="text-nowrap hover:opacity-75 {$$restProps.class}" on:click={copyText}>
					{text}
				</button>
			{:else if type == 'url'}
				<a
					href={text}
					target="_blank"
					class="focus:underline hover:underline outline-none break-all {$$restProps.class}"
					on:click|preventDefault={copyText}
				>
					{text}
				</a>
			{/if}
		</div>
	{/if}
	{#if copiedText}
		<div transition:fly={{ duration: 250, y: -20 }} class="absolute top-5 left-1/2">
			Copied!
		</div>
	{/if}
</div>
