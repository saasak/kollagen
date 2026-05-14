<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { checkboxVariants } from './Checkbox.variants';
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

	let classes = $derived(checkboxVariants({ disabled }));
</script>

<label class={cn(classes.root(), className)}>
	<Checkbox.Root
		bind:checked
		bind:indeterminate
		{name}
		{value}
		{disabled}
		{required}
		{readonly}
		{onCheckedChange}
		class={classes.control()}
	>
		{#snippet children({ checked: isChecked, indeterminate: isIndeterminate })}
			<span class="relative block size-3.5 shrink-0">
				<Minus
					size={14}
					strokeWidth={3}
					aria-hidden="true"
					class={checkboxVariants({ visible: isIndeterminate }).icon()}
				/>
				<Check
					size={14}
					strokeWidth={3}
					aria-hidden="true"
					class={checkboxVariants({ visible: isChecked && !isIndeterminate }).icon()}
				/>
			</span>
		{/snippet}
	</Checkbox.Root>
	{#if label}
		<span class={classes.label()}>{label}</span>
	{/if}
</label>
