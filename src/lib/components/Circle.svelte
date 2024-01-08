<script>
	export let size = 160;
	export let duration = 0.5;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	fill="none"
	stroke="#3b82f6"
	stroke-width={size / 10}
	stroke-linecap="round"
	stroke-linejoin="round"
	rotate="45"
>
	<circle
		cx={size / 2}
		cy={size / 2}
		r={size / 2 - size / 16}
		stroke-dasharray="500"
		stroke-dashoffset="500"
		calcMode="spline"
		keyTimes="0; 0.7; 1"
		keySplines="0.4 0 0.2 1; 0.4 0 1 1"
	>
		<animate attributeName="stroke-dashoffset" from="500" to="0" dur="{duration}s" fill="freeze" />
	</circle>
</svg>
