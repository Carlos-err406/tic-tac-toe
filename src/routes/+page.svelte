<script lang="ts">
	import AiMatch from '$lib/components/AIMatch.svelte';
	import LocalMatchForm from '$lib/components/LocalMatchForm.svelte';
	import OnlineMatchForm from '$lib/components/OnlineMatchForm.svelte';
	import TypingMachine from '$lib/components/TypingMachine.svelte';
	import { lg, sm, xxs } from '$lib/stores';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	let mounted = false;
	onMount(() => (mounted = true));
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	{#if mounted}
		<h1 class="text-3xl font-bold mb-5 text-center">
			<TypingMachine speed={100} type="text" text="Tic Tac Toe" />
		</h1>
		<div
			class="grid gap-y-3 gap-x-5"
			class:grid-cols-3={$lg}
			class:grid-cols-2={$sm && !$lg}
			class:grid-cols-1={$xxs}
		>
			<div in:scale={{ duration: 300, delay: 0 }}><LocalMatchForm /></div>
			<div in:scale={{ duration: 300, delay: 400 }}><OnlineMatchForm /></div>
			<div in:scale={{ duration: 300, delay: 800 }}><AiMatch /></div>
		</div>
	{/if}
</div>
