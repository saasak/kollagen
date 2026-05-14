<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Label as LabelPrimitive } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		for?: string;
		required?: boolean;
		children?: Snippet;
		class?: string;
	}

	let { for: htmlFor, required = false, children, class: className }: Props = $props();
</script>

<LabelPrimitive.Root
	for={htmlFor}
	class={cn('text-kl-base-content inline-flex items-center gap-1 text-sm font-medium', className)}
>
	{@render children?.()}
	{#if required}
		<span class="text-kl-error" aria-hidden="true">*</span>
	{/if}
</LabelPrimitive.Root>
