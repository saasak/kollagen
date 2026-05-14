<script module lang="ts">
	export type AlertColor = import('./Alert.variants').AlertColor;
	export type AlertVariant = import('./Alert.variants').AlertVariant;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { alertVariants } from './Alert.variants';
	import type { Snippet } from 'svelte';

	interface Props {
		variant?: AlertVariant;
		color?: AlertColor;
		title?: string;
		role?: 'alert' | 'status' | 'note';
		icon?: Snippet;
		children?: Snippet;
		class?: string;
	}

	let {
		variant = 'soft',
		color = 'base',
		title,
		role = 'status',
		icon,
		children,
		class: className
	}: Props = $props();

	let rootClass = $derived(alertVariants({ variant, color, withIcon: Boolean(icon) }));
</script>

<div {role} class={cn(rootClass, className)}>
	{#if icon}
		<div
			class="grid size-8 place-items-center self-center text-[var(--kl-alert-icon)] [&_svg]:size-6"
		>
			{@render icon()}
		</div>
	{/if}
	<div class="min-w-0 space-y-1">
		{#if title}
			<div class="font-medium">{title}</div>
		{/if}
		{#if children}
			<div class="leading-relaxed text-[var(--kl-alert-fg)] opacity-75">
				{@render children()}
			</div>
		{/if}
	</div>
</div>
