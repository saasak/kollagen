<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	function getInitialVisible() {
		return defaultVisible;
	}

	let internalVisible = $state(getInitialVisible());
	const isVisible = $derived(visible !== undefined ? visible : internalVisible);

	function toggleVisibility() {
		const next = !isVisible;
		internalVisible = next;
		if (visible !== undefined) visible = next;
		onVisibilityChange?.({ visible: next });
	}

	const fieldShellClass =
		'rounded-kl-field bg-kl-base-100 flex h-kl-field-md items-center border transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]';
</script>

<div class={cn(`relative w-full`, className)}>
	<div
		class={cn(
			fieldShellClass,
			disabled && 'cursor-not-allowed opacity-50',
			invalid &&
				'[--kl-input-border:var(--kl-error)] focus-within:[--kl-input-border:var(--kl-error)]'
		)}
	>
		<input
			type={isVisible ? 'text' : 'password'}
			bind:value
			{name}
			{placeholder}
			{disabled}
			{required}
			aria-invalid={invalid || undefined}
			class="text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 text-sm outline-none"
		/>
		<button
			type="button"
			{disabled}
			onclick={toggleVisibility}
			aria-label={isVisible ? 'Hide password' : 'Show password'}
			class="text-kl-muted-content hover:text-kl-base-content flex h-full cursor-pointer items-center justify-center pr-2.5 pl-1 transition-colors duration-150"
		>
			{#if isVisible}
				<EyeOff size={16} />
			{:else}
				<Eye size={16} />
			{/if}
		</button>
	</div>
</div>
