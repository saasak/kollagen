<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ContextMenu as ContextMenuPrimitive } from 'bits-ui';
	import { ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type ContextMenuItem = {
		label: string;
		value: string;
		disabled?: boolean;
	};
	type ContextMenuSeparator = { type: 'separator' };
	type ContextMenuSubmenu = {
		type: 'submenu';
		label: string;
		disabled?: boolean;
		items: ContextMenuEntry[];
	};
	type ContextMenuEntry = ContextMenuItem | ContextMenuSeparator | ContextMenuSubmenu;

	interface Props {
		items: ContextMenuEntry[];
		onSelect?: (value: string) => void;
		children?: Snippet;
		class?: string;
	}

	let { items, onSelect, children, class: className }: Props = $props();

	function isSeparator(entry: ContextMenuEntry): entry is ContextMenuSeparator {
		return 'type' in entry && entry.type === 'separator';
	}

	function isSubmenu(entry: ContextMenuEntry): entry is ContextMenuSubmenu {
		return 'type' in entry && entry.type === 'submenu';
	}

	const itemClass =
		'flex cursor-pointer items-center rounded-kl-selector px-3 py-2 text-sm text-kl-base-content transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-kl-base-200';
	const contentClass =
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-40 border p-1 outline-none';
</script>

{#snippet menuEntries(entries: ContextMenuEntry[])}
	{#each entries as entry, i (i)}
		{#if isSeparator(entry)}
			<ContextMenuPrimitive.Separator class="bg-kl-base-300 my-1 h-px" />
		{:else if isSubmenu(entry)}
			<ContextMenuPrimitive.Sub>
				<ContextMenuPrimitive.SubTrigger disabled={entry.disabled} class={itemClass}>
					<span class="flex-1">{entry.label}</span>
					<ChevronRight size={14} class="ml-4" />
				</ContextMenuPrimitive.SubTrigger>
				<ContextMenuPrimitive.SubContent sideOffset={6} class={contentClass}>
					{@render menuEntries(entry.items)}
				</ContextMenuPrimitive.SubContent>
			</ContextMenuPrimitive.Sub>
		{:else}
			<ContextMenuPrimitive.Item
				disabled={entry.disabled}
				class={itemClass}
				onSelect={() => onSelect?.(entry.value)}
			>
				{entry.label}
			</ContextMenuPrimitive.Item>
		{/if}
	{/each}
{/snippet}

<ContextMenuPrimitive.Root>
	<ContextMenuPrimitive.Trigger class={cn('block', className)}>
		{@render children?.()}
	</ContextMenuPrimitive.Trigger>
	<ContextMenuPrimitive.Portal>
		<ContextMenuPrimitive.Content class={contentClass}>
			{@render menuEntries(items)}
		</ContextMenuPrimitive.Content>
	</ContextMenuPrimitive.Portal>
</ContextMenuPrimitive.Root>
