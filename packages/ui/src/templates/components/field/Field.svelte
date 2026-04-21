<script lang="ts">
	interface Props {
		/** Label text displayed above the input */
		label?: string;
		/** Helper text displayed below the input */
		helperText?: string;
		/** Error text displayed when invalid */
		errorText?: string;
		/** Render a textarea instead of an input */
		textarea?: boolean;
		/** Input type (text, email, password, etc.) — ignored when textarea is true */
		type?: string;
		/** Placeholder text */
		placeholder?: string;
		/** Form field name for native submission */
		name?: string;
		/** Controlled value. Supports bind:value */
		value?: string;
		/** Mark as required */
		required?: boolean;
		/** Disable the field */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Number of rows for textarea — ignored when textarea is false */
		rows?: number;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		helperText,
		errorText,
		textarea = false,
		type = 'text',
		placeholder,
		name,
		value = $bindable(),
		required = false,
		disabled = false,
		invalid = false,
		readOnly = false,
		rows = 3,
		class: className
	}: Props = $props();

	const id = `field-${Math.random().toString(36).slice(2, 9)}`;
	const helperId = `${id}-helper`;
	const errorId = `${id}-error`;
	const describedBy = $derived(
		[invalid && errorText ? errorId : null, !invalid && helperText ? helperId : null]
			.filter(Boolean)
			.join(' ') || undefined
	);
</script>

<div class="flex flex-col gap-1.5 {className ?? ''}">
	{#if label}
		<label
			for={id}
			class="text-kl-base-content text-sm font-medium {disabled ? 'text-kl-muted-content' : ''}"
		>
			{label}
			{#if required}
				<span class="text-kl-error">*</span>
			{/if}
		</label>
	{/if}

	{#if textarea}
		<textarea
			{id}
			bind:value
			{name}
			{placeholder}
			{rows}
			{disabled}
			{required}
			readonly={readOnly}
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:ring-kl-primary resize-y border px-3 py-2 text-sm transition-colors duration-150 outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 {invalid
				? 'border-kl-error focus:ring-kl-error'
				: ''}"
		></textarea>
	{:else}
		<input
			{id}
			bind:value
			{name}
			{placeholder}
			{type}
			{disabled}
			{required}
			readonly={readOnly}
			aria-invalid={invalid || undefined}
			aria-describedby={describedBy}
			class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:ring-kl-primary h-10 border px-3 text-sm transition-colors duration-150 outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 {invalid
				? 'border-kl-error focus:ring-kl-error'
				: ''}"
		/>
	{/if}

	{#if helperText && !invalid}
		<span id={helperId} class="text-kl-muted-content text-xs">
			{helperText}
		</span>
	{/if}

	{#if errorText && invalid}
		<span id={errorId} class="text-kl-error text-xs" role="alert">
			{errorText}
		</span>
	{/if}
</div>
