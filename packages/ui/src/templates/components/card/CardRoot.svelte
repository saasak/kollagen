<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<article
	{...rest}
	class={cn(
		`rounded-kl-box border-kl-base-300 text-kl-base-content shadow-kl-sm overflow-hidden border bg-[var(--kl-surface-background)]`,
		className as string | undefined
	)}
>
	{@render children?.()}
</article>
