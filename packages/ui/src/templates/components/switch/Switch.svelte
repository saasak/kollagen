<script lang="ts">
	import { Switch } from 'bits-ui';

	interface Props {
		/** Display label */
		label?: string;
		/** Controlled checked state. Supports bind:checked */
		checked?: boolean;
		/** Form field name for native submission */
		name?: string;
		/** Form submission value when checked */
		value?: string;
		/** Disable the switch */
		disabled?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Callback when checked state changes */
		onCheckedChange?: (checked: boolean) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		checked = $bindable(false),
		name,
		value = 'on',
		disabled = false,
		required = false,
		onCheckedChange,
		class: className
	}: Props = $props();
</script>

<label
	class="inline-flex cursor-pointer items-center gap-2 select-none {disabled
		? 'cursor-not-allowed opacity-50'
		: ''} {className ?? ''}"
>
	<Switch.Root
		bind:checked
		{name}
		{value}
		{disabled}
		{required}
		{onCheckedChange}
		class="bg-kl-base-300 data-[state=checked]:bg-kl-primary data-[focus]:border-kl-primary data-[focus]:outline-kl-primary inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors duration-150 data-[focus]:outline-2 data-[focus]:outline-offset-2"
	>
		<Switch.Thumb
			class="bg-kl-base-100 shadow-kl-sm pointer-events-none block h-5 w-5 rounded-full transition-transform duration-150 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
		/>
	</Switch.Root>
	{#if label}
		<span class="text-kl-base-content text-sm {disabled ? 'text-kl-muted-content' : ''}"
			>{label}</span
		>
	{/if}
</label>
