<script lang="ts" generics="T">
	import { cn } from '$lib/utils/cn';
	import { listBoxVariants } from './ListBox.variants';
	import { Select } from 'bits-ui';
	import { Check } from 'lucide-svelte';
	import { untrack } from 'svelte';

	interface Props {
		items: T[];
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		value?: string | string[];
		selected?: T | T[];
		defaultValue?: string | string[];
		multiple?: boolean;
		label?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		orientation?: 'horizontal' | 'vertical';
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
		label,
		name,
		disabled = false,
		required = false,
		orientation = 'vertical',
		onValueChange,
		class: className
	}: Props = $props();

	const selectedControlsValue = untrack(() => selected) !== undefined;
	let open = $state(true);

	const mappedItems = $derived(
		items.map((item) => ({
			value: itemToValue(item),
			label: itemToLabel(item),
			disabled: (item as any).disabled ?? false
		}))
	);
	const selectedItems = $derived.by(() => {
		if (Array.isArray(selected)) return selected;
		return selected ? [selected] : [];
	});
	const itemMap = $derived(
		new Map([...items, ...selectedItems].map((item) => [itemToValue(item), item]))
	);

	if (untrack(() => selected) !== undefined) {
		value = selectedToValue(untrack(() => selected));
	} else if (untrack(() => value) === undefined) {
		value = untrack(() => defaultValue) ?? (untrack(() => multiple) ? [] : '');
	}

	if (untrack(() => selected) === undefined && untrack(() => value) !== undefined) {
		selected = valueToSelected(untrack(() => value));
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

	function keepOpen() {
		open = true;
	}

	let contentStyle = $derived(
		`position: static; transform: none; flex-direction: ${orientation === 'horizontal' ? 'row' : 'column'};`
	);
	let classes = $derived(listBoxVariants({ disabled }));
</script>

<div class={cn(classes.root(), className)}>
	{#if label}
		<span class={classes.label()}>{label}</span>
	{/if}

	{#if multiple}
		<Select.Root
			type="multiple"
			{disabled}
			{required}
			{name}
			items={mappedItems}
			bind:value={value as string[]}
			bind:open
			onOpenChange={keepOpen}
			onValueChange={handleValueChange}
		>
			<Select.ContentStatic
				forceMount
				aria-orientation={orientation}
				class={classes.content()}
				style={contentStyle}
			>
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
									<span class={classes.check()}>
										<Check size={14} />
									</span>
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				{/if}
			</Select.ContentStatic>
		</Select.Root>
	{:else}
		<Select.Root
			type="single"
			{disabled}
			{required}
			{name}
			items={mappedItems}
			bind:value={value as string}
			bind:open
			onOpenChange={keepOpen}
			onValueChange={handleValueChange}
		>
			<Select.ContentStatic
				forceMount
				aria-orientation={orientation}
				class={classes.content()}
				style={contentStyle}
			>
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
									<span class={classes.check()}>
										<Check size={14} />
									</span>
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				{/if}
			</Select.ContentStatic>
		</Select.Root>
	{/if}
</div>
