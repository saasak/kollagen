<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const itemClass =
		'rounded-kl-selector text-kl-base-content data-[state=on]:bg-kl-primary data-[state=on]:text-kl-primary-content hover:bg-kl-base-200 h-kl-field-sm cursor-pointer px-3 text-sm font-medium outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';
</script>

{#if type === 'multiple'}
	<ToggleGroupPrimitive.Root
		type="multiple"
		bind:value={value as string[]}
		{disabled}
		{orientation}
		onValueChange={onValueChange as (value: string[]) => void}
		class={cn(
			'rounded-kl-field border-kl-base-300 bg-kl-base-100 inline-flex items-center gap-1 border p-1',
			orientation === 'vertical' && 'flex-col',
			className
		)}
	>
		{#each items as item (item.value)}
			<ToggleGroupPrimitive.Item value={item.value} disabled={item.disabled} class={itemClass}>
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
		class={cn(
			'rounded-kl-field border-kl-base-300 bg-kl-base-100 inline-flex items-center gap-1 border p-1',
			orientation === 'vertical' && 'flex-col',
			className
		)}
	>
		{#each items as item (item.value)}
			<ToggleGroupPrimitive.Item value={item.value} disabled={item.disabled} class={itemClass}>
				{item.label}
			</ToggleGroupPrimitive.Item>
		{/each}
	</ToggleGroupPrimitive.Root>
{/if}
