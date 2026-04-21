<script lang="ts">
	import { encode } from 'uqr';
	import type { Snippet } from 'svelte';

	interface Props {
		value?: string;
		defaultValue?: string;
		pixelSize?: number;
		encoding?: {
			ecc?: 'L' | 'M' | 'Q' | 'H';
			maskPattern?: number;
			boostEcc?: boolean;
			minVersion?: number;
			maxVersion?: number;
			border?: number;
		};
		overlay?: Snippet;
		class?: string;
	}

	let {
		value = $bindable(),
		defaultValue,
		pixelSize = 200,
		encoding,
		overlay,
		class: className
	}: Props = $props();

	// Initialize value from defaultValue if not provided
	if (value === undefined && defaultValue !== undefined) {
		value = defaultValue;
	}

	const qr = $derived(value ? encode(value, encoding) : null);
	const moduleCount = $derived(qr ? qr.size : 0);
	const cellSize = $derived(moduleCount > 0 ? pixelSize / moduleCount : 0);
</script>

<div
	class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm relative inline-flex items-center justify-center border p-3 {className ??
		''}"
>
	{#if qr}
		<svg
			width={pixelSize}
			height={pixelSize}
			viewBox={`0 0 ${pixelSize} ${pixelSize}`}
			xmlns="http://www.w3.org/2000/svg"
			class="text-kl-base-content"
			role="img"
			aria-label="QR Code"
		>
			{#each qr.data as row, y}
				{#each row as cell, x}
					{#if cell}
						<rect
							x={x * cellSize}
							y={y * cellSize}
							width={cellSize}
							height={cellSize}
							fill="currentColor"
						/>
					{/if}
				{/each}
			{/each}
		</svg>
		{#if overlay}
			<div
				class="rounded-kl-selector bg-kl-base-100 absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center p-1"
			>
				{@render overlay()}
			</div>
		{/if}
	{/if}
</div>
