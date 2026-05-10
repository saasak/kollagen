<script lang="ts">
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
	class={[
		'bg-kl-base-300 relative self-stretch',
		orientation === 'vertical' && 'my-1 w-px',
		orientation === 'horizontal' && 'mx-1 h-px w-auto',
		className
	]}
>
	{@render children?.()}
</div>
