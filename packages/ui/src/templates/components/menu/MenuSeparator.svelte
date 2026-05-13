<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Separator>;

	let { class: className, ...rest }: Props = $props();
</script>

<MenuPrimitive.Separator
	{...rest}
	class={cn(`bg-kl-base-300 my-1 h-px`, className as string | undefined)}
/>
