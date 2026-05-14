<script module lang="ts">
	export type SliderColor = import('./Slider.variants').SliderColor;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { sliderVariants } from './Slider.variants';
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
		/** Semantic fill color */
		color?: SliderColor;
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
		color = 'neutral',
		disabled = false,
		invalid = false,
		showValue = false,
		markers,
		onValueChange,
		onValueCommit,
		class: className
	}: Props = $props();

	const isVertical = $derived(orientation === 'vertical');
	let classes = $derived(sliderVariants({ color, orientation, invalid, disabled }));

	function getMarkerPercent(markerValue: number): number {
		if (max === min) return 0;
		const percent = ((markerValue - min) / (max - min)) * 100;
		return Math.min(100, Math.max(0, percent));
	}

	function getHorizontalMarkerStyle(markerValue: number): string {
		const percent = getMarkerPercent(markerValue);
		const translateX = percent <= 0 ? '0' : percent >= 100 ? '-100%' : '-50%';
		return `left:${percent}%;transform:translateX(${translateX});`;
	}

	function getVerticalMarkerStyle(markerValue: number): string {
		return `bottom:${getMarkerPercent(markerValue)}%;transform:translateY(50%);`;
	}

	function isMarkerActive(markerValue: number): boolean {
		if (value.length > 1) {
			const [start, end] = [...value].sort((a, b) => a - b);
			return markerValue >= start && markerValue <= end;
		}
		return markerValue <= (value[0] ?? min);
	}
</script>

<div class={cn(classes.outer(), className)}>
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

	{#if isVertical}
		<div class="flex h-48 items-stretch justify-center gap-3">
			<Slider.Root
				type="multiple"
				bind:value
				{min}
				{max}
				{step}
				{orientation}
				{disabled}
				{onValueChange}
				{onValueCommit}
				class={classes.root()}
			>
				{#snippet children({ thumbItems })}
					<span class={cn(classes.track(), 'w-kl-selector-md h-full')}>
						<Slider.Range class={cn(classes.range(), 'w-full')} />
					</span>

					{#each thumbItems as { index } (index)}
						<Slider.Thumb {index} class={classes.thumb()} />
					{/each}
				{/snippet}
			</Slider.Root>

			{#if markers?.length}
				<div class={cn(classes.markerContainer(), 'relative h-full w-12')}>
					{#each markers as markerValue (markerValue)}
						<span
							class="absolute left-0 flex items-center gap-2 text-xs"
							style={getVerticalMarkerStyle(markerValue)}
						>
							<span
								class={cn(
									classes.markerTick(),
									'h-px w-2',
									isMarkerActive(markerValue) && classes.activeMarkerTick()
								)}
							></span>
							<span class="text-kl-muted-content">{markerValue}</span>
						</span>
					{/each}
				</div>
			{/if}
		</div>
	{:else}
		<Slider.Root
			type="multiple"
			bind:value
			{min}
			{max}
			{step}
			{orientation}
			{disabled}
			{onValueChange}
			{onValueCommit}
			class={classes.root()}
		>
			{#snippet children({ thumbItems })}
				<span class={cn(classes.track(), 'h-kl-selector-md w-full')}>
					<Slider.Range class={cn(classes.range(), 'h-full')} />
				</span>

				{#each thumbItems as { index } (index)}
					<Slider.Thumb {index} class={classes.thumb()} />
				{/each}
			{/snippet}
		</Slider.Root>

		{#if markers?.length}
			<div class={cn(classes.markerContainer(), 'relative h-6 w-full')}>
				{#each markers as markerValue (markerValue)}
					<span
						class="absolute top-0 flex min-w-max flex-col items-center gap-1 text-xs"
						style={getHorizontalMarkerStyle(markerValue)}
					>
						<span
							class={cn(
								classes.markerTick(),
								'h-1.5 w-px',
								isMarkerActive(markerValue) && classes.activeMarkerTick()
							)}
						></span>
						<span class="text-kl-muted-content">{markerValue}</span>
					</span>
				{/each}
			</div>
		{/if}
	{/if}

	{#if name}
		{#each value as v, i (i)}
			<input type="hidden" name={value.length > 1 ? `${name}[${i}]` : name} value={v} />
		{/each}
	{/if}
</div>
