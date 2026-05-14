<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { separatorVariants } from './Separator.variants';
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
	class={cn(separatorVariants({ orientation }), className)}
/>
