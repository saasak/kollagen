<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLHeadingElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<h3
	{...rest}
	class={cn(
		`text-kl-base-content font-kl-heading text-base font-semibold`,
		className as string | undefined
	)}
>
	{@render children?.()}
</h3>
