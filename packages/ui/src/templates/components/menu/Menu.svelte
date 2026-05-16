<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { menuVariants } from './Menu.variants';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { DropdownMenu } from 'bits-ui';
	import { ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	type MenuItemDef = {
		label: string;
		value: string;
		disabled?: boolean;
	};

	type MenuSeparator = { type: 'separator' };

	type MenuGroupDef = {
		type: 'group';
		label: string;
		items?: MenuEntry[];
	};

	type MenuSubmenuDef = {
		type: 'submenu';
		label: string;
		disabled?: boolean;
		items: MenuEntry[];
	};

	type MenuEntry = MenuItemDef | MenuSeparator | MenuGroupDef | MenuSubmenuDef;

	interface Props {
		items: MenuEntry[];
		open?: boolean;
		disabled?: boolean;
		loop?: boolean;
		onSelect?: (value: string) => void;
		onOpenChange?: (open: boolean) => void;
		class?: string;
		children: Snippet;
	}

	let {
		items,
		open = $bindable(false),
		disabled = false,
		loop = false,
		onSelect,
		onOpenChange,
		class: className,
		children
	}: Props = $props();

	function isSeparator(entry: MenuEntry): entry is MenuSeparator {
		return 'type' in entry && entry.type === 'separator';
	}

	function isGroup(entry: MenuEntry): entry is MenuGroupDef {
		return 'type' in entry && entry.type === 'group';
	}

	function isSubmenu(entry: MenuEntry): entry is MenuSubmenuDef {
		return 'type' in entry && entry.type === 'submenu';
	}

	const classes = menuVariants();
</script>

{#snippet menuEntries(entries: MenuEntry[])}
	{#each entries as entry, i (i)}
		{#if isSeparator(entry)}
			<DropdownMenu.Separator class="bg-kl-base-300 my-1 h-px" />
		{:else if isGroup(entry)}
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading class="text-kl-muted-content px-3 py-1.5 text-xs font-semibold">
					{entry.label}
				</DropdownMenu.GroupHeading>
				{#if entry.items?.length}
					{@render menuEntries(entry.items)}
				{/if}
			</DropdownMenu.Group>
		{:else if isSubmenu(entry)}
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger disabled={entry.disabled} class={classes.item()}>
					<span class="flex-1">{entry.label}</span>
					<ChevronRight size={14} class="ml-4" />
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent sideOffset={6} class={classes.content()}>
					{@render menuEntries(entry.items)}
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		{:else}
			<DropdownMenu.Item
				disabled={entry.disabled}
				class={classes.item()}
				onSelect={() => onSelect?.(entry.value)}
			>
				{entry.label}
			</DropdownMenu.Item>
		{/if}
	{/each}
{/snippet}

<DropdownMenu.Root bind:open {onOpenChange}>
	<DropdownMenu.Trigger {disabled}>
		{#snippet child({ props })}
			<TriggerProvider {props}>
				{@render children()}
			</TriggerProvider>
		{/snippet}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{loop}
			sideOffset={4}
			class={cn(classes.content(), className as string | undefined)}
		>
			{@render menuEntries(items)}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
