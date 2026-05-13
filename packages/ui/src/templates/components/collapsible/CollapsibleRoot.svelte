<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Collapsible as CollapsiblePrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof CollapsiblePrimitive.Root> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<CollapsiblePrimitive.Root
	{...rest}
	class={cn(
		`rounded-kl-box border-kl-base-300 bg-kl-base-100 w-full border`,
		className as string | undefined
	)}
>
	{@render children?.()}
</CollapsiblePrimitive.Root>
