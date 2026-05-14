<script module lang="ts">
	export type ButtonVariant = 'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link';

	export type ButtonColor =
		| 'base'
		| 'neutral'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';

	export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const baseClass =
		'inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap rounded-kl-field border bg-clip-padding font-medium text-[var(--kl-btn-fg)] [background-color:var(--kl-btn-bg)] [background-image:none,var(--kl-btn-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [border-color:var(--kl-btn-border)] [box-shadow:0_0.5px_0_0.5px_oklch(100%_0_0/calc(var(--kl-depth)*6%))_inset,var(--kl-btn-shadow)] [text-shadow:0_0.5px_oklch(100%_0_0/calc(var(--kl-depth)*0.15))] transition-all duration-150 outline-none [--kl-btn-bg:var(--kl-btn-color,var(--kl-base-200))] [--kl-btn-border:color-mix(in_oklab,var(--kl-btn-bg),#000_calc(var(--kl-depth)*5%))] [--kl-btn-fg:var(--kl-btn-content,var(--kl-base-content))] [--kl-btn-noise:var(--kl-fx-noise)] [--kl-btn-shadow:0_3px_2px_-2px_color-mix(in_oklab,var(--kl-btn-bg)_calc(var(--kl-depth)*30%),#0000),0_4px_3px_-2px_color-mix(in_oklab,var(--kl-btn-bg)_calc(var(--kl-depth)*30%),#0000)] hover:[--kl-btn-bg:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_7%)] active:translate-y-[0.5px] active:[--kl-btn-bg:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_5%)] active:[--kl-btn-border:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_7%)] active:[--kl-btn-shadow:0_0_0_0_#0000,0_0_0_0_#0000] focus-visible:outline focus-visible:outline-[var(--kl-btn-color,var(--kl-base-content))] disabled:pointer-events-none disabled:cursor-not-allowed disabled:[--kl-btn-bg:color-mix(in_oklch,var(--kl-base-content)_10%,#0000)] disabled:[--kl-btn-border:#0000] disabled:[--kl-btn-fg:color-mix(in_oklch,var(--kl-base-content)_20%,#0000)] disabled:[--kl-btn-noise:none] disabled:[--kl-btn-shadow:0_0_#0000,0_0_#0000] aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:[--kl-btn-bg:color-mix(in_oklch,var(--kl-base-content)_10%,#0000)] aria-disabled:[--kl-btn-border:#0000] aria-disabled:[--kl-btn-fg:color-mix(in_oklch,var(--kl-base-content)_20%,#0000)] aria-disabled:[--kl-btn-noise:none] aria-disabled:[--kl-btn-shadow:0_0_#0000,0_0_#0000] [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=size-])]:size-4';

	const colorClasses: Record<ButtonColor, string> = {
		base: '[--kl-btn-content:var(--kl-base-content)]',
		neutral: '[--kl-btn-color:var(--kl-neutral)] [--kl-btn-content:var(--kl-neutral-content)]',
		primary: '[--kl-btn-color:var(--kl-primary)] [--kl-btn-content:var(--kl-primary-content)]',
		secondary:
			'[--kl-btn-color:var(--kl-secondary)] [--kl-btn-content:var(--kl-secondary-content)]',
		accent: '[--kl-btn-color:var(--kl-accent)] [--kl-btn-content:var(--kl-accent-content)]',
		info: '[--kl-btn-color:var(--kl-info)] [--kl-btn-content:var(--kl-info-content)]',
		success: '[--kl-btn-color:var(--kl-success)] [--kl-btn-content:var(--kl-success-content)]',
		warning: '[--kl-btn-color:var(--kl-warning)] [--kl-btn-content:var(--kl-warning-content)]',
		error: '[--kl-btn-color:var(--kl-error)] [--kl-btn-content:var(--kl-error-content)]'
	};

	const outlineClasses: Record<ButtonColor, string> = {
		base: '[--kl-btn-border:var(--kl-base-300)]',
		neutral: '',
		primary: '',
		secondary: '',
		accent: '',
		info: '',
		success: '',
		warning: '',
		error: ''
	};

	const linkClasses: Record<ButtonColor, string> = {
		base: '[--kl-btn-color:var(--kl-base-content)]',
		neutral: 'text-kl-neutral',
		primary: 'text-kl-primary',
		secondary: 'text-kl-secondary',
		accent: 'text-kl-accent',
		info: 'text-kl-info',
		success: 'text-kl-success',
		warning: 'text-kl-warning',
		error: 'text-kl-error'
	};

	const variantClass = $derived.by(() => {
		switch (variant) {
			case 'outline':
				return cn(
					'[--kl-btn-bg:#0000] [--kl-btn-border:var(--kl-btn-color,var(--kl-base-content))] [--kl-btn-fg:var(--kl-btn-color,var(--kl-base-content))] [--kl-btn-noise:none] [--kl-btn-shadow:0_0_#0000,0_0_#0000] hover:[--kl-btn-bg:var(--kl-btn-color,var(--kl-base-200))] hover:[--kl-btn-border:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_calc(var(--kl-depth)*5%))] hover:[--kl-btn-fg:var(--kl-btn-content,var(--kl-base-content))] hover:[--kl-btn-noise:var(--kl-fx-noise)] hover:[--kl-btn-shadow:0_3px_2px_-2px_color-mix(in_oklab,var(--kl-btn-bg)_calc(var(--kl-depth)*30%),#0000),0_4px_3px_-2px_color-mix(in_oklab,var(--kl-btn-bg)_calc(var(--kl-depth)*30%),#0000)]',
					outlineClasses[color]
				);
			case 'dash':
				return cn(
					'border-dashed [--kl-btn-bg:#0000] [--kl-btn-border:var(--kl-btn-color,var(--kl-base-content))] [--kl-btn-fg:var(--kl-btn-color,var(--kl-base-content))] [--kl-btn-noise:none] [--kl-btn-shadow:0_0_#0000,0_0_#0000] hover:[--kl-btn-bg:var(--kl-btn-color,var(--kl-base-200))] hover:[--kl-btn-border:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_calc(var(--kl-depth)*5%))] hover:[--kl-btn-fg:var(--kl-btn-content,var(--kl-base-content))] hover:[--kl-btn-noise:var(--kl-fx-noise)]',
					outlineClasses[color]
				);
			case 'soft':
				return '[--kl-btn-bg:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-content))_8%,var(--kl-base-100))] [--kl-btn-border:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-content))_10%,var(--kl-base-100))] [--kl-btn-fg:var(--kl-btn-color,var(--kl-base-content))] [--kl-btn-noise:none] [--kl-btn-shadow:0_0_#0000,0_0_#0000] hover:[--kl-btn-bg:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_7%)] hover:[--kl-btn-border:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-200)),#000_calc(var(--kl-depth)*5%))] hover:[--kl-btn-fg:var(--kl-btn-content,var(--kl-base-content))] hover:[--kl-btn-noise:var(--kl-fx-noise)] hover:[--kl-btn-shadow:0_3px_2px_-2px_color-mix(in_oklab,var(--kl-btn-bg)_calc(var(--kl-depth)*30%),#0000),0_4px_3px_-2px_color-mix(in_oklab,var(--kl-btn-bg)_calc(var(--kl-depth)*30%),#0000)]';
			case 'ghost':
				return '[--kl-btn-bg:#0000] [--kl-btn-border:#0000] [--kl-btn-fg:var(--kl-btn-color,var(--kl-base-content))] [--kl-btn-noise:none] [--kl-btn-shadow:0_0_#0000,0_0_#0000] hover:[--kl-btn-bg:color-mix(in_oklab,var(--kl-btn-color,var(--kl-base-content))_10%,#0000)] hover:[--kl-btn-border:#0000] hover:[--kl-btn-fg:var(--kl-btn-color,var(--kl-base-content))] hover:[--kl-btn-noise:none] hover:[--kl-btn-shadow:0_0_#0000,0_0_#0000]';
			case 'link':
				return cn(
					'h-auto px-0 underline-offset-4 [--kl-btn-bg:#0000] [--kl-btn-border:#0000] [--kl-btn-fg:var(--kl-btn-color,var(--kl-primary))] [--kl-btn-noise:none] [--kl-btn-shadow:0_0_#0000,0_0_#0000] [box-shadow:none] [text-shadow:none] hover:[--kl-btn-bg:#0000] hover:[--kl-btn-border:#0000] hover:underline',
					linkClasses[color]
				);
			default:
				return '';
		}
	});

	const sizeClasses: Record<ButtonSize, string> = {
		xs: 'h-kl-field-xs gap-1.5 px-2 text-xs',
		sm: 'h-kl-field-sm gap-1.5 px-3 text-sm',
		md: 'h-kl-field-md gap-2 px-3.5 text-sm',
		lg: 'h-kl-field-lg gap-2 px-4 text-sm',
		'icon-sm': 'size-kl-field-sm p-0',
		icon: 'size-kl-field-md p-0',
		'icon-lg': 'size-kl-field-lg p-0'
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
		class={cn(baseClass, colorClasses[color], variantClass, sizeClasses[size], className)}
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
		class={cn(baseClass, colorClasses[color], variantClass, sizeClasses[size], className)}
	>
		{#if loading}
			<LoaderCircle size={16} class="animate-spin" aria-hidden="true" />
		{/if}
		{@render children?.()}
	</button>
{/if}
