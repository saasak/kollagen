<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		ToggleColor,
		ToggleContent,
		ToggleSize,
		ToggleVariant
	} from '../toggle/Toggle.svelte';

	export type ToggleGroupOrientation = 'horizontal' | 'vertical';

	export type ToggleGroupItem = {
		id?: string;
		value: string;
		disabled?: boolean;
		content?: ToggleContent;
		ariaLabel?: string;
		class?: string;
		children: Snippet;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { buttonVariants } from '../button/Button.variants';
	import { toggleVariants } from '../toggle/Toggle.variants';
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import { untrack } from 'svelte';
	import { toggleGroupVariants } from './ToggleGroup.variants';

	interface Props {
		items: ToggleGroupItem[];
		value?: string | string[];
		selected?: ToggleGroupItem | ToggleGroupItem[];
		multiple?: boolean;
		type?: 'single' | 'multiple';
		disabled?: boolean;
		loop?: boolean;
		rovingFocus?: boolean;
		orientation?: ToggleGroupOrientation;
		variant?: ToggleVariant;
		color?: ToggleColor;
		size?: ToggleSize;
		content?: ToggleContent;
		ariaLabel?: string;
		onValueChange?: (value: string | string[]) => void;
		class?: string;
	}

	let {
		items,
		value = $bindable(),
		selected = $bindable(),
		multiple,
		type = 'single',
		disabled = false,
		loop = true,
		rovingFocus = true,
		orientation = 'horizontal',
		variant = 'solid',
		color = 'base',
		size = 'md',
		content = 'normal',
		ariaLabel,
		onValueChange,
		class: className
	}: Props = $props();

	const isMultiple = $derived(multiple ?? type === 'multiple');
	const selectedControlsValue = untrack(() => selected) !== undefined;

	if (untrack(() => selected) !== undefined) {
		value = selectedToValue(untrack(() => selected));
	} else if (untrack(() => value) === undefined) {
		value = untrack(() => isMultiple) ? [] : '';
	}

	if (untrack(() => selected) === undefined && untrack(() => value) !== undefined) {
		selected = valueToSelected(untrack(() => value));
	}

	const selectedItems = $derived.by(() => {
		if (Array.isArray(selected)) return selected;
		return selected ? [selected] : [];
	});
	const itemMap = $derived(new Map([...items, ...selectedItems].map((item) => [item.value, item])));

	function valueToArray(nextValue: string | string[] | undefined): string[] {
		if (Array.isArray(nextValue)) return nextValue;
		if (typeof nextValue === 'string' && nextValue !== '') return [nextValue];
		return [];
	}

	function selectedToValue(selection: ToggleGroupItem | ToggleGroupItem[] | undefined) {
		if (isMultiple) {
			return Array.isArray(selection) ? selection.map((item) => item.value) : [];
		}
		if (Array.isArray(selection)) return selection[0]?.value ?? '';
		return selection?.value ?? '';
	}

	function valueToSelected(nextValue: string | string[] | undefined) {
		const values = valueToArray(nextValue);
		if (isMultiple) {
			return values
				.map((itemValue) => itemMap.get(itemValue))
				.filter((item): item is ToggleGroupItem => item !== undefined);
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
		if (!selectedMatchesValue) selected = nextSelected;
	});

	function handleValueChange(nextValue: string | string[]) {
		updateSelection(nextValue);
	}

	export function removeSelected(item: ToggleGroupItem) {
		if (isMultiple) {
			updateSelection(valueToArray(value).filter((currentValue) => currentValue !== item.value));
			return;
		}
		if (valueToArray(value)[0] === item.value) updateSelection('');
	}

	let rootClass = $derived(toggleGroupVariants({ orientation }));
</script>

{#snippet toggleItems()}
	{#each items as item (item.id ?? item.value)}
		<ToggleGroupPrimitive.Item
			value={item.value}
			disabled={item.disabled}
			aria-label={item.ariaLabel}
			class={cn(
				buttonVariants({
					variant,
					color,
					size,
					content: item.content ?? content
				}),
				toggleVariants({ color }),
				item.class
			)}
		>
			{@render item.children()}
		</ToggleGroupPrimitive.Item>
	{/each}
{/snippet}

{#if isMultiple}
	<ToggleGroupPrimitive.Root
		type="multiple"
		bind:value={value as string[]}
		{disabled}
		{loop}
		{rovingFocus}
		{orientation}
		aria-label={ariaLabel}
		onValueChange={handleValueChange}
		class={cn(rootClass, className)}
	>
		{@render toggleItems()}
	</ToggleGroupPrimitive.Root>
{:else}
	<ToggleGroupPrimitive.Root
		type="single"
		bind:value={value as string}
		{disabled}
		{loop}
		{rovingFocus}
		{orientation}
		aria-label={ariaLabel}
		onValueChange={handleValueChange}
		class={cn(rootClass, className)}
	>
		{@render toggleItems()}
	</ToggleGroupPrimitive.Root>
{/if}
