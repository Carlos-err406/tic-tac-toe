<script lang="ts">
	import type { Subscriber } from '$lib/events';
	import { deleteGame } from '$lib/modules/Game';
	import type { Game } from '@prisma/client';
	import { scale } from 'svelte/transition';
	import CreatedGameCard from './CreatedGameCard.svelte';
	export let games: Subscriber<Game>[] = [];
	const handleGameDeleted = async ({ detail }: CustomEvent<Game>) => {
		await deleteGame(detail.roomID);
		games = games.filter((s) => {
			s.unsubscribe();
			const data = s.getPayloadData();
			return data.roomID !== detail.roomID;
		});
	};
</script>

<div class="grid grid-cols-2 gap-4">
	{#each games as subscriber (subscriber.channel)}
		<div transition:scale>
			<CreatedGameCard {subscriber} on:game-deleted={handleGameDeleted} />
		</div>
	{/each}
</div>
