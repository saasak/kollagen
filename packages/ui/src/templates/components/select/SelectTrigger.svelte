<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Trigger
	{...rest}
	class={cn(
		`border-kl-base-300 rounded-kl-field bg-kl-base-100 text-kl-base-content focus:border-kl-primary focus:outline-kl-primary flex w-full cursor-pointer items-center justify-between gap-2 border px-3 py-2 text-sm transition-colors duration-150 outline-none focus:outline-2 focus:-outline-offset-1 disabled:cursor-not-allowed disabled:opacity-50`,
		className as string | undefined
	)}
>
	<span class="truncate text-left">
		{@render children?.()}
	</span>
	<ChevronDown size={16} class="text-kl-muted-content shrink-0 transition-transform duration-150" />
</SelectPrimitive.Trigger>
