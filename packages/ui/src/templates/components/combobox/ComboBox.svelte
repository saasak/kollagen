<script lang="ts" generics="T extends Record<string, any>">
	import { Combobox } from 'bits-ui';
	import { untrack } from 'svelte';
	import { ChevronDown, X, Check, Loader2 } from 'lucide-svelte';

	interface Props {
		items: T[];
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		value?: string | string[];
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

	// Intentional initial-value capture — async/sync mode is a design-time decision
	const isAsync = !!untrack(() => onSearch);

	// --- Internal state ---
	let searchValue = $state('');
	let open = $state(false);

	// --- Async state ---
	let asyncItems = $state<T[]>([]);
	let asyncLoading = $state(false);
	let debounceTimer: ReturnType<typeof setTimeout> | undefined;

	// Cleanup debounce timer on component destroy
	$effect(() => {
		return () => {
			if (debounceTimer) clearTimeout(debounceTimer);
		};
	});

	// Initialize value from defaultValue if not set
	if (untrack(() => value) === undefined && untrack(() => defaultValue) !== undefined) {
		value = untrack(() => defaultValue)!;
	}

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
		if (multiple) {
			value = [];
		} else {
			value = '';
		}
		searchValue = '';
		if (isAsync) {
			asyncItems = [];
			asyncLoading = false;
		}
		onValueChange?.(value);
	}

	const hasValue = $derived(
		multiple ? Array.isArray(value) && value.length > 0 : typeof value === 'string' && value !== ''
	);
</script>

{#if multiple}
	<Combobox.Root
		type="multiple"
		{disabled}
		{name}
		bind:value={value as string[]}
		bind:open
		onOpenChange={handleOpenChange}
		{onValueChange}
	>
		<div class="relative w-full {className ?? ''}">
			<div
				class="border-kl-base-300 rounded-kl-field bg-kl-base-100 focus-within:border-kl-primary focus-within:outline-kl-primary flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1"
			>
				<Combobox.Input
					{placeholder}
					oninput={handleInput}
					class="text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none"
				/>
				<div class="flex items-center gap-0.5 pr-1.5">
					{#if hasValue}
						<button
							type="button"
							onclick={handleClear}
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<X size={16} />
						</button>
					{/if}
					<Combobox.Trigger
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
					>
						<ChevronDown size={16} />
					</Combobox.Trigger>
				</div>
			</div>
		</div>

		<Combobox.Portal>
			<Combobox.Content
				side="bottom"
				sideOffset={4}
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] max-h-60 overflow-y-auto border p-1"
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
							class="rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:text-kl-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150"
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
		{onValueChange}
	>
		<div class="relative w-full {className ?? ''}">
			<div
				class="border-kl-base-300 rounded-kl-field bg-kl-base-100 focus-within:border-kl-primary focus-within:outline-kl-primary flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1"
			>
				<Combobox.Input
					{placeholder}
					oninput={handleInput}
					class="text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none"
				/>
				<div class="flex items-center gap-0.5 pr-1.5">
					{#if hasValue}
						<button
							type="button"
							onclick={handleClear}
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<X size={16} />
						</button>
					{/if}
					<Combobox.Trigger
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
					>
						<ChevronDown size={16} />
					</Combobox.Trigger>
				</div>
			</div>
		</div>

		<Combobox.Portal>
			<Combobox.Content
				side="bottom"
				sideOffset={4}
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] max-h-60 overflow-y-auto border p-1"
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
							class="rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:text-kl-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150"
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
