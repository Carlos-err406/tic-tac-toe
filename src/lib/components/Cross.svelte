<script lang="ts">
	export let size = 160;
	export let duration = 1;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	width={size}
	height={size}
	viewBox="0 0 {size} {size}"
	fill="none"
	stroke="#ef4444"
	stroke-width={size / 10}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<line x1={size - 6} y1="6" x2="6" y2={size - 6} stroke-dasharray="1000" stroke-dashoffset="1000">
		<animate
			attributeName="stroke-dashoffset"
			from="1000"
			to="0"
			dur="{duration}s"
			fill="freeze"
			calcMode="spline"
			keyTimes="0; 0.8; 1"
			keySplines="0.4 0 0.2 1; 0.4 0 1 1"
		/>
	</line>
	<line x1="6" y1="6" x2={size - 6} y2={size - 6} stroke-dasharray="1000" stroke-dashoffset="1000">
		<animate
			attributeName="stroke-dashoffset"
			from="1000"
			to="0"
			dur="{duration}s"
			fill="freeze"
			begin="0.3s"
			calcMode="spline"
			keyTimes="0; 0.8; 1"
			keySplines="0.4 0 0.2 1; 0.4 0 1 1"
		/>
	</line>
</svg>
