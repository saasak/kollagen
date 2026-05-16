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

	if (untrack(() => value) === undefined) {
		value = untrack(() => isMultiple) ? [] : '';
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
		onValueChange={onValueChange as (value: string[]) => void}
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
		onValueChange={onValueChange as (value: string) => void}
		class={cn(rootClass, className)}
	>
		{@render toggleItems()}
	</ToggleGroupPrimitive.Root>
{/if}
