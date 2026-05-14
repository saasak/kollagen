<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Checkbox } from 'bits-ui';
	import { Check, Minus } from 'lucide-svelte';

	interface Props {
		/** Display label */
		label?: string;
		/** Controlled checked state. Supports bind:checked */
		checked?: boolean;
		/** Controlled indeterminate state. Supports bind:indeterminate */
		indeterminate?: boolean;
		/** Form field name for native submission */
		name?: string;
		/** Form submission value when checked */
		value?: string;
		/** Disable the checkbox */
		disabled?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readonly?: boolean;
		/** Callback when checked state changes */
		onCheckedChange?: (checked: boolean) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		checked = $bindable(false),
		indeterminate = $bindable(false),
		name,
		value = 'on',
		disabled = false,
		required = false,
		readonly = false,
		onCheckedChange,
		class: className
	}: Props = $props();

	const controlClass =
		'rounded-kl-selector bg-kl-base-100 data-[state=checked]:bg-kl-primary data-[state=indeterminate]:bg-kl-primary data-[state=checked]:[--kl-check-border:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))] data-[state=indeterminate]:[--kl-check-border:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))] data-[focus]:[--kl-check-border:var(--kl-primary)] data-[focus]:outline-kl-primary flex size-kl-selector-md shrink-0 items-center justify-center border p-0 text-[0] leading-none transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-check-border:var(--kl-base-300)] [border-color:var(--kl-check-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-check-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] data-[focus]:outline [&_svg]:block';
</script>

<label
	class={cn(
		`relative inline-flex cursor-pointer items-center gap-2 select-none ${
			disabled ? 'cursor-not-allowed opacity-50' : ''
		}`,
		className
	)}
>
	<Checkbox.Root
		bind:checked
		bind:indeterminate
		{name}
		{value}
		{disabled}
		{required}
		{readonly}
		{onCheckedChange}
		class={controlClass}
	>
		{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
			<span class="relative block size-3.5 shrink-0">
				<Minus
					size={14}
					strokeWidth={3}
					aria-hidden="true"
					class={cn(
						'text-kl-primary-content absolute inset-0 transition-opacity duration-100',
						isIndeterminate ? 'opacity-100' : 'opacity-0'
					)}
				/>
				<Check
					size={14}
					strokeWidth={3}
					aria-hidden="true"
					class={cn(
						'text-kl-primary-content absolute inset-0 transition-opacity duration-100',
						isChecked && !isIndeterminate ? 'opacity-100' : 'opacity-0'
					)}
				/>
			</span>
		{/snippet}
	</Checkbox.Root>
	{#if label}
		<span class="text-kl-base-content text-sm {disabled ? 'text-kl-muted-content' : ''}"
			>{label}</span
		>
	{/if}
</label>
