<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof CollapsiblePrimitive.Content> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Content
	{...rest}
	class={cn(`overflow-hidden`, className as string | undefined)}
>
	<div class="border-kl-base-300 text-kl-base-content border-t px-4 py-3 text-sm">
		{@render children?.()}
	</div>
</CollapsiblePrimitive.Content>
