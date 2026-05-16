<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { Tooltip } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		content: string;
		open?: boolean;
		delayDuration?: number;
		disabled?: boolean;
		side?: 'top' | 'bottom' | 'left' | 'right';
		sideOffset?: number;
		onOpenChange?: (open: boolean) => void;
		children: Snippet;
		class?: string;
	}

	let {
		content,
		open = $bindable(false),
		delayDuration = 400,
		disabled = false,
		side = 'top',
		sideOffset = 6,
		onOpenChange,
		children,
		class: className
	}: Props = $props();
</script>

{#if disabled}
	<TriggerProvider props={{ disabled: true }}>
		{@render children()}
	</TriggerProvider>
{:else}
	<Tooltip.Provider>
		<Tooltip.Root bind:open {delayDuration} {onOpenChange}>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<TriggerProvider {props}>
						{@render children()}
					</TriggerProvider>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content
				{side}
				{sideOffset}
				class={cn(
					`rounded-kl-box bg-kl-base-content text-kl-base-100 shadow-kl-sm z-[var(--kl-z-tooltip)] max-w-[min(16rem,calc(100vw-2rem))] px-3 py-1.5 text-left text-xs leading-snug break-words whitespace-normal`,
					className as string | undefined
				)}
			>
				{content}
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/if}
