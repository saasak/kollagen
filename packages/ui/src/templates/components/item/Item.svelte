<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		media?: Snippet;
		actions?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let { title, description, media, actions, children, class: className }: Props = $props();
</script>

<div class={cn('rounded-kl-box flex items-start gap-3 border border-transparent p-3', className)}>
	{@render media?.()}
	<div class="min-w-0 flex-1 space-y-1">
		{#if title}
			<div class="text-kl-base-content truncate text-sm font-medium">{title}</div>
		{/if}
		{#if description}
			<div class="text-kl-muted-content text-sm">{description}</div>
		{/if}
		{@render children?.()}
	</div>
	{@render actions?.()}
</div>
