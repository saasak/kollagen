<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
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
		items: MenuItemDef[];
	};

	type MenuEntry = MenuItemDef | MenuSeparator | MenuGroupDef;

	interface Props {
		items: MenuEntry[];
		open?: boolean;
		disabled?: boolean;
		loop?: boolean;
		onSelect?: (value: string) => void;
		onOpenChange?: (open: boolean) => void;
		trigger: Snippet;
		class?: string;
	}

	let {
		items,
		open = $bindable(false),
		disabled = false,
		loop = false,
		onSelect,
		onOpenChange,
		trigger,
		class: className
	}: Props = $props();

	function isSeparator(entry: MenuEntry): entry is MenuSeparator {
		return 'type' in entry && entry.type === 'separator';
	}

	function isGroup(entry: MenuEntry): entry is MenuGroupDef {
		return 'type' in entry && entry.type === 'group';
	}

	const itemClass =
		'flex cursor-pointer items-center rounded-kl-selector px-3 py-2 text-sm text-kl-base-content transition-colors duration-150 data-[highlighted]:bg-kl-base-200 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 outline-none';
</script>

<DropdownMenu.Root bind:open {onOpenChange}>
	<DropdownMenu.Trigger
		{disabled}
		class="inline-flex cursor-pointer items-center disabled:cursor-not-allowed disabled:opacity-50"
	>
		{@render trigger()}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{loop}
			sideOffset={4}
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-[8rem] border p-1 outline-none {className ??
				''}"
		>
			{#each items as entry, i (i)}
				{#if isSeparator(entry)}
					<DropdownMenu.Separator class="bg-kl-base-300 my-1 h-px" />
				{:else if isGroup(entry)}
					<DropdownMenu.Group>
						<DropdownMenu.GroupHeading
							class="text-kl-muted-content px-3 py-1.5 text-xs font-semibold"
						>
							{entry.label}
						</DropdownMenu.GroupHeading>
						{#each entry.items as item (item.value)}
							<DropdownMenu.Item
								disabled={item.disabled}
								class={itemClass}
								onSelect={() => onSelect?.(item.value)}
							>
								{item.label}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Group>
				{:else}
					<DropdownMenu.Item
						disabled={entry.disabled}
						class={itemClass}
						onSelect={() => onSelect?.(entry.value)}
					>
						{entry.label}
					</DropdownMenu.Item>
				{/if}
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
