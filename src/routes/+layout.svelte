<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Github from '$lib/components/icons/Github.svelte';
	import Version from '$lib/components/Version.svelte';
	import { clientWidth, footerHeight } from '$lib/stores';
	console.log('clientWidth', $clientWidth);
	console.log('footerHeight', $footerHeight);
</script>

<svelte:window bind:innerWidth={$clientWidth} />

<ModeWatcher defaultMode="dark" track={false} />
<slot />

<footer class="absolute w-full px-10 bottom-5" bind:clientHeight={$footerHeight}>
	<div class="flex flex-col gap-5 md:flex-row justify-between w-full h-full">
		<div class="flex w-full md:w-auto justify-center">
			<Version />
		</div>
		<div class="flex gap-4 items-center w-full justify-center md:w-auto">
			By:
			<a
				href="https://github.com/carlos-err406"
				target="_blank"
				rel="noreferrer"
				class="hover:underline"
			>
				Carlos Daniel Vilaseca Illnait (Carlos-err406)
			</a>
			<div class="flex-none">
				<Github />
			</div>
		</div>
	</div>
</footer>
