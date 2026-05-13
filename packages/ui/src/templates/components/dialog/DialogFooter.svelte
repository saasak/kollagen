<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<div
	{...rest}
	class={cn(`mt-6 flex items-center justify-end gap-2`, className as string | undefined)}
>
	{@render children?.()}
</div>
