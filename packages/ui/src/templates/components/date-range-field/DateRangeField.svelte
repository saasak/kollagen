<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangeField as DateRangeFieldPrimitive } from 'bits-ui';
	import type { DateRange, SegmentPart } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';

	interface Props {
		value?: DateRange;
		startName?: string;
		endName?: string;
		label?: string;
		placeholder?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		minValue?: DateValue;
		maxValue?: DateValue;
		locale?: string;
		onValueChange?: (value: DateRange | undefined) => void;
		class?: string;
	}

	let {
		value = $bindable({ start: undefined, end: undefined }),
		startName,
		endName,
		label,
		placeholder,
		disabled = false,
		readonly = false,
		required = false,
		minValue,
		maxValue,
		locale = 'en',
		onValueChange,
		class: className
	}: Props = $props();

	const inputClass =
		'rounded-kl-field bg-kl-base-100 flex h-kl-field-md items-center border px-3 transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]';
</script>

{#snippet inputSegments(segments: Array<{ part: SegmentPart; value: string }>)}
	{#each segments as { part, value: segmentValue }, i (part + i)}
		{#if part === 'literal'}
			<DateRangeFieldPrimitive.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
				{segmentValue}
			</DateRangeFieldPrimitive.Segment>
		{:else}
			<DateRangeFieldPrimitive.Segment
				{part}
				class="text-kl-base-content hover:bg-kl-base-200 focus:bg-kl-primary focus:text-kl-primary-content rounded-kl-selector px-0.5 text-sm outline-none"
			>
				{segmentValue}
			</DateRangeFieldPrimitive.Segment>
		{/if}
	{/each}
{/snippet}

<DateRangeFieldPrimitive.Root
	bind:value
	{placeholder}
	{disabled}
	{readonly}
	{required}
	{minValue}
	{maxValue}
	{locale}
	{onValueChange}
	class={cn('grid w-full gap-1.5', className)}
>
	{#if label}
		<DateRangeFieldPrimitive.Label class="text-kl-base-content text-sm font-medium">
			{label}
		</DateRangeFieldPrimitive.Label>
	{/if}
	<div class="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
		<DateRangeFieldPrimitive.Input
			name={startName}
			type="start"
			class={cn(inputClass, disabled && 'cursor-not-allowed opacity-50')}
		>
			{#snippet children({ segments })}
				{@render inputSegments(segments)}
			{/snippet}
		</DateRangeFieldPrimitive.Input>
		<span class="text-kl-muted-content hidden text-sm sm:block">to</span>
		<DateRangeFieldPrimitive.Input
			name={endName}
			type="end"
			class={cn(inputClass, disabled && 'cursor-not-allowed opacity-50')}
		>
			{#snippet children({ segments })}
				{@render inputSegments(segments)}
			{/snippet}
		</DateRangeFieldPrimitive.Input>
	</div>
</DateRangeFieldPrimitive.Root>
