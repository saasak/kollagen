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
		class="bg-kl-base-300 data-[state=checked]:bg-kl-primary inline-flex h-[1.5rem] w-[2.75rem] shrink-0 items-center rounded-full p-[2px] transition-colors duration-150 outline-none"
	>
		<Switch.Thumb
			class="bg-kl-base-100 shadow-kl-sm pointer-events-none block size-[1.25rem] rounded-full transition-transform duration-150 data-[state=checked]:translate-x-[1.25rem] data-[state=unchecked]:translate-x-0"
		/>
	</Switch.Root>
	{#if label}
		<span class="text-kl-base-content text-sm {disabled ? 'text-kl-muted-content' : ''}"
			>{label}</span
		>
	{/if}
</label>
