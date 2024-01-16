<script script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Subscriber } from '$lib/events';
	import { createGame } from '$lib/modules/Game';
	import type { Game } from '@prisma/client';
	import { createEventDispatcher } from 'svelte';
	import PlayerNameInput from './PlayerNameInput.svelte';
	let form: HTMLFormElement;
	let playerName = $page.data.name3;
	const dispatch = createEventDispatcher();

	const createRoom = async () => {
		if (form.reportValidity()) {
			const game = await createGame(playerName);
			const subscriber = new Subscriber<Game>(`${game.roomID}___game_update`);
			subscriber.setPayload(game);
			dispatch('created-game', subscriber);
		}
	};
</script>

<Card.Root class="w-[304px] min-h-[400px]">
	<Card.Header>
		<Card.Title>Online Match</Card.Title>
		<Card.Description>Play online with a friend</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col w-full">
			<form bind:this={form} class="flex flex-col gap-4 items-center" on:submit|preventDefault>
				<PlayerNameInput playerType="X" bind:value={playerName} />
				<button type="submit" class="btn-text" on:click={createRoom}>Create room</button>
			</form>
		</div>
	</Card.Content>
</Card.Root>
