<script lang="ts">
	import { page } from '$app/stores';
	import * as Card from '$lib/components/ui/card';
	import { Subscriber } from '$lib/events';
	import { createGame } from '$lib/modules/Game';
	import type { Game } from '@prisma/client';
	import type { Writable } from 'svelte/store';
	import PlayerNameInput from './PlayerNameInput.svelte';
	import TypingMachine from './TypingMachine.svelte';
	let form: HTMLFormElement;
	let roomID: string;
	let inviteLink: string;
	let playerName = $page.data.name3;
	let game: Game;
	let state: 'idle' | 'creating' | 'created' = 'idle';
	let opponentJoiningSubscriber: Subscriber<Game>;
	let opponentJoiningPayload: Writable<Game>;
	const createRoom = async () => {
		if (roomID) {
			await opponentJoiningSubscriber.unsubscribe();
			// await deleteGame(roomID);
		}
		if (form.reportValidity()) {
			state = 'creating';
			game = await createGame(playerName);
			state = 'created';
			inviteLink = game.inviteLink;
			roomID = game.roomID;
			opponentJoiningSubscriber = new Subscriber<Game>(`${roomID}##opponent_joining`, true);
			[opponentJoiningPayload] = opponentJoiningSubscriber.subscribe();
		}
	};
	let height = 300;
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
	<Card.Footer style="height: {height}px">
		<div class="flex w-full flex-col" bind:clientHeight={height}>
			<div>
				<TypingMachine
					class="font-bold text-center text-lg"
					text={state === 'idle' ? '' : roomID ? 'Room created' : 'Creating room'}
				/>
				<p>
					{#if inviteLink}
						<p>Send this link to your opponent</p>
						<TypingMachine speed={30} class="break-all" type="url" text={inviteLink} />
					{/if}
				</p>
			</div>
		</div>
	</Card.Footer>
</Card.Root>
