<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();

	const footerClass =
		'border-kl-base-300 bg-kl-base-300 border-t px-4 py-3 [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-base-content)_calc(var(--kl-depth)*6%),#0000)_inset]';
</script>

<footer {...rest} class={cn(footerClass, className as string | undefined)}>
	{@render children?.()}
</footer>
