<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { passwordInputVariants } from './PasswordInput.variants';
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
		/** Input reference. Supports bind:inputRef */
		inputRef?: HTMLInputElement | null;
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
		inputRef = $bindable<HTMLInputElement | null>(null),
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

	function setInputRef(node: HTMLInputElement) {
		inputRef = node;
		return () => {
			if (inputRef === node) inputRef = null;
		};
	}

	let classes = $derived(passwordInputVariants({ disabled, invalid }));
</script>

<div class={cn(`relative w-full`, className)}>
	<div class={classes.fieldShell()}>
		<input
			{@attach setInputRef}
			type={isVisible ? 'text' : 'password'}
			bind:value
			{name}
			{placeholder}
			{disabled}
			{required}
			aria-invalid={invalid || undefined}
			class={classes.input()}
		/>
		<button
			type="button"
			{disabled}
			onclick={toggleVisibility}
			aria-label={isVisible ? 'Hide password' : 'Show password'}
			class={classes.toggle()}
		>
			{#if isVisible}
				<EyeOff size={16} />
			{:else}
				<Eye size={16} />
			{/if}
		</button>
	</div>
</div>
