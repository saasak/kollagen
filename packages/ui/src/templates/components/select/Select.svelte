<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import { selectVariants } from './Select.variants';
	import { Select } from 'bits-ui';
	import { untrack } from 'svelte';
	import { ChevronDown, X, Check } from 'lucide-svelte';

	interface SelectItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

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
		allowDeselect?: boolean;
		label?: string;

		// Events
		onValueChange?: (value: string | string[]) => void;
		onOpenChange?: (open: boolean) => void;

		class?: string;
	}

	let {
		items,
		itemToLabel = (item: T) => (item as any).label ?? String(item),
		itemToValue = (item: T) => (item as any).value ?? String(item),
		value = $bindable(),
		defaultValue,
		multiple = false,
		placeholder = 'Select...',
		name,
		disabled = false,
		allowDeselect = false,
		label,
		onValueChange,
		onOpenChange,
		class: className
	}: Props = $props();

	// Map generic items to bits-ui format
	const mappedItems: SelectItem[] = $derived(
		items.map((item) => ({
			value: itemToValue(item),
			label: itemToLabel(item),
			disabled: (item as any).disabled ?? false
		}))
	);

	// Build a lookup map for value -> label
	const labelMap = $derived(new Map(items.map((item) => [itemToValue(item), itemToLabel(item)])));

	// Initialize value from defaultValue if not set
	if (untrack(() => value) === undefined && untrack(() => defaultValue) !== undefined) {
		value = untrack(() => defaultValue)!;
	}

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		if (multiple) {
			value = [];
		} else {
			value = '';
		}
		onValueChange?.(value);
	}

	// Determine if there's a selection
	const hasValue = $derived(
		multiple ? Array.isArray(value) && value.length > 0 : typeof value === 'string' && value !== ''
	);

	// Display text for selected value(s)
	const displayText = $derived.by(() => {
		if (!hasValue) return '';
		if (multiple && Array.isArray(value)) {
			return value.map((v) => labelMap.get(v) ?? v).join(', ');
		}
		if (typeof value === 'string') {
			return labelMap.get(value) ?? value;
		}
		return '';
	});

	const classes = selectVariants();
</script>

{#if multiple}
	<Select.Root
		type="multiple"
		{disabled}
		{name}
		bind:value={value as string[]}
		{onValueChange}
		{onOpenChange}
	>
		{#if label}
			<span class="text-kl-base-content mb-1.5 block text-sm font-medium">
				{label}
			</span>
		{/if}

		<div class={cn(`relative w-full`, className as string | undefined)}>
			<div class={classes.fieldShell()}>
				<Select.Trigger class={classes.inlineTrigger()}>
					{#if displayText}
						<span class="truncate text-left">{displayText}</span>
					{:else}
						<span class="text-kl-muted-content truncate text-left">{placeholder}</span>
					{/if}
					<ChevronDown
						size={16}
						class="text-kl-muted-content shrink-0 transition-transform duration-150"
					/>
				</Select.Trigger>
				{#if hasValue}
					<button type="button" onclick={handleClear} class={classes.clear()}>
						<X size={16} />
					</button>
				{/if}
			</div>
		</div>

		<Select.Portal>
			<Select.Content side="bottom" align="start" sideOffset={4} class={classes.content()}>
				<Select.Viewport>
					{#if mappedItems.length === 0}
						<div class="text-kl-muted-content flex items-center justify-center p-3 text-sm">
							No options available
						</div>
					{:else}
						{#each mappedItems as item (item.value)}
							<Select.Item
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
							</Select.Item>
						{/each}
					{/if}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
{:else}
	<Select.Root
		type="single"
		{disabled}
		{name}
		{allowDeselect}
		bind:value={value as string}
		{onValueChange}
		{onOpenChange}
	>
		{#if label}
			<span class="text-kl-base-content mb-1.5 block text-sm font-medium">
				{label}
			</span>
		{/if}

		<div class={cn(`relative w-full`, className as string | undefined)}>
			<div class={classes.fieldShell()}>
				<Select.Trigger class={classes.inlineTrigger()}>
					{#if displayText}
						<span class="truncate text-left">{displayText}</span>
					{:else}
						<span class="text-kl-muted-content truncate text-left">{placeholder}</span>
					{/if}
					<ChevronDown
						size={16}
						class="text-kl-muted-content shrink-0 transition-transform duration-150"
					/>
				</Select.Trigger>
				{#if hasValue}
					<button type="button" onclick={handleClear} class={classes.clear()}>
						<X size={16} />
					</button>
				{/if}
			</div>
		</div>

		<Select.Portal>
			<Select.Content side="bottom" align="start" sideOffset={4} class={classes.content()}>
				<Select.Viewport>
					{#if mappedItems.length === 0}
						<div class="text-kl-muted-content flex items-center justify-center p-3 text-sm">
							No options available
						</div>
					{:else}
						{#each mappedItems as item (item.value)}
							<Select.Item
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
							</Select.Item>
						{/each}
					{/if}
				</Select.Viewport>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
{/if}
