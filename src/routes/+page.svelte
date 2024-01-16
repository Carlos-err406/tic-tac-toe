<script lang="ts">
	import AiMatch from '$lib/components/AIMatch.svelte';
	import CreatedGames from '$lib/components/CreatedGames.svelte';
	import LocalMatchForm from '$lib/components/LocalMatchForm.svelte';
	import OnlineMatchForm from '$lib/components/OnlineMatchForm.svelte';
	import TypingMachine from '$lib/components/TypingMachine.svelte';
	import type { Subscriber } from '$lib/events';
	import { lg, sm, xxs } from '$lib/stores';
	import type { Game } from '@prisma/client';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	let mounted = false;
	onMount(() => (mounted = true));
	let games: Subscriber<Game>[] = [];

	const handleCreatedGame = ({ detail }: CustomEvent<Subscriber<Game>>) => {
		games = [...games, detail];
	};
</script>

<div class="w-full h-full flex flex-col gap-7 justify-center items-center">
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
			<div in:scale={{ duration: 300, delay: 400 }}>
				<OnlineMatchForm on:created-game={handleCreatedGame} />
			</div>
			<div in:scale={{ duration: 300, delay: 800 }}><AiMatch /></div>
		</div>
	{/if}
	<CreatedGames bind:games />
</div>
