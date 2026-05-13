<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof DialogPrimitive.Overlay> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<DialogPrimitive.Overlay
	{...rest}
	class={cn(
		`fixed inset-0 z-[var(--kl-z-overlay)] bg-black/50 backdrop-blur-sm`,
		className as string | undefined
	)}
>
	{@render children?.()}
</DialogPrimitive.Overlay>
