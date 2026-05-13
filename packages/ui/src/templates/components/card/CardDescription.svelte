<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLParagraphElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<p {...rest} class={cn(`text-kl-muted-content mt-1 text-sm`, className as string | undefined)}>
	{@render children?.()}
</p>
