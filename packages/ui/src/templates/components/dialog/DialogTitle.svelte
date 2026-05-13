<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DialogPrimitive.Title> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Title
	{...rest}
	class={cn(`text-kl-base-content text-lg font-semibold`, className as string | undefined)}
>
	{@render children?.()}
</DialogPrimitive.Title>
