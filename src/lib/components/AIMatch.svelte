<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PlayerNameInput from './PlayerNameInput.svelte';
	import * as Card from '$lib/components/ui/card';

	let form: HTMLFormElement;
	let { name1 } = $page.data;
	const localMatch = async () => {
		if (form.reportValidity()) {
			await goto('/ai?x-name=' + name1);
		}
	};
</script>

<Card.Root class="w-[304px] min-h-[400px] opacity-50">
	<Card.Header>
		<Card.Title>AI Match</Card.Title>
		<Card.Description>Play in this device against AI</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			bind:this={form}
			class="flex flex-col gap-4 items-center"
			on:submit|preventDefault={localMatch}
		>
			<PlayerNameInput playerType="X" bind:value={name1} />
			<button type="submit" class="btn-text">Go!</button>
		</form>
	</Card.Content>
	<Card.Footer>COMMING SOON</Card.Footer>
</Card.Root>
