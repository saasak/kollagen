<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		description?: string;
		icon?: Snippet;
		action?: Snippet;
		class?: string;
	}

	let { title, description, icon, action, class: className }: Props = $props();
</script>

<div
	class={cn('flex min-h-48 flex-col items-center justify-center gap-3 p-6 text-center', className)}
>
	{#if icon}
		<div
			class="bg-kl-base-200 text-kl-muted-content rounded-kl-box flex size-12 items-center justify-center [&_svg]:size-5"
		>
			{@render icon()}
		</div>
	{/if}
	<div class="space-y-1">
		{#if title}
			<h3 class="text-kl-base-content text-sm font-semibold">{title}</h3>
		{/if}
		{#if description}
			<p class="text-kl-muted-content max-w-sm text-sm">{description}</p>
		{/if}
	</div>
	{@render action?.()}
</div>
