<script module lang="ts">
	export type BadgeVariant = 'solid' | 'outline' | 'soft' | 'dash';
	export type BadgeColor =
		| 'base'
		| 'neutral'
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'info'
		| 'success'
		| 'warning'
		| 'error';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: BadgeVariant;
		color?: BadgeColor;
		children?: Snippet;
		class?: string;
	}

	let { variant = 'solid', color = 'base', children, class: className }: Props = $props();

	const colors: Record<BadgeColor, string> = {
		base: '[--kl-badge:var(--kl-base-200)] [--kl-badge-content:var(--kl-base-content)]',
		neutral: '[--kl-badge:var(--kl-neutral)] [--kl-badge-content:var(--kl-neutral-content)]',
		primary: '[--kl-badge:var(--kl-primary)] [--kl-badge-content:var(--kl-primary-content)]',
		secondary: '[--kl-badge:var(--kl-secondary)] [--kl-badge-content:var(--kl-secondary-content)]',
		accent: '[--kl-badge:var(--kl-accent)] [--kl-badge-content:var(--kl-accent-content)]',
		info: '[--kl-badge:var(--kl-info)] [--kl-badge-content:var(--kl-info-content)]',
		success: '[--kl-badge:var(--kl-success)] [--kl-badge-content:var(--kl-success-content)]',
		warning: '[--kl-badge:var(--kl-warning)] [--kl-badge-content:var(--kl-warning-content)]',
		error: '[--kl-badge:var(--kl-error)] [--kl-badge-content:var(--kl-error-content)]'
	};

	const variants: Record<BadgeVariant, string> = {
		solid: 'border-transparent bg-[var(--kl-badge)] text-[var(--kl-badge-content)]',
		outline: 'border-[var(--kl-badge)] bg-transparent text-[var(--kl-badge)]',
		soft: 'border-transparent bg-[color-mix(in_oklab,var(--kl-badge)_14%,#0000)] text-[var(--kl-badge)]',
		dash: 'border-dashed border-[var(--kl-badge)] bg-transparent text-[var(--kl-badge)]'
	};
</script>

<span
	class={cn(
		'rounded-kl-selector inline-flex min-h-5 items-center gap-1 border px-2 py-0.5 text-xs font-medium whitespace-nowrap',
		colors[color],
		variants[variant],
		className
	)}
>
	{@render children?.()}
</span>
