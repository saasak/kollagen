<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { dateRangeFieldVariants } from './DateRangeField.variants';
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

	let classes = $derived(dateRangeFieldVariants({ disabled }));
</script>

{#snippet inputSegments(segments: Array<{ part: SegmentPart; value: string }>)}
	{#each segments as { part, value: segmentValue }, i (part + i)}
		{#if part === 'literal'}
			<DateRangeFieldPrimitive.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
				{segmentValue}
			</DateRangeFieldPrimitive.Segment>
		{:else}
			<DateRangeFieldPrimitive.Segment {part} class={classes.segment()}>
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
		<DateRangeFieldPrimitive.Input name={startName} type="start" class={classes.input()}>
			{#snippet children({ segments })}
				{@render inputSegments(segments)}
			{/snippet}
		</DateRangeFieldPrimitive.Input>
		<span class="text-kl-muted-content hidden text-sm sm:block">to</span>
		<DateRangeFieldPrimitive.Input name={endName} type="end" class={classes.input()}>
			{#snippet children({ segments })}
				{@render inputSegments(segments)}
			{/snippet}
		</DateRangeFieldPrimitive.Input>
	</div>
</DateRangeFieldPrimitive.Root>
