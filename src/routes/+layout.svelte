<script lang="ts">
	import Github from '$lib/components/icons/Github.svelte';
	import { clientWidth, footerHeight } from '$lib/stores';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<ModeWatcher defaultMode="dark" track={false} />
<div class="relative flex-col justify-between h-full w-full">
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
