<script lang="ts">
	import type { ScoreStore } from '$lib/types/storeTypes';
	import { getContext, onMount } from 'svelte';
	import Score from './Score.svelte';
	import ScoreHeader from './ScoreHeader.svelte';
	import ScoreTotal from './ScoreTotal.svelte';
	import { scale, slide } from 'svelte/transition';
	const score = getContext<ScoreStore>('score');
	let showingTable = false;
	const toggleTable = () => (showingTable = !showingTable);
	let mounted = false;
	onMount(() => (mounted = true));
</script>

<div class="flex flex-col items-center gap-3 lg:px-28 py-4 w-full">
	{#if mounted}
		<button on:click={toggleTable}>
			{showingTable ? 'Hide' : 'Show'} score table
		</button>
	{/if}
	{#if showingTable}
		<div
			transition:slide={{ axis: 'y' }}
			class="w-[300px] relative grid grid-cols-2 border-2 rounded-md gap-y-4 gap-x-6 px-5 overflow-y-auto"
			id="scores"
		>
			<ScoreHeader player="X" />
			<ScoreHeader player="O" />
			<Score player="X" />
			<Score player="O" />
			<ScoreTotal player="X" />
			<ScoreTotal player="O" />
		</div>
		<button
			transition:scale
			type="button"
			on:click={() => score.reset()}
			class="bg-slate-700 text-white rounded-md px-3 py-1 shadow-lg hover:brightness-125 transition-all duration-200"
		>
			Reset scores
		</button>
	{/if}
</div>

<style>
	#scores {
		max-height: calc(100dvh - 200px);
		max-height: calc(100vh - 200px);
	}
</style>
