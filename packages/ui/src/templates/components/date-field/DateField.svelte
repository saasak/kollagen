<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const inputClass =
		'rounded-kl-field bg-kl-base-100 flex h-kl-field-md items-center border px-3 transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]';
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
		<DateFieldPrimitive.Input
			{name}
			class={cn(inputClass, disabled && 'cursor-not-allowed opacity-50')}
		>
			{#snippet children({ segments })}
				{#each segments as { part, value: segmentValue }, i (part + i)}
					{#if part === 'literal'}
						<DateFieldPrimitive.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
							{segmentValue}
						</DateFieldPrimitive.Segment>
					{:else}
						<DateFieldPrimitive.Segment
							{part}
							class="text-kl-base-content hover:bg-kl-base-200 focus:bg-kl-primary focus:text-kl-primary-content rounded-kl-selector px-0.5 text-sm outline-none"
						>
							{segmentValue}
						</DateFieldPrimitive.Segment>
					{/if}
				{/each}
			{/snippet}
		</DateFieldPrimitive.Input>
	</DateFieldPrimitive.Root>
</div>
