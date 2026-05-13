<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Group> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Group {...rest}>
	{@render children?.()}
</MenuPrimitive.Group>
