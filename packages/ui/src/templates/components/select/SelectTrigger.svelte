<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { selectVariants } from './Select.variants';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();

	const classes = selectVariants();
</script>

<SelectPrimitive.Trigger {...rest} class={cn(classes.trigger(), className as string | undefined)}>
	<span class="truncate text-left">
		{@render children?.()}
	</span>
	<ChevronDown size={16} class="text-kl-muted-content shrink-0 transition-transform duration-150" />
</SelectPrimitive.Trigger>
