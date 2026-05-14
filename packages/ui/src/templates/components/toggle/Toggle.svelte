<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

<Toggle.Root
	bind:pressed
	{disabled}
	{onPressedChange}
	class={cn(
		`rounded-kl-selector border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 data-[state=on]:border-kl-primary data-[state=on]:bg-kl-primary data-[state=on]:text-kl-primary-content data-[focus]:outline-kl-primary h-kl-selector-md inline-flex cursor-pointer items-center gap-1.5 border px-3 text-sm font-medium transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:outline`,
		className
	)}
>
	{@render children?.()}
</Toggle.Root>
