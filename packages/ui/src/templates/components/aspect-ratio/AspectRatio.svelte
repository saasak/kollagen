<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AspectRatio as AspectRatioPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		ratio?: number;
		children?: Snippet;
		class?: string;
	}

	let { ratio = 16 / 9, children, class: className }: Props = $props();
</script>

<AspectRatioPrimitive.Root
	{ratio}
	class={cn('rounded-kl-box bg-kl-base-200 overflow-hidden', className)}
>
	{@render children?.()}
</AspectRatioPrimitive.Root>
