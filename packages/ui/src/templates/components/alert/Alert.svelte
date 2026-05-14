<script module lang="ts">
	export type AlertVariant = 'solid' | 'outline' | 'dash' | 'soft' | 'ghost';
	export type AlertColor =
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
		variant?: AlertVariant;
		color?: AlertColor;
		title?: string;
		role?: 'alert' | 'status' | 'note';
		icon?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = 'soft',
		color = 'base',
		title,
		role = 'status',
		icon,
		children,
		class: className
	}: Props = $props();

	const colorClasses: Record<AlertColor, string> = {
		base: '[--kl-alert-color:var(--kl-base-content)] [--kl-alert-content:var(--kl-base-100)]',
		neutral: '[--kl-alert-color:var(--kl-neutral)] [--kl-alert-content:var(--kl-neutral-content)]',
		primary: '[--kl-alert-color:var(--kl-primary)] [--kl-alert-content:var(--kl-primary-content)]',
		secondary:
			'[--kl-alert-color:var(--kl-secondary)] [--kl-alert-content:var(--kl-secondary-content)]',
		accent: '[--kl-alert-color:var(--kl-accent)] [--kl-alert-content:var(--kl-accent-content)]',
		info: '[--kl-alert-color:var(--kl-info)] [--kl-alert-content:var(--kl-info-content)]',
		success: '[--kl-alert-color:var(--kl-success)] [--kl-alert-content:var(--kl-success-content)]',
		warning: '[--kl-alert-color:var(--kl-warning)] [--kl-alert-content:var(--kl-warning-content)]',
		error: '[--kl-alert-color:var(--kl-error)] [--kl-alert-content:var(--kl-error-content)]'
	};

	const variantClasses: Record<AlertVariant, string> = {
		solid:
			'[--kl-alert-bg:var(--kl-alert-color)] [--kl-alert-border:color-mix(in_oklab,var(--kl-alert-color),#000_calc(var(--kl-depth)*5%))] [--kl-alert-fg:var(--kl-alert-content)] [--kl-alert-icon:var(--kl-alert-content)]',
		outline:
			'[--kl-alert-bg:var(--kl-base-100)] [--kl-alert-border:var(--kl-alert-color)] [--kl-alert-fg:var(--kl-base-content)] [--kl-alert-icon:var(--kl-alert-color)]',
		dash: 'border-dashed [--kl-alert-bg:var(--kl-base-100)] [--kl-alert-border:var(--kl-alert-color)] [--kl-alert-fg:var(--kl-base-content)] [--kl-alert-icon:var(--kl-alert-color)]',
		soft: '[--kl-alert-bg:color-mix(in_oklab,var(--kl-alert-color)_10%,var(--kl-base-100))] [--kl-alert-border:color-mix(in_oklab,var(--kl-alert-color)_24%,var(--kl-base-100))] [--kl-alert-fg:var(--kl-base-content)] [--kl-alert-icon:var(--kl-alert-color)]',
		ghost:
			'[--kl-alert-bg:var(--kl-base-100)] [--kl-alert-border:#0000] [--kl-alert-fg:var(--kl-base-content)] [--kl-alert-icon:var(--kl-alert-color)]'
	};
</script>

<div
	{role}
	class={cn(
		'rounded-kl-box grid gap-1.5 border [border-color:var(--kl-alert-border)] [background-color:var(--kl-alert-bg)] [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] p-4 text-sm text-[var(--kl-alert-fg)] [--kl-alert-bg:var(--kl-base-100)] [--kl-alert-border:var(--kl-base-300)] [--kl-alert-color:var(--kl-base-content)] [--kl-alert-content:var(--kl-base-content)] [--kl-alert-fg:var(--kl-base-content)] [--kl-alert-icon:var(--kl-base-content)]',
		icon && 'grid-cols-[2rem_1fr] items-center gap-x-3',
		colorClasses[color],
		variantClasses[variant],
		className
	)}
>
	{#if icon}
		<div
			class="grid size-8 place-items-center self-center text-[var(--kl-alert-icon)] [&_svg]:size-6"
		>
			{@render icon()}
		</div>
	{/if}
	<div class="min-w-0 space-y-1">
		{#if title}
			<div class="font-medium">{title}</div>
		{/if}
		{#if children}
			<div class="leading-relaxed text-[var(--kl-alert-fg)] opacity-75">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
