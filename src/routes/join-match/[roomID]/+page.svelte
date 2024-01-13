<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PlayerNameInput from '$lib/components/PlayerNameInput.svelte';
	import { joinMatch } from '$lib/modules/Game';
	import type { PageData } from './$types';
	export let data: PageData;
	const { roomID } = $page.params;
	let form: HTMLFormElement;
	let { name, game } = data;
	const handleJoinMatch = async () => {
		if (form.reportValidity()) {
			await joinMatch(game.roomID, name);
			await goto(`/game/${roomID}`);
		}
	};
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	<h1 class="text-3xl font-bold mb-5 text-center">Join Match</h1>
	<p class="text-center mb-5">Room ID: {roomID}</p>
	<form bind:this={form} action="" on:submit|preventDefault={handleJoinMatch}>
		<PlayerNameInput playerType="O" bind:value={name} />
		<button class="btn-text" type="submit">Join</button>
	</form>
</div>
