<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DialogPrimitive.Description> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Description
	{...rest}
	class={cn(`text-kl-muted-content mt-1 text-sm`, className as string | undefined)}
>
	{@render children?.()}
</DialogPrimitive.Description>
