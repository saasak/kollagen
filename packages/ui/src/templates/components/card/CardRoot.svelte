<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();

	const cardClass =
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content overflow-hidden border [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [box-shadow:0_1px_2px_0_color-mix(in_oklab,#000_calc(var(--kl-depth)*8%),#0000),0_1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset]';
</script>

<article {...rest} class={cn(cardClass, className as string | undefined)}>
	{@render children?.()}
</article>
