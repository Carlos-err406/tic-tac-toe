<script lang="ts">
	import { page } from '$app/stores';
	import { randString } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import PlayerNameInput from './PlayerNameInput.svelte';
	import TypingMachine from './TypingMachine.svelte';
	let form: HTMLFormElement;
	let roomID: string;
	let inviteLink: string;
	let playerName = $page.data.name3;
	let state: 'idle' | 'creating' | 'created' = 'idle';
	const createRoom = () => {
		if (roomID) {
			//TODO delete room
			state = 'idle';
			roomID = '';
			inviteLink = '';
		}
		if (form.reportValidity()) {
			state = 'creating';
			//TODO actually create room
			setTimeout(() => {
				state = 'created';
				roomID = randString(6);
				inviteLink = window.origin + `/join-match/${roomID}?x-name=${playerName}`;
			}, 2000);
		}
	};
</script>

<div class="px-2 flex flex-col h-full w-full gap-4 items-center">
	<h2 class="text-2xl font-bold mb-5">Online Match</h2>
	<form
		bind:this={form}
		on:submit|preventDefault={createRoom}
		class="flex flex-col gap-4 items-center"
	>
		<PlayerNameInput playerType="X" bind:value={playerName} />
		<button class="btn-text" on:click={createRoom}>Create Room</button>
		{#if state !== 'idle'}
			<div class="" in:slide={{ axis: 'y', duration: 250 }}>
				<div class="text-lg font-bold text-center">
					<TypingMachine text={roomID ? 'Room created' : 'Creating room'} />
				</div>
				<div class="flex flex-col h-10 my-4">
					{#if inviteLink}
						Send this link to your oponent
						<TypingMachine type="url" text={inviteLink} />
					{/if}
				</div>
			</div>
		{/if}
	</form>
</div>
