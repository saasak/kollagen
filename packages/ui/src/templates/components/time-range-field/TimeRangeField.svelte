<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { timeRangeFieldVariants } from './TimeRangeField.variants';
	import { TimeRangeField as TimeRangeFieldPrimitive } from 'bits-ui';
	import type {
		EditableTimeSegmentPart,
		TimeOnInvalid,
		TimeRange,
		TimeRangeValidator,
		TimeSegmentPart,
		TimeValue
	} from 'bits-ui';

	type TimeGranularity = 'hour' | 'minute' | 'second';

	interface Props {
		value?: TimeRange;
		startName?: string;
		endName?: string;
		label?: string;
		placeholder?: TimeValue;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		minValue?: TimeValue;
		maxValue?: TimeValue;
		locale?: string;
		hourCycle?: 12 | 24;
		granularity?: TimeGranularity;
		hideTimeZone?: boolean;
		readonlySegments?: EditableTimeSegmentPart[];
		validate?: TimeRangeValidator<TimeValue>;
		onInvalid?: TimeOnInvalid;
		errorMessageId?: string;
		onValueChange?: (value: TimeRange | undefined) => void;
		onStartValueChange?: (value: TimeValue | undefined) => void;
		onEndValueChange?: (value: TimeValue | undefined) => void;
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
		hourCycle,
		granularity = 'minute',
		hideTimeZone = false,
		readonlySegments = [],
		validate,
		onInvalid,
		errorMessageId,
		onValueChange,
		onStartValueChange,
		onEndValueChange,
		class: className
	}: Props = $props();

	let classes = $derived(timeRangeFieldVariants({ disabled }));
</script>

{#snippet inputSegments(segments: Array<{ part: TimeSegmentPart; value: string }>)}
	{#each segments as { part, value: segmentValue }, i (part + i)}
		{#if part === 'literal'}
			<TimeRangeFieldPrimitive.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
				{segmentValue}
			</TimeRangeFieldPrimitive.Segment>
		{:else}
			<TimeRangeFieldPrimitive.Segment {part} class={classes.segment()}>
				{segmentValue}
			</TimeRangeFieldPrimitive.Segment>
		{/if}
	{/each}
{/snippet}

<TimeRangeFieldPrimitive.Root
	bind:value
	{placeholder}
	{disabled}
	{readonly}
	{required}
	{minValue}
	{maxValue}
	{locale}
	{hourCycle}
	{granularity}
	{hideTimeZone}
	{readonlySegments}
	{validate}
	{onInvalid}
	{errorMessageId}
	{onValueChange}
	{onStartValueChange}
	{onEndValueChange}
	class={cn('grid w-full gap-1.5', className)}
>
	{#if label}
		<TimeRangeFieldPrimitive.Label class="text-kl-base-content text-sm font-medium">
			{label}
		</TimeRangeFieldPrimitive.Label>
	{/if}
	<div class="grid gap-2 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
		<TimeRangeFieldPrimitive.Input name={startName} type="start" class={classes.input()}>
			{#snippet children({ segments })}
				{@render inputSegments(segments)}
			{/snippet}
		</TimeRangeFieldPrimitive.Input>
		<span class="text-kl-muted-content hidden text-sm sm:block">to</span>
		<TimeRangeFieldPrimitive.Input name={endName} type="end" class={classes.input()}>
			{#snippet children({ segments })}
				{@render inputSegments(segments)}
			{/snippet}
		</TimeRangeFieldPrimitive.Input>
	</div>
</TimeRangeFieldPrimitive.Root>
