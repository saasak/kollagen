<script module lang="ts">
	export type CommandItem = {
		label: string;
		value: string;
		keywords?: string[];
		disabled?: boolean;
		group?: string;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Command as CommandPrimitive } from 'bits-ui';
	import { Search } from 'lucide-svelte';
	import { untrack } from 'svelte';

	interface Props {
		items: CommandItem[];
		value?: string;
		selected?: CommandItem;
		search?: string;
		placeholder?: string;
		emptyText?: string;
		label?: string;
		loop?: boolean;
		onSelect?: (value: string) => void;
		onValueChange?: (value: string) => void;
		class?: string;
	}

	let {
		items,
		value = $bindable(''),
		selected = $bindable(),
		search = $bindable(''),
		placeholder = 'Search commands...',
		emptyText = 'No results found.',
		label = 'Command menu',
		loop = true,
		onSelect,
		onValueChange,
		class: className
	}: Props = $props();

	const selectedControlsValue = untrack(() => selected) !== undefined;
	const selectedItems = $derived(selected ? [selected] : []);
	const itemMap = $derived(new Map([...items, ...selectedItems].map((item) => [item.value, item])));

	if (untrack(() => selected) !== undefined) {
		value = selectedToValue(untrack(() => selected));
	} else {
		selected = valueToSelected(untrack(() => value));
	}

	function selectedToValue(selection: CommandItem | undefined) {
		return selection?.value ?? '';
	}

	function valueToSelected(nextValue: string | undefined) {
		return nextValue ? itemMap.get(nextValue) : undefined;
	}

	function updateSelection(nextValue: string) {
		value = nextValue;
		selected = valueToSelected(nextValue);
		onValueChange?.(nextValue);
	}

	const selectedValue = $derived(selectedToValue(selected));
	const selectedMatchesValue = $derived(value === selectedValue);
	const nextSelected = $derived(valueToSelected(value));

	$effect(() => {
		if (selected === undefined) return;
		if (!selectedMatchesValue) value = selectedValue;
	});

	$effect(() => {
		if (selectedControlsValue) return;
		if (!selectedMatchesValue) selected = nextSelected;
	});

	function handleValueChange(nextValue: string) {
		updateSelection(nextValue);
	}

	function handleSelect(item: CommandItem) {
		value = item.value;
		selected = item;
		onSelect?.(item.value);
	}

	export function clearSelected() {
		updateSelection('');
	}

	const groupedItems = $derived.by(() => {
		const groups: Array<[string, CommandItem[]]> = [];
		for (const item of items) {
			const key = item.group ?? 'Commands';
			const group = groups.find(([label]) => label === key);
			if (group) {
				group[1] = [...group[1], item];
			} else {
				groups.push([key, [item]]);
			}
		}
		return groups;
	});
</script>

<CommandPrimitive.Root
	{label}
	{loop}
	bind:value
	onValueChange={handleValueChange}
	class={cn(
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md overflow-hidden border',
		className
	)}
>
	<div class="border-kl-base-300 h-kl-field-md flex items-center gap-2 border-b px-3">
		<Search size={16} class="text-kl-muted-content shrink-0" />
		<CommandPrimitive.Input
			bind:value={search}
			{placeholder}
			class="placeholder:text-kl-muted-content text-kl-base-content h-full flex-1 border-none bg-transparent text-sm outline-none"
		/>
	</div>
	<CommandPrimitive.List class="max-h-72 overflow-y-auto p-1">
		<CommandPrimitive.Empty class="text-kl-muted-content p-4 text-center text-sm">
			{emptyText}
		</CommandPrimitive.Empty>
		{#each groupedItems as [group, groupItems] (group)}
			<CommandPrimitive.Group value={group} class="py-1">
				<CommandPrimitive.GroupHeading
					class="text-kl-muted-content px-2 py-1.5 text-xs font-semibold"
				>
					{group}
				</CommandPrimitive.GroupHeading>
				<CommandPrimitive.GroupItems>
					{#each groupItems as item (item.value)}
						<CommandPrimitive.Item
							value={item.value}
							keywords={item.keywords}
							disabled={item.disabled}
							onSelect={() => handleSelect(item)}
							class="rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:bg-kl-base-200 flex cursor-pointer items-center px-2 py-2 text-sm outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
						>
							{item.label}
						</CommandPrimitive.Item>
					{/each}
				</CommandPrimitive.GroupItems>
			</CommandPrimitive.Group>
		{/each}
	</CommandPrimitive.List>
</CommandPrimitive.Root>
