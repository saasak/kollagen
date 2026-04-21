<script lang="ts">
	import { Slider } from 'bits-ui';

	interface Props {
		/** Label text displayed above the slider */
		label?: string;
		/** Form field name for native submission */
		name?: string;
		/** Controlled value (array for range mode). Supports bind:value */
		value?: number[];
		/** Minimum value @default 0 */
		min?: number;
		/** Maximum value @default 100 */
		max?: number;
		/** Step increment @default 1 */
		step?: number;
		/** Slider orientation @default "horizontal" */
		orientation?: 'horizontal' | 'vertical';
		/** Whether the slider is disabled */
		disabled?: boolean;
		/** Whether the slider is invalid */
		invalid?: boolean;
		/** Show the current value as text */
		showValue?: boolean;
		/** Show step markers at given values */
		markers?: number[];
		/** Callback when value changes (during drag) */
		onValueChange?: (value: number[]) => void;
		/** Callback when dragging ends */
		onValueCommit?: (value: number[]) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		name,
		value = $bindable([50]),
		min = 0,
		max = 100,
		step = 1,
		orientation = 'horizontal',
		disabled = false,
		invalid = false,
		showValue = false,
		markers,
		onValueChange,
		onValueCommit,
		class: className
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');
	const isMultiple = $derived(value.length > 1);
</script>

<div
	class="flex {isVertical ? 'h-48 flex-col items-center' : 'w-full flex-col'} gap-2 {className ??
		''}"
>
	{#if label || showValue}
		<div class="flex items-center justify-between text-sm">
			{#if label}
				<span class="text-kl-base-content font-medium{disabled ? ' text-kl-muted-content' : ''}">
					{label}
				</span>
			{/if}
			{#if showValue}
				<span class="text-kl-muted-content tabular-nums">
					{value.join(' – ')}
				</span>
			{/if}
		</div>
	{/if}

	<Slider.Root
		type={isMultiple ? 'multiple' : 'single'}
		bind:value
		{min}
		{max}
		{step}
		{orientation}
		{disabled}
		{onValueChange}
		{onValueCommit}
		class="relative flex {isVertical ? 'h-full flex-col' : 'w-full'} items-center"
	>
		{#snippet children({ thumbItems, _tickItems })}
			<span
				class="relative {isVertical
					? 'h-full w-2'
					: 'h-2 w-full'} bg-kl-base-300 rounded-full{disabled ? ' opacity-50' : ''}"
			>
				<Slider.Range
					class="absolute {isVertical ? 'w-full' : 'h-full'} bg-kl-primary rounded-full{invalid
						? ' bg-kl-error'
						: ''}"
				/>
			</span>

			{#each thumbItems as { index } (index)}
				<Slider.Thumb
					{index}
					class="border-kl-primary bg-kl-base-100 shadow-kl-sm hover:shadow-kl-md focus-visible:ring-kl-primary/40 size-5 rounded-full border-2 transition-shadow outline-none focus-visible:ring-2{disabled
						? ' border-kl-muted cursor-not-allowed'
						: ''}{invalid ? ' border-kl-error' : ''}"
				/>
			{/each}

			{#if markers?.length}
				<div class="relative {isVertical ? 'h-full' : 'w-full'} mt-2">
					{#each markers as markerValue (markerValue)}
						{@const pct = ((markerValue - min) / (max - min)) * 100}
						<span
							class="absolute text-xs {isVertical ? 'left-4' : 'top-0'}"
							style="{isVertical ? 'bottom' : 'left'}: {pct}%; transform: {isVertical
								? 'translateY(50%)'
								: 'translateX(-50%)'}"
						>
							<span
								class="block size-1 rounded-full {markerValue <= (value[0] ?? 0)
									? 'bg-kl-primary'
									: 'bg-kl-base-300'} mx-auto mb-0.5"
							></span>
							<span class="text-kl-muted-content">{markerValue}</span>
						</span>
					{/each}
				</div>
			{/if}
		{/snippet}
	</Slider.Root>

	{#if name}
		{#each value as v, i (i)}
			<input type="hidden" name={value.length > 1 ? `${name}[${i}]` : name} value={v} />
		{/each}
	{/if}
</div>
