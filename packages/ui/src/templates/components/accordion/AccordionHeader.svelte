<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Header> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Header {...rest}>
	{@render children?.()}
</AccordionPrimitive.Header>
