<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<footer
	{...rest}
	class={cn(
		`border-kl-base-300 bg-kl-base-200 border-t px-4 py-3`,
		className as string | undefined
	)}
>
	{@render children?.()}
</footer>
