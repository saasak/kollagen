<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Root> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Root {...rest}>
	{@render children?.()}
</MenuPrimitive.Root>
