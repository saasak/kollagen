<script lang="ts" generics="T">
	import { cn } from '$lib/utils/cn';
	import { toggleGroupVariants } from './ToggleGroup.variants';
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';
	import { untrack } from 'svelte';

	interface Props {
		items: T[];
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		value?: string | string[];
		multiple?: boolean;
		type?: 'single' | 'multiple';
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
		onValueChange?: (value: string | string[]) => void;
		class?: string;
	}

	let {
		items,
		itemToLabel = (item: T) => (item as any).label ?? String(item),
		itemToValue = (item: T) => (item as any).value ?? String(item),
		value = $bindable(),
		multiple,
		type = 'single',
		disabled = false,
		orientation = 'horizontal',
		onValueChange,
		class: className
	}: Props = $props();

	const isMultiple = $derived(multiple ?? type === 'multiple');
	const mappedItems = $derived(
		items.map((item) => ({
			value: itemToValue(item),
			label: itemToLabel(item),
			disabled: (item as any).disabled ?? false
		}))
	);

	if (untrack(() => value) === undefined) {
		value = untrack(() => isMultiple) ? [] : '';
	}

	let classes = $derived(toggleGroupVariants({ orientation }));
</script>

{#if isMultiple}
	<ToggleGroupPrimitive.Root
		type="multiple"
		bind:value={value as string[]}
		{disabled}
		{orientation}
		onValueChange={onValueChange as (value: string[]) => void}
		class={cn(classes.root(), className)}
	>
		{#each mappedItems as item (item.value)}
			<ToggleGroupPrimitive.Item value={item.value} disabled={item.disabled} class={classes.item()}>
				{item.label}
			</ToggleGroupPrimitive.Item>
		{/each}
	</ToggleGroupPrimitive.Root>
{:else}
	<ToggleGroupPrimitive.Root
		type="single"
		bind:value={value as string}
		{disabled}
		{orientation}
		onValueChange={onValueChange as (value: string) => void}
		class={cn(classes.root(), className)}
	>
		{#each mappedItems as item (item.value)}
			<ToggleGroupPrimitive.Item value={item.value} disabled={item.disabled} class={classes.item()}>
				{item.label}
			</ToggleGroupPrimitive.Item>
		{/each}
	</ToggleGroupPrimitive.Root>
{/if}
