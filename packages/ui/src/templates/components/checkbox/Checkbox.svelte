<script lang="ts">
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
</script>

<label
	class="inline-flex cursor-pointer items-center gap-2 select-none {disabled
		? 'cursor-not-allowed opacity-50'
		: ''} {className ?? ''}"
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
		class="rounded-kl-selector border-kl-base-300 bg-kl-base-100 data-[state=checked]:border-kl-primary data-[state=checked]:bg-kl-primary data-[state=indeterminate]:border-kl-primary data-[state=indeterminate]:bg-kl-primary data-[focus]:border-kl-primary data-[focus]:outline-kl-primary flex h-5 w-5 items-center justify-center border transition-colors duration-150 data-[focus]:outline-2 data-[focus]:-outline-offset-1"
	>
		{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
			{#if isIndeterminate}
				<Minus size={14} strokeWidth={3} class="text-kl-primary-content" />
			{:else if isChecked}
				<Check size={14} strokeWidth={3} class="text-kl-primary-content" />
			{/if}
		{/snippet}
	</Checkbox.Root>
	{#if label}
		<span class="text-kl-base-content text-sm {disabled ? 'text-kl-muted-content' : ''}"
			>{label}</span
		>
	{/if}
</label>
