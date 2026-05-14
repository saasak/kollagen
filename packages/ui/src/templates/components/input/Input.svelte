<script module lang="ts">
	export type InputSize = import('./Input.variants').InputSize;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { inputVariants } from './Input.variants';
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

	let inputClass = $derived(inputVariants({ size }));
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
	class={cn(inputClass, className)}
/>
