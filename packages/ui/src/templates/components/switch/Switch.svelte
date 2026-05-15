<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { switchVariants } from './Switch.variants';
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
		/** Native title tooltip */
		title?: string;
		/** Native button type for form submission */
		type?: 'button' | 'submit' | 'reset';
		[key: `aria-${string}`]: unknown;
	}

	let {
		label,
		checked = $bindable(false),
		name,
		value = 'on',
		disabled = false,
		required = false,
		onCheckedChange,
		class: className,
		...restProps
	}: Props = $props();

	let classes = $derived(switchVariants({ disabled }));
</script>

<label class={cn(classes.root(), className)}>
	<Switch.Root
		{...restProps}
		bind:checked
		{name}
		{value}
		{disabled}
		{required}
		{onCheckedChange}
		class={classes.control()}
	>
		<Switch.Thumb class={classes.thumb()} />
	</Switch.Root>
	{#if label}
		<span class={classes.label()}>{label}</span>
	{/if}
</label>
