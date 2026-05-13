<script module lang="ts">
	export type ButtonVariant =
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'neutral'
		| 'outline'
		| 'ghost'
		| 'link'
		| 'destructive';

	export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { LoaderCircle } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Visual style */
		variant?: ButtonVariant;
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
		variant = 'primary',
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

	const baseClass =
		'inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-kl-field border border-transparent bg-clip-padding font-medium transition-all duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kl-primary active:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4';

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'bg-kl-primary text-kl-primary-content hover:opacity-90',
		secondary: 'bg-kl-secondary text-kl-secondary-content hover:opacity-90',
		accent: 'bg-kl-accent text-kl-accent-content hover:opacity-90',
		neutral: 'bg-kl-neutral text-kl-neutral-content hover:opacity-90',
		outline:
			'border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 hover:text-kl-base-content',
		ghost: 'text-kl-base-content hover:bg-kl-base-200 hover:text-kl-base-content',
		link: 'h-auto border-transparent bg-transparent px-0 text-kl-primary underline-offset-4 hover:underline',
		destructive: 'bg-kl-error text-kl-error-content hover:opacity-90'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		xs: 'h-7 gap-1.5 px-2 text-xs',
		sm: 'h-8 gap-1.5 px-3 text-sm',
		md: 'h-9 gap-2 px-3.5 text-sm',
		lg: 'h-10 gap-2 px-4 text-sm',
		'icon-sm': 'size-8 p-0',
		icon: 'size-9 p-0',
		'icon-lg': 'size-10 p-0'
	};

	let isDisabled = $derived(disabled || loading);

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
		class={cn(baseClass, variantClasses[variant], sizeClasses[size], className)}
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
		class={cn(baseClass, variantClasses[variant], sizeClasses[size], className)}
	>
		{#if loading}
			<LoaderCircle size={16} class="animate-spin" aria-hidden="true" />
		{/if}
		{@render children?.()}
	</button>
{/if}
