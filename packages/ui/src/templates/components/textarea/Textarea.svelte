<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { textareaVariants } from './Textarea.variants';

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
	class={cn(textareaVariants(), className)}
></textarea>
