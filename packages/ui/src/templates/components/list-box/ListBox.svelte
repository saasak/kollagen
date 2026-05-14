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

	let open = $state(true);

	const mappedItems = $derived(
		items.map((item) => ({
			value: itemToValue(item),
			label: itemToLabel(item),
			disabled: (item as any).disabled ?? false
		}))
	);

	if (untrack(() => value) === undefined) {
		value = untrack(() => defaultValue) ?? (untrack(() => multiple) ? [] : '');
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
			onValueChange={onValueChange as (value: string[]) => void}
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
			onValueChange={onValueChange as (value: string) => void}
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
