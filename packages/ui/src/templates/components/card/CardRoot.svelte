<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { cardVariants } from './Card.variants';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();

	const classes = cardVariants();
</script>

<article {...rest} class={cn(classes.root(), className as string | undefined)}>
	{@render children?.()}
</article>
