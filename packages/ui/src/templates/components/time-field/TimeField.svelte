<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { timeFieldVariants } from './TimeField.variants';
	import { TimeField as TimeFieldPrimitive } from 'bits-ui';
	import type { EditableTimeSegmentPart, TimeOnInvalid, TimeValidator, TimeValue } from 'bits-ui';

	type TimeGranularity = 'hour' | 'minute' | 'second';

	interface Props {
		value?: TimeValue | undefined;
		name?: string;
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
		validate?: TimeValidator<TimeValue>;
		onInvalid?: TimeOnInvalid;
		errorMessageId?: string;
		onValueChange?: (value: TimeValue | undefined) => void;
		class?: string;
	}

	let {
		value = $bindable(),
		name,
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
		class: className
	}: Props = $props();

	let classes = $derived(timeFieldVariants({ disabled }));
</script>

<div class={cn('grid w-full gap-1.5', className)}>
	<TimeFieldPrimitive.Root
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
	>
		{#if label}
			<TimeFieldPrimitive.Label class="text-kl-base-content text-sm font-medium">
				{label}
			</TimeFieldPrimitive.Label>
		{/if}
		<TimeFieldPrimitive.Input {name} class={classes.input()}>
			{#snippet children({ segments })}
				{#each segments as { part, value: segmentValue }, i (part + i)}
					{#if part === 'literal'}
						<TimeFieldPrimitive.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
							{segmentValue}
						</TimeFieldPrimitive.Segment>
					{:else}
						<TimeFieldPrimitive.Segment {part} class={classes.segment()}>
							{segmentValue}
						</TimeFieldPrimitive.Segment>
					{/if}
				{/each}
			{/snippet}
		</TimeFieldPrimitive.Input>
	</TimeFieldPrimitive.Root>
</div>
