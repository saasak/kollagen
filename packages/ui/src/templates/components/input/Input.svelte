<script module lang="ts">
	export type InputSize = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props {
		value?: string | number;
		type?: string;
		id?: string;
		name?: string;
		placeholder?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		autocomplete?: HTMLInputAttributes['autocomplete'];
		ariaLabel?: string;
		invalid?: boolean;
		size?: InputSize;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		class?: string;
	}

	let {
		value = $bindable(''),
		type = 'text',
		id,
		name,
		placeholder,
		disabled = false,
		readonly = false,
		required = false,
		autocomplete,
		ariaLabel,
		invalid = false,
		size = 'md',
		oninput,
		onchange,
		class: className
	}: Props = $props();

	const sizes: Record<InputSize, string> = {
		sm: 'h-kl-field-sm px-2.5 text-sm',
		md: 'h-kl-field-md px-3 text-sm',
		lg: 'h-kl-field-lg px-4 text-base'
	};
</script>

<input
	bind:value
	{type}
	{id}
	{name}
	{placeholder}
	{disabled}
	{readonly}
	{required}
	{autocomplete}
	aria-label={ariaLabel}
	aria-invalid={invalid}
	{oninput}
	{onchange}
	class={cn(
		'rounded-kl-field bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content w-full border [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 outline-none [--kl-input-border:var(--kl-base-300)] focus:outline focus:outline-[var(--kl-input-border)] focus:[--kl-input-border:var(--kl-primary)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:[--kl-input-border:var(--kl-error)]',
		sizes[size],
		className
	)}
/>
