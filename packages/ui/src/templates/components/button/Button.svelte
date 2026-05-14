<script module lang="ts">
	export type ButtonColor = import('./Button.variants').ButtonColor;
	export type ButtonSize = import('./Button.variants').ButtonSize;
	export type ButtonVariant = import('./Button.variants').ButtonVariant;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { buttonVariants } from './Button.variants';
	import { LoaderCircle } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Visual style */
		variant?: ButtonVariant;
		/** Semantic color */
		color?: ButtonColor;
		/** Button size */
		size?: ButtonSize;
		/** Disable the action */
		disabled?: boolean;
		/** Show a loading spinner and disable the action */
		loading?: boolean;
		/** Native button type when rendered as a button */
		type?: 'button' | 'submit' | 'reset';
		/** Render as a link when provided */
		href?: string;
		/** Link target when rendered as a link */
		target?: string;
		/** Link rel when rendered as a link */
		rel?: string;
		/** Link download attribute when rendered as a link */
		download?: string | boolean;
		/** Native button name for form submission */
		name?: string;
		/** Native button value for form submission */
		value?: string;
		/** Accessible label, required for icon-only buttons */
		ariaLabel?: string;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Click handler */
		onclick?: (event: MouseEvent) => void;
		/** Button content */
		children?: Snippet;
	}

	let {
		variant = 'solid',
		color = 'base',
		size = 'md',
		disabled = false,
		loading = false,
		type = 'button',
		href,
		target,
		rel,
		download,
		name,
		value,
		ariaLabel,
		class: className,
		onclick,
		children
	}: Props = $props();

	let isDisabled = $derived(disabled || loading);
	let buttonClass = $derived(buttonVariants({ variant, color, size }));

	function handleClick(event: MouseEvent) {
		if (isDisabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		onclick?.(event);
	}
</script>

{#if href}
	<a
		{href}
		{target}
		{rel}
		{download}
		aria-label={ariaLabel}
		aria-disabled={isDisabled}
		aria-busy={loading}
		tabindex={isDisabled ? -1 : undefined}
		onclick={handleClick}
		class={cn(buttonClass, className)}
	>
		{#if loading}
			<LoaderCircle size={16} class="animate-spin" aria-hidden="true" />
		{/if}
		{@render children?.()}
	</a>
{:else}
	<button
		{type}
		{name}
		{value}
		disabled={isDisabled}
		aria-label={ariaLabel}
		aria-busy={loading}
		onclick={handleClick}
		class={cn(buttonClass, className)}
	>
		{#if loading}
			<LoaderCircle size={16} class="animate-spin" aria-hidden="true" />
		{/if}
		{@render children?.()}
	</button>
{/if}
