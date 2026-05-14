<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { meterIndicatorVariants, type MeterTone } from './Meter.variants';
	import { Meter as MeterPrimitive } from 'bits-ui';

	interface Props {
		value?: number;
		min?: number;
		max?: number;
		label?: string;
		class?: string;
	}

	let { value = 0, min = 0, max = 100, label = 'Meter', class: className }: Props = $props();

	const percentage = $derived(Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100)));
	const tone = $derived<MeterTone>(
		percentage < 35 ? 'error' : percentage < 70 ? 'warning' : 'success'
	);
</script>

<MeterPrimitive.Root
	{value}
	{min}
	{max}
	aria-label={label}
	class={cn('bg-kl-muted rounded-kl-selector h-2 w-full overflow-hidden', className)}
>
	<div class={meterIndicatorVariants({ tone })} style:width={`${percentage}%`}></div>
</MeterPrimitive.Root>
