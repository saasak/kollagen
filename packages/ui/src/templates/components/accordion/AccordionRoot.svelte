<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Root> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Root
	{...rest}
	class={cn(
		`divide-kl-base-300 rounded-kl-box border-kl-base-300 bg-kl-base-100 w-full divide-y border`,
		className as string | undefined
	)}
>
	{@render children?.()}
</AccordionPrimitive.Root>
