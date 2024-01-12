<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import PlayerNameInput from './PlayerNameInput.svelte';

	let form: HTMLFormElement;
	let { name1, name2 } = $page.data;
	const localMatch = async () => {
		if (form.reportValidity()) {
			await goto('/game?x-name=' + name1 + '&o-name=' + name2);
		}
	};
	const createAIMatch = () => {};
</script>

<div class="px-2 flex flex-col h-full w-full gap-4 items-center border-r-[1px] border-r-slate-500">
	<h2 class="text-2xl font-bold mb-5">Local Match</h2>
	<form
		bind:this={form}
		class="flex flex-col gap-4 items-center"
		on:submit|preventDefault={localMatch}
	>
		<PlayerNameInput playerType="X" bind:value={name1} />
		<PlayerNameInput playerType="O" bind:value={name2} />
		<button type="submit" class="btn-text">Go!</button>
	</form>
	<hr class="bg-slate-500 w-full" />
	<button
		type="button"
		on:click={createAIMatch}
		disabled
		class="btn-text disabled:pointer-events-none disabled:opacity-50"
	>
		Play VS. AI (comming soon)
	</button>
</div>
