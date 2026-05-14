<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		caption?: string;
		children?: Snippet;
		class?: string;
	}

	let { caption, children, class: className }: Props = $props();
</script>

<div class="w-full overflow-x-auto">
	<table class={cn('w-full caption-bottom border-collapse text-sm', className)}>
		{#if caption}
			<caption class="text-kl-muted-content mt-3 text-sm">{caption}</caption>
		{/if}
		{@render children?.()}
	</table>
</div>
