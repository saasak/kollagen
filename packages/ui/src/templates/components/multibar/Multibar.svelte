<script module lang="ts">
	import type { ButtonColor, ButtonSize, ButtonVariant } from '../button/Button.variants';
	import type { ButtonGroupItem } from '../button-group';
	import type { MenubarMenu } from '../menubar';
	import type { ToggleGroupItem } from '../toggle-group';
	import type { ToolbarItem } from '../toolbar';

	export type MultibarOrientation = import('./Multibar.variants').MultibarOrientation;

	type MultibarBaseItem = {
		id?: string;
		variant?: ButtonVariant;
		color?: ButtonColor;
		size?: ButtonSize;
		ariaLabel?: string;
		class?: string;
	};

	export type MultibarButtonGroupItem = MultibarBaseItem & {
		type: 'buttonGroup';
		items: ButtonGroupItem[];
	};

	export type MultibarMenubarItem = MultibarBaseItem & {
		type: 'menubar';
		menus: MenubarMenu[];
		content?: import('../button/Button.variants').ButtonContent;
		onSelect?: (value: string) => void;
	};

	export type MultibarToggleGroupItem = MultibarBaseItem & {
		type: 'toggleGroup';
		items: ToggleGroupItem[];
		value?: string | string[];
		multiple?: boolean;
		groupType?: 'single' | 'multiple';
		disabled?: boolean;
		loop?: boolean;
		rovingFocus?: boolean;
		onValueChange?: (value: string | string[]) => void;
	};

	export type MultibarToolbarItem = MultibarBaseItem & {
		type: 'toolbar';
		items: ToolbarItem[];
	};

	export type MultibarItem =
		| MultibarButtonGroupItem
		| MultibarMenubarItem
		| MultibarToggleGroupItem
		| MultibarToolbarItem;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ButtonGroup } from '../button-group';
	import { Menubar } from '../menubar';
	import { ToggleGroup } from '../toggle-group';
	import { Toolbar } from '../toolbar';
	import { multibarVariants } from './Multibar.variants';

	interface Props {
		/** Groups to render inside the toolbar */
		items: MultibarItem[];
		/** Visual style passed to each group */
		variant?: ButtonVariant;
		/** Semantic color passed to each group */
		color?: ButtonColor;
		/** Control size passed to each group */
		size?: ButtonSize;
		/** Layout direction shared by every group */
		orientation?: MultibarOrientation;
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

	let rootClass = $derived(multibarVariants({ orientation }));
</script>

<div
	role="toolbar"
	aria-label={ariaLabel}
	aria-orientation={orientation}
	data-orientation={orientation}
	class={cn(rootClass, className)}
>
	{#each items as item, index (item.id ?? index)}
		{@const itemVariant = item.variant ?? variant}
		{@const itemColor = item.color ?? color}
		{@const itemSize = item.size ?? size}

		{#if item.type === 'buttonGroup'}
			<ButtonGroup
				items={item.items}
				variant={itemVariant}
				color={itemColor}
				size={itemSize}
				{orientation}
				ariaLabel={item.ariaLabel}
				class={item.class}
			/>
		{:else if item.type === 'menubar'}
			<Menubar
				menus={item.menus}
				variant={itemVariant}
				color={itemColor}
				size={itemSize}
				content={item.content ?? 'normal'}
				{orientation}
				onSelect={item.onSelect}
				class={cn('p-0', item.class)}
			/>
		{:else if item.type === 'toggleGroup'}
			<ToggleGroup
				items={item.items}
				value={item.value}
				multiple={item.multiple}
				type={item.groupType}
				disabled={item.disabled}
				loop={item.loop}
				rovingFocus={item.rovingFocus}
				variant={itemVariant}
				color={itemColor}
				size={itemSize}
				{orientation}
				ariaLabel={item.ariaLabel}
				onValueChange={item.onValueChange}
				class={cn('p-0', item.class)}
			/>
		{:else}
			<Toolbar
				items={item.items}
				variant={itemVariant}
				color={itemColor}
				size={itemSize}
				{orientation}
				ariaLabel={item.ariaLabel}
				class={item.class}
			/>
		{/if}
	{/each}
</div>
