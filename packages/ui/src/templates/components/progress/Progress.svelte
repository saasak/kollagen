<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Progress as ProgressPrimitive } from 'bits-ui';

	interface Props {
		value?: number | null;
		min?: number;
		max?: number;
		label?: string;
		color?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
		class?: string;
	}

	let {
		value = 0,
		min = 0,
		max = 100,
		label = 'Progress',
		color = 'primary',
		class: className
	}: Props = $props();

	const colors: Record<NonNullable<Props['color']>, string> = {
		primary: 'bg-kl-primary',
		secondary: 'bg-kl-secondary',
		accent: 'bg-kl-accent',
		info: 'bg-kl-info',
		success: 'bg-kl-success',
		warning: 'bg-kl-warning',
		error: 'bg-kl-error'
	};

	const percentage = $derived(
		value === null ? undefined : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
	);
</script>

<ProgressPrimitive.Root
	{value}
	{min}
	{max}
	aria-label={label}
	class={cn('bg-kl-muted rounded-kl-selector h-2 w-full overflow-hidden', className)}
>
	<div
		class={cn(
			'rounded-kl-selector h-full transition-all duration-300',
			value === null && 'w-1/3 animate-pulse',
			colors[color]
		)}
		style:width={value === null ? undefined : `${percentage}%`}
	></div>
</ProgressPrimitive.Root>
