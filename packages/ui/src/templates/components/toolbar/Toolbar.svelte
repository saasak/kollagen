<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		ButtonColor,
		ButtonContent,
		ButtonSize,
		ButtonVariant
	} from '../button/Button.variants';

	export type ToolbarOrientation = import('./Toolbar.variants').ToolbarOrientation;

	type ToolbarBaseItem = {
		id?: string;
		content?: ButtonContent;
		disabled?: boolean;
		ariaLabel?: string;
		class?: string;
		children: Snippet;
	};

	export type ToolbarButtonItem = ToolbarBaseItem & {
		type: 'button';
		onclick?: (event: MouseEvent) => void;
	};

	export type ToolbarLinkItem = ToolbarBaseItem & {
		type: 'link';
		href: string;
		target?: string;
		rel?: string;
	};

	export type ToolbarGroupItem = ToolbarBaseItem & {
		value: string;
	};

	export type ToolbarGroup = Omit<ToolbarBaseItem, 'children' | 'content'> & {
		type: 'group';
		items: ToolbarGroupItem[];
		value?: string | string[];
		multiple?: boolean;
		groupType?: 'single' | 'multiple';
		disabled?: boolean;
		onValueChange?: (value: string | string[]) => void;
	};

	export type ToolbarItem = ToolbarButtonItem | ToolbarLinkItem | ToolbarGroup;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Toolbar as ToolbarPrimitive } from 'bits-ui';
	import { buttonVariants } from '../button/Button.variants';
	import { toolbarVariants } from './Toolbar.variants';

	interface Props {
		/** Toolbar controls to render */
		items: ToolbarItem[];
		/** Visual style passed to each item */
		variant?: ButtonVariant;
		/** Semantic color passed to each item */
		color?: ButtonColor;
		/** Button size passed to each item */
		size?: ButtonSize;
		/** Layout direction */
		orientation?: ToolbarOrientation;
		/** Accessible label for the toolbar */
		ariaLabel?: string;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		items,
		variant = 'solid',
		color = 'base',
		size = 'md',
		orientation = 'horizontal',
		ariaLabel,
		class: className
	}: Props = $props();

	let rootClass = $derived(toolbarVariants({ orientation }));
</script>

{#snippet groupItems(group: ToolbarGroup)}
	{#each group.items as item (item.id ?? item.value)}
		<ToolbarPrimitive.GroupItem
			value={item.value}
			disabled={group.disabled || item.disabled}
			aria-label={item.ariaLabel}
			class={cn(
				buttonVariants({
					variant,
					color,
					size,
					content: item.content ?? 'normal'
				}),
				item.class
			)}
		>
			{@render item.children()}
		</ToolbarPrimitive.GroupItem>
	{/each}
{/snippet}

<ToolbarPrimitive.Root {orientation} aria-label={ariaLabel} class={cn(rootClass, className)}>
	{#each items as item, index (item.id ?? index)}
		{#if item.type === 'link'}
			<ToolbarPrimitive.Link
				href={item.href}
				target={item.target}
				rel={item.rel}
				aria-label={item.ariaLabel}
				aria-disabled={item.disabled}
				tabindex={item.disabled ? -1 : undefined}
				onclick={(event) => {
					if (!item.disabled) return;
					event.preventDefault();
					event.stopPropagation();
				}}
				class={cn(
					buttonVariants({
						variant,
						color,
						size,
						content: item.content ?? 'normal'
					}),
					item.class
				)}
			>
				{@render item.children()}
			</ToolbarPrimitive.Link>
		{:else if item.type === 'group'}
			{@const isMultiple = item.multiple ?? item.groupType === 'multiple'}
			{#if isMultiple}
				<ToolbarPrimitive.Group
					type="multiple"
					value={item.value as string[]}
					disabled={item.disabled}
					onValueChange={item.onValueChange as (value: string[]) => void}
					aria-label={item.ariaLabel}
					class={cn('inline-flex w-fit items-stretch', item.class)}
				>
					{@render groupItems(item)}
				</ToolbarPrimitive.Group>
			{:else}
				<ToolbarPrimitive.Group
					type="single"
					value={item.value as string}
					disabled={item.disabled}
					onValueChange={item.onValueChange as (value: string) => void}
					aria-label={item.ariaLabel}
					class={cn('inline-flex w-fit items-stretch', item.class)}
				>
					{@render groupItems(item)}
				</ToolbarPrimitive.Group>
			{/if}
		{:else}
			<ToolbarPrimitive.Button
				disabled={item.disabled}
				aria-label={item.ariaLabel}
				onclick={item.onclick}
				class={cn(
					buttonVariants({
						variant,
						color,
						size,
						content: item.content ?? 'normal'
					}),
					item.class
				)}
			>
				{@render item.children()}
			</ToolbarPrimitive.Button>
		{/if}
	{/each}
</ToolbarPrimitive.Root>
