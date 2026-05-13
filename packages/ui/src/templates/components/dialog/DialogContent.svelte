<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DialogPrimitive.Content> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Content
	{...rest}
	class={cn(
		`rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-full max-w-lg -translate-x-1/2 -translate-y-1/2 border p-6`,
		className as string | undefined
	)}
>
	{@render children?.()}
</DialogPrimitive.Content>
