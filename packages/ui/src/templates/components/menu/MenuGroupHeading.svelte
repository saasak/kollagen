<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.GroupHeading> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<MenuPrimitive.GroupHeading
	{...rest}
	class={cn(
		`text-kl-muted-content px-3 py-1.5 text-xs font-semibold`,
		className as string | undefined
	)}
>
	{@render children?.()}
</MenuPrimitive.GroupHeading>
