<script lang="ts">
	import LocalMatchForm from '$lib/components/LocalMatchForm.svelte';
	import OnlineMatchForm from '$lib/components/OnlineMatchForm.svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	let mounted = false;
	onMount(() => (mounted = true));
</script>

<div class="w-full h-full flex flex-col justify-center items-center">
	{#if mounted}
		<div in:slide={{ axis: 'y', duration: 200 }} class="border-2 border-slate-500 rounded p-3">
			<h1 class="text-3xl font-bold mb-5 text-center">Tic Tac Toe</h1>
			<div class="grid w-full grid-cols-2">
				<LocalMatchForm />
				<OnlineMatchForm />
			</div>
		</div>
	{/if}
</div>
