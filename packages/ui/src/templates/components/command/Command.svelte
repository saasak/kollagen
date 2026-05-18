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
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import { page } from '$app/state';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { Command as CommandPrimitive, Dialog } from 'bits-ui';
	import { Search } from 'lucide-svelte';
	import { untrack, type Snippet } from 'svelte';

	type PageState = Parameters<typeof pushState>[1];
	const commandId = $props.id();

	interface Props {
		items: CommandItem[];
		open?: boolean;
		value?: string;
		selected?: CommandItem;
		search?: string;
		placeholder?: string;
		emptyText?: string;
		label?: string;
		loop?: boolean;
		shortcut?: boolean;
		shallowRouting?: boolean;
		shallowStateKey?: string;
		disabled?: boolean;
		preventScroll?: boolean;
		onSelect?: (value: string) => void;
		onValueChange?: (value: string) => void;
		onOpenChange?: (open: boolean) => void;
		children?: Snippet;
		class?: string;
	}

	let {
		items,
		open = $bindable(false),
		value = $bindable(''),
		selected = $bindable(),
		search = $bindable(''),
		placeholder = 'Search commands...',
		emptyText = 'No results found.',
		label = 'Command menu',
		loop = true,
		shortcut = true,
		shallowRouting = true,
		shallowStateKey = `command-${commandId}`,
		disabled = false,
		preventScroll = true,
		onSelect,
		onValueChange,
		onOpenChange,
		children,
		class: className
	}: Props = $props();

	const selectedControlsValue = untrack(() => selected) !== undefined;
	const selectedItems = $derived(selected ? [selected] : []);
	const itemMap = $derived(new Map([...items, ...selectedItems].map((item) => [item.value, item])));
	const shallowPageState = $derived(page.state as Record<string, unknown>);
	const shallowStateOpen = $derived(Boolean(shallowPageState[shallowStateKey]));
	const shallowRuntime = {
		entryActive: false
	};

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
		if (item.disabled) return;
		value = item.value;
		selected = item;
		setOpen(false);
		onSelect?.(item.value);
	}

	function setOpen(nextOpen: boolean) {
		if (open === nextOpen) return;
		open = nextOpen;
		onOpenChange?.(nextOpen);
		syncShallowHistory(nextOpen);
	}

	function handleOpenChange(nextOpen: boolean) {
		open = nextOpen;
		onOpenChange?.(nextOpen);
		syncShallowHistory(nextOpen);
	}

	function handlePopState() {
		if (!shallowRouting || !browser) return;

		queueMicrotask(() => {
			const nextOpen = Boolean((page.state as Record<string, unknown>)[shallowStateKey]);
			shallowRuntime.entryActive = nextOpen;
			if (open === nextOpen) return;

			open = nextOpen;
			onOpenChange?.(nextOpen);
		});
	}

	function handleShortcut(event: KeyboardEvent) {
		if (!shortcut || disabled) return;
		if (!(event.metaKey || event.ctrlKey) || event.key.toLowerCase() !== 'k') return;

		event.preventDefault();
		setOpen(true);
	}

	function syncShallowHistory(nextOpen: boolean) {
		if (!shallowRouting || !browser) return;

		if (nextOpen) {
			if (shallowStateOpen || shallowRuntime.entryActive) return;
			pushState('', { ...shallowPageState, [shallowStateKey]: true } as PageState);
			shallowRuntime.entryActive = true;
			return;
		}

		if (!shallowStateOpen && !shallowRuntime.entryActive) return;
		shallowRuntime.entryActive = false;
		history.back();
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

<svelte:window onkeydown={handleShortcut} onpopstate={handlePopState} />

<Dialog.Root bind:open onOpenChange={handleOpenChange}>
	{#if children}
		<Dialog.Trigger {disabled}>
			{#snippet child({ props })}
				<TriggerProvider {props}>
					{@render children()}
				</TriggerProvider>
			{/snippet}
		</Dialog.Trigger>
	{/if}

	<Dialog.Portal>
		<Dialog.Overlay
			class="bg-kl-neutral/50 fixed inset-0 z-[var(--kl-z-overlay)] backdrop-blur-sm"
		/>
		<Dialog.Content
			{preventScroll}
			interactOutsideBehavior="close"
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-lg fixed top-1/2 left-1/2 z-[var(--kl-z-modal)] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden border p-0"
		>
			<Dialog.Title class="sr-only">{label}</Dialog.Title>
			<CommandPrimitive.Root
				{label}
				{loop}
				bind:value
				onValueChange={handleValueChange}
				class={cn('bg-kl-base-100 w-full overflow-hidden', className)}
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
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
