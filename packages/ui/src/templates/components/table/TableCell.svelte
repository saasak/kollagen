<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<td class={cn('text-kl-base-content px-3 py-2 align-middle', className)}>{@render children?.()}</td>
