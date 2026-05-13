<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Drawer as DrawerPrimitive } from 'vaul-svelte';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof DrawerPrimitive.Handle>;

	let { class: className, ...rest }: Props = $props();
</script>

<DrawerPrimitive.Handle
	{...rest}
	class={cn(
		`bg-kl-base-300 mx-auto mt-3 mb-1 h-1.5 w-12 shrink-0 rounded-full`,
		className as string | undefined
	)}
/>
