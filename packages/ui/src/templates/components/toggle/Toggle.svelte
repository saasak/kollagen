<script module lang="ts">
	export type ToggleColor = import('../button/Button.variants').ButtonColor;
	export type ToggleContent = import('../button/Button.variants').ButtonContent;
	export type ToggleSize = import('../button/Button.variants').ButtonSize;
	export type ToggleVariant = import('../button/Button.variants').ButtonVariant;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { buttonVariants } from '../button/Button.variants';
	import { toggleVariants } from './Toggle.variants';
	import { Toggle } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Visual style */
		variant?: ToggleVariant;
		/** Semantic color */
		color?: ToggleColor;
		/** Toggle size */
		size?: ToggleSize;
		/** Toggle content layout */
		content?: ToggleContent;
		/** Controlled pressed state. Supports bind:pressed */
		pressed?: boolean;
		/** Disable the toggle */
		disabled?: boolean;
		/** Accessible label, required for icon-only toggles */
		ariaLabel?: string;
		/** Callback when pressed state changes */
		onPressedChange?: (pressed: boolean) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Button content */
		children?: Snippet;
	}

	let {
		variant = 'solid',
		color = 'base',
		size = 'md',
		content = 'normal',
		pressed = $bindable(false),
		disabled = false,
		ariaLabel,
		onPressedChange,
		class: className,
		children
	}: Props = $props();

	let toggleClass = $derived(
		cn(buttonVariants({ variant, color, size, content }), toggleVariants({ color }), className)
	);
</script>

<Toggle.Root bind:pressed {disabled} aria-label={ariaLabel} {onPressedChange} class={toggleClass}>
	{@render children?.()}
</Toggle.Root>
