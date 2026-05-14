<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<tr class={cn('border-kl-base-300 hover:bg-kl-base-200/70 border-b transition-colors', className)}>
	{@render children?.()}
</tr>
