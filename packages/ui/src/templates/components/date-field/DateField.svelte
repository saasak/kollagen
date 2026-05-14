<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { dateFieldVariants } from './DateField.variants';
	import { DateField as DateFieldPrimitive } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';

	interface Props {
		value?: DateValue | undefined;
		name?: string;
		label?: string;
		placeholder?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		minValue?: DateValue;
		maxValue?: DateValue;
		locale?: string;
		onValueChange?: (value: DateValue | undefined) => void;
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
		onValueChange,
		class: className
	}: Props = $props();

	let classes = $derived(dateFieldVariants({ disabled }));
</script>

<div class={cn('grid w-full gap-1.5', className)}>
	<DateFieldPrimitive.Root
		bind:value
		{placeholder}
		{disabled}
		{readonly}
		{required}
		{minValue}
		{maxValue}
		{locale}
		{onValueChange}
	>
		{#if label}
			<DateFieldPrimitive.Label class="text-kl-base-content text-sm font-medium">
				{label}
			</DateFieldPrimitive.Label>
		{/if}
		<DateFieldPrimitive.Input {name} class={classes.input()}>
			{#snippet children({ segments })}
				{#each segments as { part, value: segmentValue }, i (part + i)}
					{#if part === 'literal'}
						<DateFieldPrimitive.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
							{segmentValue}
						</DateFieldPrimitive.Segment>
					{:else}
						<DateFieldPrimitive.Segment {part} class={classes.segment()}>
							{segmentValue}
						</DateFieldPrimitive.Segment>
					{/if}
				{/each}
			{/snippet}
		</DateFieldPrimitive.Input>
	</DateFieldPrimitive.Root>
</div>
