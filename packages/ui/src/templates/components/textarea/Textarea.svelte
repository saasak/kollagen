<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		value?: string;
		id?: string;
		name?: string;
		placeholder?: string;
		rows?: number;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		ariaLabel?: string;
		invalid?: boolean;
		oninput?: (event: Event) => void;
		onchange?: (event: Event) => void;
		class?: string;
	}

	let {
		value = $bindable(''),
		id,
		name,
		placeholder,
		rows = 4,
		disabled = false,
		readonly = false,
		required = false,
		ariaLabel,
		invalid = false,
		oninput,
		onchange,
		class: className
	}: Props = $props();
</script>

<textarea
	bind:value
	{id}
	{name}
	{placeholder}
	{rows}
	{disabled}
	{readonly}
	{required}
	aria-label={ariaLabel}
	aria-invalid={invalid}
	{oninput}
	{onchange}
	class={cn(
		'rounded-kl-field bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content min-h-24 w-full resize-y border [border-color:var(--kl-input-border)] px-3 py-2 text-sm [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 outline-none [--kl-input-border:var(--kl-base-300)] focus:outline focus:outline-[var(--kl-input-border)] focus:[--kl-input-border:var(--kl-primary)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:[--kl-input-border:var(--kl-error)]',
		className
	)}
></textarea>
