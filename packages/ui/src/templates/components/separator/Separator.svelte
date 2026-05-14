<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Separator as SeparatorPrimitive } from 'bits-ui';

	interface Props {
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
		class?: string;
	}

	let { orientation = 'horizontal', decorative = true, class: className }: Props = $props();
</script>

<SeparatorPrimitive.Root
	{orientation}
	{decorative}
	class={cn(
		'bg-kl-base-300 shrink-0',
		orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
		className
	)}
/>
