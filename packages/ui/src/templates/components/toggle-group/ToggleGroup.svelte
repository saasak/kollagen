<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { toggleGroupVariants } from './ToggleGroup.variants';
	import { ToggleGroup as ToggleGroupPrimitive } from 'bits-ui';

	type ToggleGroupItem = {
		label: string;
		value: string;
		disabled?: boolean;
	};

	interface Props {
		items: ToggleGroupItem[];
		value?: string | string[];
		type?: 'single' | 'multiple';
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
		onValueChange?: (value: string | string[]) => void;
		class?: string;
	}

	let {
		items,
		value = $bindable(''),
		type = 'single',
		disabled = false,
		orientation = 'horizontal',
		onValueChange,
		class: className
	}: Props = $props();

	let classes = $derived(toggleGroupVariants({ orientation }));
</script>

{#if type === 'multiple'}
	<ToggleGroupPrimitive.Root
		type="multiple"
		bind:value={value as string[]}
		{disabled}
		{orientation}
		onValueChange={onValueChange as (value: string[]) => void}
		class={cn(classes.root(), className)}
	>
		{#each items as item (item.value)}
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
		{#each items as item (item.value)}
			<ToggleGroupPrimitive.Item value={item.value} disabled={item.disabled} class={classes.item()}>
				{item.label}
			</ToggleGroupPrimitive.Item>
		{/each}
	</ToggleGroupPrimitive.Root>
{/if}
