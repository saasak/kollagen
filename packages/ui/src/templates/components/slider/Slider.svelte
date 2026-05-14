<script module lang="ts">
	export type SliderColor =
		| 'neutral'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
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
	const colorClasses: Record<SliderColor, string> = {
		neutral: '[--kl-slider-fill:var(--kl-neutral)]',
		primary: '[--kl-slider-fill:var(--kl-primary)]',
		secondary: '[--kl-slider-fill:var(--kl-secondary)]',
		accent: '[--kl-slider-fill:var(--kl-accent)]',
		info: '[--kl-slider-fill:var(--kl-info)]',
		success: '[--kl-slider-fill:var(--kl-success)]',
		warning: '[--kl-slider-fill:var(--kl-warning)]',
		error: '[--kl-slider-fill:var(--kl-error)]'
	};
	const radiusClass =
		'[--kl-slider-radius:min(9999px,calc(var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)))]';
	const trackClass =
		'relative overflow-hidden rounded-[var(--kl-slider-radius)] bg-kl-base-300 [box-shadow:inset_0_1px_2px_color-mix(in_oklab,#000_calc(var(--kl-depth)*14%),#0000),0_1px_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))]';
	const rangeClass =
		'absolute bg-[var(--kl-slider-fill)] [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [border-color:color-mix(in_oklab,var(--kl-slider-fill),#000_calc(var(--kl-depth)*5%))] [box-shadow:0_1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset]';
	const thumbClass =
		'box-border size-kl-selector-md rounded-[var(--kl-slider-radius)] border-[calc(var(--kl-size-selector)*1.25)] bg-kl-base-100 transition-[border-color,box-shadow,transform] outline-none [border-color:color-mix(in_oklab,var(--kl-slider-fill),#000_calc(var(--kl-depth)*5%))] [box-shadow:0_1px_2px_0_color-mix(in_oklab,#000_calc(var(--kl-depth)*20%),#0000),0_0_0_1px_oklch(100%_0_0/calc(var(--kl-depth)*35%))_inset] hover:[box-shadow:0_4px_8px_-4px_color-mix(in_oklab,#000_calc(var(--kl-depth)*32%),#0000),0_0_0_1px_oklch(100%_0_0/calc(var(--kl-depth)*35%))_inset] active:scale-95 focus-visible:outline focus-visible:outline-[var(--kl-slider-fill)]';
	const markerTickClass = 'rounded-[var(--kl-slider-radius)] bg-kl-base-300';
	const activeMarkerTickClass = 'bg-[var(--kl-slider-fill)]';

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

<div
	class={cn(`flex ${isVertical ? 'flex-col items-center' : 'w-full flex-col'} gap-2`, className)}
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
				class={cn(
					'w-kl-selector-md relative flex h-full items-center justify-center',
					radiusClass,
					colorClasses[color],
					invalid && '[--kl-slider-fill:var(--kl-error)]',
					disabled && '[--kl-slider-fill:var(--kl-muted-content)]'
				)}
			>
				{#snippet children({ thumbItems })}
					<span class="{trackClass} h-full w-kl-selector-md{disabled ? ' opacity-50' : ''}">
						<Slider.Range class="{rangeClass} w-full" />
					</span>

					{#each thumbItems as { index } (index)}
						<Slider.Thumb
							{index}
							class="{thumbClass}{disabled ? ' cursor-not-allowed opacity-80' : ''}"
						/>
					{/each}
				{/snippet}
			</Slider.Root>

			{#if markers?.length}
				<div
					class={cn(
						'relative h-full w-12',
						colorClasses[color],
						invalid && '[--kl-slider-fill:var(--kl-error)]'
					)}
				>
					{#each markers as markerValue (markerValue)}
						<span
							class="absolute left-0 flex items-center gap-2 text-xs"
							style={getVerticalMarkerStyle(markerValue)}
						>
							<span
								class="{markerTickClass} h-px w-2 {isMarkerActive(markerValue)
									? activeMarkerTickClass
									: ''}"
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
			class={cn(
				'relative flex w-full items-center py-1',
				radiusClass,
				colorClasses[color],
				invalid && '[--kl-slider-fill:var(--kl-error)]',
				disabled && '[--kl-slider-fill:var(--kl-muted-content)]'
			)}
		>
			{#snippet children({ thumbItems })}
				<span class="{trackClass} h-kl-selector-md w-full{disabled ? ' opacity-50' : ''}">
					<Slider.Range class="{rangeClass} h-full" />
				</span>

				{#each thumbItems as { index } (index)}
					<Slider.Thumb
						{index}
						class="{thumbClass}{disabled ? ' cursor-not-allowed opacity-80' : ''}"
					/>
				{/each}
			{/snippet}
		</Slider.Root>

		{#if markers?.length}
			<div
				class={cn(
					'relative h-6 w-full',
					colorClasses[color],
					invalid && '[--kl-slider-fill:var(--kl-error)]'
				)}
			>
				{#each markers as markerValue (markerValue)}
					<span
						class="absolute top-0 flex min-w-max flex-col items-center gap-1 text-xs"
						style={getHorizontalMarkerStyle(markerValue)}
					>
						<span
							class="{markerTickClass} h-1.5 w-px {isMarkerActive(markerValue)
								? activeMarkerTickClass
								: ''}"
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
