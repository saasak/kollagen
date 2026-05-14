<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		prefix?: Snippet;
		suffix?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let { prefix, suffix, children, class: className }: Props = $props();
</script>

<div
	class={cn(
		'rounded-kl-field bg-kl-base-100 min-h-kl-field-md flex items-stretch overflow-hidden border [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] focus-within:outline focus-within:outline-[var(--kl-input-border)] focus-within:[--kl-input-border:var(--kl-primary)] [&_input]:border-0 [&_input]:shadow-none [&_input]:outline-none [&_textarea]:border-0 [&_textarea]:shadow-none [&_textarea]:outline-none',
		className
	)}
>
	{#if prefix}
		<div
			class="bg-kl-base-200 text-kl-muted-content border-kl-base-300 flex items-center border-r px-3 text-sm"
		>
			{@render prefix()}
		</div>
	{/if}
	<div class="min-w-0 flex-1">{@render children?.()}</div>
	{#if suffix}
		<div
			class="bg-kl-base-200 text-kl-muted-content border-kl-base-300 flex items-center border-l px-3 text-sm"
		>
			{@render suffix()}
		</div>
	{/if}
</div>
