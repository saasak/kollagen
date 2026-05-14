<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import type { ComponentProps, Snippet } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Trigger> & {
		children?: Snippet;
	};

	let { class: className, children, ...rest }: Props = $props();

	const triggerClass =
		'rounded-kl-field bg-kl-base-100 text-kl-base-content flex h-kl-field-md w-full cursor-pointer items-center justify-between gap-2 border px-3 text-sm transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 outline-none [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus:[--kl-input-border:var(--kl-primary)] focus:outline focus:outline-[var(--kl-input-border)] disabled:cursor-not-allowed disabled:opacity-50';
</script>

<SelectPrimitive.Trigger {...rest} class={cn(triggerClass, className as string | undefined)}>
	<span class="truncate text-left">
		{@render children?.()}
	</span>
	<ChevronDown size={16} class="text-kl-muted-content shrink-0 transition-transform duration-150" />
</SelectPrimitive.Trigger>
