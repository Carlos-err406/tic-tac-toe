<script lang="ts">
	import ScoreHeader from './ScoreHeader.svelte';

	import ScoreTotal from './ScoreTotal.svelte';
	import Circle from './Circle.svelte';
	import Cross from './Cross.svelte';
	import Score from './Score.svelte';
</script>

<div class="w-full grid grid-cols-3">
	<div class="col-start-2 min-w-64">
		<div class="transition-all duration-200 flex flex-col items-center min-w-64">
			<h4>Scores</h4>
			<div
				class="relative min-w-64 grid grid-cols-2 border-2 rounded-md gap-y-4 gap-x-6 px-5 overflow-y-auto"
				id="scores"
			>
				<ScoreHeader player="X" />
				<ScoreHeader player="O" />
				<Score player="X" />
				<Score player="O" />
				<ScoreTotal player="X" />
				<ScoreTotal player="O" />
			</div>
		</div>
	</div>
</div>

<style>
	#scores {
		max-height: calc(100dvh - 200px);
		max-height: calc(100vh - 200px);
	}
</style>
