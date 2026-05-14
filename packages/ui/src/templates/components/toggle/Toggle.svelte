<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { toggleVariants } from './Toggle.variants';
	import { Toggle } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Controlled pressed state. Supports bind:pressed */
		pressed?: boolean;
		/** Disable the toggle */
		disabled?: boolean;
		/** Callback when pressed state changes */
		onPressedChange?: (pressed: boolean) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Button content */
		children?: Snippet;
	}

	let {
		pressed = $bindable(false),
		disabled = false,
		onPressedChange,
		class: className,
		children
	}: Props = $props();
</script>

<Toggle.Root bind:pressed {disabled} {onPressedChange} class={cn(toggleVariants(), className)}>
	{@render children?.()}
</Toggle.Root>
