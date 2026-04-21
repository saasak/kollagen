<script lang="ts">
	import { Eye, EyeOff } from 'lucide-svelte';

	interface Props {
		/** Controlled input value. Supports bind:value */
		value?: string;
		/** Controlled visibility state. Supports bind:visible */
		visible?: boolean;
		/** Initial visibility for uncontrolled mode */
		defaultVisible?: boolean;
		/** Input placeholder text */
		placeholder?: string;
		/** Form field name for native submission */
		name?: string;
		/** Disable the input */
		disabled?: boolean;
		/** Mark the input as invalid */
		invalid?: boolean;
		/** Mark the input as required */
		required?: boolean;
		/** Callback when visibility state changes */
		onVisibilityChange?: (details: { visible: boolean }) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		value = $bindable(''),
		visible = $bindable(),
		defaultVisible = false,
		placeholder,
		name,
		disabled = false,
		invalid = false,
		required = false,
		onVisibilityChange,
		class: className
	}: Props = $props();

	let internalVisible = $state(defaultVisible);
	const isVisible = $derived(visible !== undefined ? visible : internalVisible);

	function toggleVisibility() {
		const next = !isVisible;
		internalVisible = next;
		if (visible !== undefined) visible = next;
		onVisibilityChange?.({ visible: next });
	}
</script>

<div class="relative w-full {className ?? ''}">
	<div
		class="rounded-kl-field bg-kl-base-100 flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1 {disabled
			? 'cursor-not-allowed opacity-50'
			: ''} {invalid
			? 'border-kl-error focus-within:outline-kl-error'
			: 'border-kl-base-300 focus-within:border-kl-primary focus-within:outline-kl-primary'}"
	>
		<input
			type={isVisible ? 'text' : 'password'}
			bind:value
			{name}
			{placeholder}
			{disabled}
			{required}
			aria-invalid={invalid || undefined}
			class="text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none"
		/>
		<button
			type="button"
			{disabled}
			onclick={toggleVisibility}
			aria-label={isVisible ? 'Hide password' : 'Show password'}
			class="text-kl-muted-content hover:text-kl-base-content flex cursor-pointer items-center justify-center py-2 pr-2.5 pl-1 transition-colors duration-150"
		>
			{#if isVisible}
				<EyeOff size={16} />
			{:else}
				<Eye size={16} />
			{/if}
		</button>
	</div>
</div>
