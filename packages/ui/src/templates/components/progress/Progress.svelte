<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { progressIndicatorVariants, type ProgressColor } from './Progress.variants';
	import { Progress as ProgressPrimitive } from 'bits-ui';

	interface Props {
		value?: number | null;
		min?: number;
		max?: number;
		label?: string;
		color?: ProgressColor;
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

	const percentage = $derived(
		value === null ? undefined : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
	);
	let indicatorClass = $derived(
		progressIndicatorVariants({ color, indeterminate: value === null })
	);
</script>

<ProgressPrimitive.Root
	{value}
	{min}
	{max}
	aria-label={label}
	class={cn('bg-kl-muted rounded-kl-selector h-2 w-full overflow-hidden', className)}
>
	<div class={indicatorClass} style:width={value === null ? undefined : `${percentage}%`}></div>
</ProgressPrimitive.Root>
