<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Legend text displayed at the top of the fieldset */
		legend?: string;
		/** Helper text displayed below the grouped fields */
		helperText?: string;
		/** Error text displayed when invalid */
		errorText?: string;
		/** Disable all fields in the fieldset */
		disabled?: boolean;
		/** Mark the fieldset as invalid */
		invalid?: boolean;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Fieldset content (grouped form fields) */
		children?: Snippet;
	}

	let {
		legend,
		helperText,
		errorText,
		disabled = false,
		invalid = false,
		class: className,
		children
	}: Props = $props();
</script>

<fieldset {disabled} class="flex flex-col gap-3 {className ?? ''}">
	{#if legend}
		<legend
			class="text-kl-base-content text-sm font-semibold {disabled ? 'text-kl-muted-content' : ''}"
		>
			{legend}
		</legend>
	{/if}

	{@render children?.()}

	{#if helperText && !invalid}
		<span class="text-kl-muted-content text-xs">
			{helperText}
		</span>
	{/if}

	{#if errorText && invalid}
		<span class="text-kl-error text-xs" role="alert">
			{errorText}
		</span>
	{/if}
</fieldset>
