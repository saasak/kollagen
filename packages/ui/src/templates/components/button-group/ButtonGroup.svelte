<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		ButtonColor,
		ButtonContent,
		ButtonSize,
		ButtonVariant
	} from '../button/Button.variants';
	import type { MenuEntry } from '../menu';

	export type ButtonGroupOrientation = import('./ButtonGroup.variants').ButtonGroupOrientation;

	type ButtonGroupBaseItem = {
		id?: string;
		content?: ButtonContent;
		disabled?: boolean;
		ariaLabel?: string;
		children: Snippet<[context?: unknown]>;
		childrenContext?: unknown;
	};

	export type ButtonGroupButtonItem = ButtonGroupBaseItem & {
		type: 'button';
		loading?: boolean;
		href?: string;
		target?: string;
		rel?: string;
		download?: string | boolean;
		name?: string;
		value?: string | number;
		title?: string;
		class?: string;
		onclick?: (event: MouseEvent) => void;
	};

	export type ButtonGroupMenuItem = ButtonGroupBaseItem & {
		type: 'menu';
		params: MenuEntry[];
		open?: boolean;
		loop?: boolean;
		class?: string;
		triggerClass?: string;
		onSelect?: (value: string) => void;
		onOpenChange?: (open: boolean) => void;
	};

	export type ButtonGroupItem = ButtonGroupButtonItem | ButtonGroupMenuItem;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Button } from '../button';
	import { Menu } from '../menu';
	import { Trigger } from '../trigger';
	import { buttonGroupVariants } from './ButtonGroup.variants';
	import ButtonGroupSeparator from './ButtonGroupSeparator.svelte';

	interface Props {
		/** Buttons and menu triggers to render */
		items: ButtonGroupItem[];
		/** Visual style passed to each item */
		variant?: ButtonVariant;
		/** Semantic color passed to each item */
		color?: ButtonColor;
		/** Button size passed to each item */
		size?: ButtonSize;
		/** Layout direction */
		orientation?: ButtonGroupOrientation;
		/** Show separators between items. Defaults to true only for explicit non-base colors */
		separator?: boolean;
		/** Accessible label for the group */
		ariaLabel?: string;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		items,
		variant = 'solid',
		color,
		size = 'md',
		orientation = 'horizontal',
		separator,
		ariaLabel,
		class: className
	}: Props = $props();

	let rootClass = $derived(buttonGroupVariants({ orientation }));
	let resolvedColor = $derived(color ?? 'base');
	let separatorOrientation: 'horizontal' | 'vertical' = $derived(
		orientation === 'horizontal' ? 'vertical' : 'horizontal'
	);
	let shouldRenderSeparator = $derived(separator ?? (color !== undefined && color !== 'base'));
</script>

<div
	role="group"
	aria-label={ariaLabel}
	data-orientation={orientation}
	class={cn(rootClass, className)}
>
	{#each items as item, index (item.id ?? index)}
		{#if item.type === 'menu'}
			<Menu
				items={item.params}
				open={item.open}
				disabled={item.disabled}
				loop={item.loop}
				onSelect={item.onSelect}
				onOpenChange={item.onOpenChange}
				class={item.class}
			>
				<Trigger
					{variant}
					color={resolvedColor}
					{size}
					content={item.content ?? 'normal'}
					disabled={item.disabled}
					ariaLabel={item.ariaLabel}
					class={item.triggerClass}
				>
					{@render item.children(item.childrenContext)}
				</Trigger>
			</Menu>
		{:else}
			<Button
				{variant}
				color={resolvedColor}
				{size}
				content={item.content ?? 'normal'}
				disabled={item.disabled}
				loading={item.loading}
				href={item.href}
				target={item.target}
				rel={item.rel}
				download={item.download}
				name={item.name}
				value={item.value}
				title={item.title}
				ariaLabel={item.ariaLabel}
				onclick={item.onclick}
				class={item.class}
			>
				{@render item.children(item.childrenContext)}
			</Button>
		{/if}

		{#if shouldRenderSeparator && index < items.length - 1}
			<ButtonGroupSeparator orientation={separatorOrientation} />
		{/if}
	{/each}
</div>
