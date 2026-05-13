<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Content> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Content
	{...rest}
	class={cn(`overflow-hidden`, className as string | undefined)}
>
	<div class="text-kl-base-content px-4 py-3 text-sm">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
