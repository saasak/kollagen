<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Portal> & {
		children?: Snippet;
	};

	let { children, ...rest }: Props = $props();
</script>

<MenuPrimitive.Portal {...rest}>
	{@render children?.()}
</MenuPrimitive.Portal>
