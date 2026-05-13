<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Item> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Item {...rest}>
	{@render children?.()}
</AccordionPrimitive.Item>
