<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import Github from '$lib/components/icons/Github.svelte';
	import Version from '$lib/components/Version.svelte';
</script>

<ModeWatcher defaultMode="dark" track={false} />
<slot />

<div class="fixed bottom-5 right-5 flex gap-4 items-center text-base">
	By:
	<a
		href="https://github.com/carlos-err406"
		target="_blank"
		rel="noreferrer"
		class="hover:underline"
	>
		Carlos Daniel Vilaseca Illnait (Carlos-err406)
	</a>
	<Github />
</div>

<div class="fixed bottom-5 left-5">
	<Version />
</div>
