<script module lang="ts">
	export type AlertVariant = 'base' | 'info' | 'success' | 'warning' | 'error';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: AlertVariant;
		title?: string;
		role?: 'alert' | 'status' | 'note';
		icon?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = 'base',
		title,
		role = 'status',
		icon,
		children,
		class: className
	}: Props = $props();

	const variantClasses: Record<AlertVariant, string> = {
		base: 'border-kl-base-300 bg-kl-base-200 text-kl-base-content',
		info: 'border-kl-info/30 bg-kl-info/10 text-kl-base-content [--kl-alert-accent:var(--kl-info)]',
		success:
			'border-kl-success/30 bg-kl-success/10 text-kl-base-content [--kl-alert-accent:var(--kl-success)]',
		warning:
			'border-kl-warning/30 bg-kl-warning/10 text-kl-base-content [--kl-alert-accent:var(--kl-warning)]',
		error:
			'border-kl-error/30 bg-kl-error/10 text-kl-base-content [--kl-alert-accent:var(--kl-error)]'
	};
</script>

<div
	{role}
	class={cn(
		'rounded-kl-box grid gap-1.5 border [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] p-4 text-sm',
		icon && 'grid-cols-[auto_1fr]',
		variantClasses[variant],
		className
	)}
>
	{#if icon}
		<div class="text-[var(--kl-alert-accent,var(--kl-base-content))] [&_svg]:size-4">
			{@render icon()}
		</div>
	{/if}
	<div class="min-w-0 space-y-1">
		{#if title}
			<div class="font-medium">{title}</div>
		{/if}
		{#if children}
			<div class="text-kl-muted-content leading-relaxed">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
