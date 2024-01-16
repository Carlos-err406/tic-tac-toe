<script lang="ts">
	import Github from '$lib/components/icons/Github.svelte';
	import { clientWidth } from '$lib/stores';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<svelte:window bind:innerWidth={$clientWidth} />
<Toaster />
<ModeWatcher defaultMode="dark" track={false} />
<div class="relative flex h-full w-full">
	<slot />
	<a
		href="https://github.com/carlos-err406"
		target="_blank"
		rel="noreferrer"
		class="flex-none fixed top-5 right-5"
	>
		<Github />
	</a>
</div>
