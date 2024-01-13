<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PlayerNameInput from './PlayerNameInput.svelte';
	import * as Card from '$lib/components/ui/card';

	let form: HTMLFormElement;
	let { name1, name2 } = $page.data;
	const localMatch = async () => {
		if (form.reportValidity()) {
			await goto('/game?x-name=' + name1 + '&o-name=' + name2);
		}
	};
</script>

<Card.Root class="w-[304px] min-h-[400px]">
	<Card.Header>
		<Card.Title>Local Match</Card.Title>
		<Card.Description>Play in this device</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			bind:this={form}
			class="flex flex-col gap-4 items-center"
			on:submit|preventDefault={localMatch}
		>
			<PlayerNameInput playerType="X" bind:value={name1} />
			<PlayerNameInput playerType="O" bind:value={name2} />
			<button type="submit" class="btn-text">Go!</button>
		</form>
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
