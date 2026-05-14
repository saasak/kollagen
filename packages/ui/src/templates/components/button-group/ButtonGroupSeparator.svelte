<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { buttonGroupSeparatorVariants } from './ButtonGroupSeparator.variants';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Separator direction */
		orientation?: 'horizontal' | 'vertical';
		/** Additional CSS classes on the separator */
		class?: string;
		/** Optional accessible content */
		children?: Snippet;
	}

	let { orientation = 'vertical', class: className, children }: Props = $props();
</script>

<div
	role="separator"
	aria-orientation={orientation}
	data-orientation={orientation}
	class={cn(buttonGroupSeparatorVariants({ orientation }), className)}
>
	{@render children?.()}
</div>
