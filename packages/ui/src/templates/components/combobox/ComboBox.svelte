<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import { comboBoxVariants } from './ComboBox.variants';
	import { Combobox } from 'bits-ui';
	import { onDestroy, untrack } from 'svelte';
	import { ChevronDown, X, Check, Loader2 } from 'lucide-svelte';
	import type { Attachment } from 'svelte/attachments';

	interface Props {
		items: T[];
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		value?: string | string[];
		selected?: T | T[];
		defaultValue?: string | string[];
		multiple?: boolean;
		placeholder?: string;
		name?: string;
		disabled?: boolean;

		// Async
		onSearch?: (query: string) => Promise<T[]> | T[];
		debounceMs?: number;

		// Sync filtering
		filter?: 'contains' | 'startsWith' | ((itemLabel: string, input: string) => boolean);

		// Events
		onValueChange?: (value: string | string[]) => void;

		class?: string;
	}

	let {
		items,
		itemToLabel = (item: T) => (item as any).label ?? String(item),
		itemToValue = (item: T) => (item as any).value ?? String(item),
		value = $bindable(),
		selected = $bindable(),
		defaultValue,
		multiple = false,
		placeholder = '',
		name,
		disabled = false,
		onSearch,
		debounceMs = 300,
		filter: filterMode = 'contains',
		onValueChange,
		class: className
	}: Props = $props();

	const selectedControlsValue = untrack(() => selected) !== undefined;

	// Intentional initial-value capture — async/sync mode is a design-time decision
	const isAsync = !!untrack(() => onSearch);

	// --- Internal state ---
	let searchValue = $state('');
	let open = $state(false);
	let anchor = $state<HTMLDivElement | null>(null);

	// --- Async state ---
	let asyncItems = $state<T[]>([]);
	let asyncLoading = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	onDestroy(() => {
		if (debounceTimer) clearTimeout(debounceTimer);
	});

	const setAnchor: Attachment<HTMLDivElement> = (node) => {
		anchor = node;
		return () => {
			if (anchor === node) anchor = null;
		};
	};

	// --- Sync filtering ---
	function matchesFilter(itemLabel: string, input: string): boolean {
		if (!input) return true;
		const normalizedLabel = itemLabel.toLowerCase();
		const normalizedInput = input.toLowerCase();
		if (typeof filterMode === 'function') return filterMode(itemLabel, input);
		if (filterMode === 'startsWith') return normalizedLabel.startsWith(normalizedInput);
		return normalizedLabel.includes(normalizedInput);
	}

	// Items to display: async results or filtered sync items
	const displayItems = $derived.by(() => {
		if (isAsync) return asyncItems;
		if (!searchValue) return items;
		return items.filter((item) => matchesFilter(itemToLabel(item), searchValue));
	});

	// Map to bits-ui format
	const mappedItems = $derived(
		displayItems.map((item) => ({
			value: itemToValue(item),
			label: itemToLabel(item),
			disabled: (item as any).disabled ?? false
		}))
	);
	const selectedItems = $derived.by(() => {
		if (Array.isArray(selected)) return selected;
		return selected ? [selected] : [];
	});
	const candidateItems = $derived(
		isAsync ? [...items, ...asyncItems, ...selectedItems] : [...items, ...selectedItems]
	);
	const itemMap = $derived(new Map(candidateItems.map((item) => [itemToValue(item), item])));

	if (untrack(() => selected) !== undefined) {
		value = selectedToValue(untrack(() => selected));
	} else if (untrack(() => value) === undefined && untrack(() => defaultValue) !== undefined) {
		value = untrack(() => defaultValue)!;
	}

	if (untrack(() => selected) === undefined && untrack(() => value) !== undefined) {
		selected = valueToSelected(untrack(() => value));
	}

	// Handle input changes for filtering/searching
	function handleInput(e: Event) {
		const input = (e.currentTarget as HTMLInputElement).value;
		searchValue = input;

		if (isAsync) {
			clearTimeout(debounceTimer);
			if (!input.trim()) {
				asyncItems = [];
				asyncLoading = false;
				return;
			}
			asyncLoading = true;
			debounceTimer = setTimeout(async () => {
				try {
					const result = await onSearch!(input);
					asyncItems = result;
				} catch {
					asyncItems = [];
				} finally {
					asyncLoading = false;
				}
			}, debounceMs);
		}
	}

	function handleOpenChange(newOpen: boolean) {
		open = newOpen;
		if (!newOpen) {
			searchValue = '';
			if (isAsync) {
				asyncItems = [];
				asyncLoading = false;
				clearTimeout(debounceTimer);
			}
		}
	}

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		updateSelection(multiple ? [] : '');
		searchValue = '';
		if (isAsync) {
			asyncItems = [];
			asyncLoading = false;
		}
	}

	function valueToArray(nextValue: string | string[] | undefined): string[] {
		if (Array.isArray(nextValue)) return nextValue;
		if (typeof nextValue === 'string' && nextValue !== '') return [nextValue];
		return [];
	}

	function selectedToValue(selection: T | T[] | undefined): string | string[] {
		if (multiple) {
			return Array.isArray(selection) ? selection.map((item) => itemToValue(item)) : [];
		}
		if (Array.isArray(selection)) return selection[0] ? itemToValue(selection[0]) : '';
		return selection ? itemToValue(selection) : '';
	}

	function valueToSelected(nextValue: string | string[] | undefined): T | T[] | undefined {
		const values = valueToArray(nextValue);
		if (multiple) {
			return values
				.map((itemValue) => itemMap.get(itemValue))
				.filter((item): item is T => item !== undefined);
		}
		return values[0] ? itemMap.get(values[0]) : undefined;
	}

	function updateSelection(nextValue: string | string[]) {
		value = nextValue;
		selected = valueToSelected(nextValue);
		onValueChange?.(nextValue);
	}

	const selectedValue = $derived.by(() => selectedToValue(selected));
	const currentValues = $derived.by(() => valueToArray(value));
	const selectedValues = $derived.by(() => valueToArray(selectedValue));
	const selectedMatchesValue = $derived(
		currentValues.length === selectedValues.length &&
			currentValues.every((itemValue, index) => itemValue === selectedValues[index])
	);
	const nextSelected = $derived.by(() => valueToSelected(value));

	$effect(() => {
		if (selected === undefined) return;
		if (!selectedMatchesValue) value = selectedValue;
	});

	$effect(() => {
		if (selectedControlsValue) return;
		if (!selectedMatchesValue) {
			selected = nextSelected;
		}
	});

	function handleValueChange(nextValue: string | string[]) {
		updateSelection(nextValue);
	}

	export function removeSelected(item: T) {
		const itemValue = itemToValue(item);
		if (multiple) {
			updateSelection(valueToArray(value).filter((currentValue) => currentValue !== itemValue));
			return;
		}
		if (valueToArray(value)[0] === itemValue) updateSelection('');
	}

	const hasValue = $derived(
		multiple ? Array.isArray(value) && value.length > 0 : typeof value === 'string' && value !== ''
	);

	const classes = comboBoxVariants();
</script>

{#if multiple}
	<Combobox.Root
		type="multiple"
		{disabled}
		{name}
		bind:value={value as string[]}
		bind:open
		onOpenChange={handleOpenChange}
		onValueChange={handleValueChange}
	>
		<div class={cn(`relative w-full`, className)}>
			<div {@attach setAnchor} class={classes.fieldShell()}>
				<Combobox.Input {placeholder} oninput={handleInput} class={classes.input()} />
				<div class="flex items-center gap-0.5 pr-1.5">
					{#if hasValue}
						<button type="button" onclick={handleClear} class={classes.iconButton()}>
							<X size={16} />
						</button>
					{/if}
					<Combobox.Trigger class={classes.iconButton()}>
						<ChevronDown size={16} />
					</Combobox.Trigger>
				</div>
			</div>
		</div>

		<Combobox.Portal>
			<Combobox.Content
				side="bottom"
				align="start"
				sideOffset={4}
				customAnchor={anchor}
				class={classes.content()}
			>
				{#if isAsync && asyncLoading}
					<div class="text-kl-muted-content flex items-center justify-center gap-2 p-3 text-sm">
						<Loader2 size={16} class="animate-spin" />
						<span>Searching...</span>
					</div>
				{:else if mappedItems.length === 0}
					<div class="text-kl-muted-content flex items-center justify-center gap-2 p-3 text-sm">
						No results found
					</div>
				{:else}
					{#each mappedItems as item (item.value)}
						<Combobox.Item
							value={item.value}
							label={item.label}
							disabled={item.disabled}
							class={classes.item()}
						>
							{#snippet children({ selected })}
								<span>{item.label}</span>
								{#if selected}
									<span class="text-kl-primary flex items-center">
										<Check size={14} />
									</span>
								{/if}
							{/snippet}
						</Combobox.Item>
					{/each}
				{/if}
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
{:else}
	<Combobox.Root
		type="single"
		{disabled}
		{name}
		bind:value={value as string}
		bind:open
		onOpenChange={handleOpenChange}
		onValueChange={handleValueChange}
	>
		<div class={cn(`relative w-full`, className)}>
			<div {@attach setAnchor} class={classes.fieldShell()}>
				<Combobox.Input {placeholder} oninput={handleInput} class={classes.input()} />
				<div class="flex items-center gap-0.5 pr-1.5">
					{#if hasValue}
						<button type="button" onclick={handleClear} class={classes.iconButton()}>
							<X size={16} />
						</button>
					{/if}
					<Combobox.Trigger class={classes.iconButton()}>
						<ChevronDown size={16} />
					</Combobox.Trigger>
				</div>
			</div>
		</div>

		<Combobox.Portal>
			<Combobox.Content
				side="bottom"
				align="start"
				sideOffset={4}
				customAnchor={anchor}
				class={classes.content()}
			>
				{#if isAsync && asyncLoading}
					<div class="text-kl-muted-content flex items-center justify-center gap-2 p-3 text-sm">
						<Loader2 size={16} class="animate-spin" />
						<span>Searching...</span>
					</div>
				{:else if mappedItems.length === 0}
					<div class="text-kl-muted-content flex items-center justify-center gap-2 p-3 text-sm">
						No results found
					</div>
				{:else}
					{#each mappedItems as item (item.value)}
						<Combobox.Item
							value={item.value}
							label={item.label}
							disabled={item.disabled}
							class={classes.item()}
						>
							{#snippet children({ selected })}
								<span>{item.label}</span>
								{#if selected}
									<span class="text-kl-primary flex items-center">
										<Check size={14} />
									</span>
								{/if}
							{/snippet}
						</Combobox.Item>
					{/each}
				{/if}
			</Combobox.Content>
		</Combobox.Portal>
	</Combobox.Root>
{/if}
