<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Pencil, Check, X } from 'lucide-svelte';

	interface Props {
		/** Optional label rendered above the field */
		label?: string;
		/** Controlled value. Supports bind:value */
		value?: string;
		/** Placeholder shown when empty */
		placeholder?: string;
		/** Form field name for native submission */
		name?: string;
		/** Disable the field */
		disabled?: boolean;
		/** Prevent editing */
		readOnly?: boolean;
		/** How the user enters edit mode */
		activationMode?: 'focus' | 'dblclick' | 'click' | 'none';
		/** What triggers saving the value */
		submitMode?: 'enter' | 'blur' | 'none' | 'both';
		/** Select all text when entering edit mode */
		selectOnFocus?: boolean;
		/** Maximum character count */
		maxLength?: number;
		/** Mark the field as invalid */
		invalid?: boolean;
		/** Callback when value changes */
		onValueChange?: (details: { value: string }) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		value = $bindable(''),
		placeholder = 'Click to edit',
		name,
		disabled = false,
		readOnly = false,
		invalid = false,
		activationMode = 'focus',
		submitMode = 'both',
		selectOnFocus = true,
		maxLength,
		onValueChange,
		class: className
	}: Props = $props();

	let editing = $state(false);
	let previousValue = $state('');

	function focusInput(node: HTMLInputElement) {
		node.focus();
		if (selectOnFocus) node.select();
	}

	function startEditing() {
		if (disabled || readOnly) return;
		previousValue = value;
		editing = true;
	}

	function submit() {
		editing = false;
		onValueChange?.({ value });
	}

	function cancel() {
		value = previousValue;
		editing = false;
	}

	function handlePreviewInteraction(event: Event) {
		if (activationMode === 'click' && event.type === 'click') startEditing();
		if (activationMode === 'dblclick' && event.type === 'dblclick') startEditing();
		if (activationMode === 'focus' && event.type === 'focus') startEditing();
	}

	function handlePreviewKeydown(event: KeyboardEvent) {
		if (event.key !== 'Enter' && event.key !== ' ') return;
		event.preventDefault();
		startEditing();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' && (submitMode === 'enter' || submitMode === 'both')) {
			submit();
		}
		if (event.key === 'Escape') {
			cancel();
		}
	}

	function handleBlur() {
		if (submitMode === 'blur' || submitMode === 'both') {
			submit();
		}
	}
</script>

<div class={cn(`inline-flex w-full flex-col gap-1.5`, className)}>
	{#if label}
		<span class="text-kl-base-content text-sm font-medium">{label}</span>
	{/if}

	<div class="flex items-center gap-1.5">
		<div class="relative flex min-w-0 flex-1 items-center">
			{#if editing}
				<input
					{@attach focusInput}
					bind:value
					{name}
					{placeholder}
					{disabled}
					maxlength={maxLength}
					onkeydown={handleKeydown}
					onblur={handleBlur}
					class="rounded-kl-field bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content w-full border px-3 py-1.5 text-sm ring-2 outline-none disabled:cursor-not-allowed disabled:opacity-60 {invalid
						? 'border-kl-error ring-kl-error/20'
						: 'border-kl-primary ring-kl-primary/20'}"
				/>
			{:else}
				<button
					type="button"
					{disabled}
					onclick={handlePreviewInteraction}
					ondblclick={handlePreviewInteraction}
					onfocus={handlePreviewInteraction}
					onkeydown={handlePreviewKeydown}
					class="rounded-kl-field text-kl-base-content hover:bg-kl-base-200 w-full cursor-text truncate border border-transparent px-3 py-1.5 text-sm transition-colors duration-150 {disabled
						? 'cursor-not-allowed opacity-60'
						: ''} {readOnly ? 'cursor-default' : ''} {!value ? 'text-kl-muted-content' : ''}"
				>
					{value || placeholder}
				</button>
			{/if}
		</div>

		<div class="flex shrink-0 items-center gap-0.5">
			{#if !editing}
				<button
					onclick={startEditing}
					{disabled}
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-base-200 hover:text-kl-base-content flex cursor-pointer items-center justify-center p-1.5 transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50"
					aria-label="Edit"
				>
					<Pencil size={14} />
				</button>
			{:else}
				<button
					onclick={submit}
					class="rounded-kl-selector text-kl-primary hover:bg-kl-base-200 flex cursor-pointer items-center justify-center p-1.5 transition-colors duration-150"
					aria-label="Save"
				>
					<Check size={14} />
				</button>
				<button
					onclick={cancel}
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-base-200 hover:text-kl-base-content flex cursor-pointer items-center justify-center p-1.5 transition-colors duration-150"
					aria-label="Cancel"
				>
					<X size={14} />
				</button>
			{/if}
		</div>
	</div>

	{#if name && !editing}
		<input type="hidden" {name} {value} />
	{/if}
</div>
