<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<th class={cn('text-kl-muted-content h-10 px-3 text-left align-middle font-medium', className)}>
	{@render children?.()}
</th>
