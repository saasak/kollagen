<script module lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		ButtonColor,
		ButtonContent,
		ButtonSize,
		ButtonVariant
	} from '../trigger/Trigger.svelte';

	export type MenubarOrientation = import('./Menubar.variants').MenubarOrientation;

	export type MenubarItem = {
		id?: string;
		value: string;
		disabled?: boolean;
		class?: string;
		children: Snippet;
	};

	export type MenubarMenu = {
		id?: string;
		value?: string;
		disabled?: boolean;
		content?: ButtonContent;
		ariaLabel?: string;
		triggerClass?: string;
		children: Snippet;
		items: MenubarItem[];
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { Trigger } from '../trigger';
	import TriggerProvider from '../trigger/TriggerProvider.svelte';
	import { menubarVariants } from './Menubar.variants';

	interface Props {
		menus: MenubarMenu[];
		variant?: ButtonVariant;
		color?: ButtonColor;
		size?: ButtonSize;
		content?: ButtonContent;
		orientation?: MenubarOrientation;
		onSelect?: (value: string) => void;
		class?: string;
	}

	let {
		menus,
		variant = 'solid',
		color = 'base',
		size = 'md',
		content = 'normal',
		orientation = 'horizontal',
		onSelect,
		class: className
	}: Props = $props();

	const classes = $derived(menubarVariants({ orientation }));
	const contentSide = $derived(orientation === 'vertical' ? 'right' : 'bottom');
</script>

<MenubarPrimitive.Root data-orientation={orientation} class={cn(classes.root(), className)}>
	{#each menus as menu, index (menu.id ?? menu.value ?? index)}
		{@const menuValue = menu.value ?? String(index)}
		<MenubarPrimitive.Menu value={menuValue}>
			<MenubarPrimitive.Trigger disabled={menu.disabled}>
				{#snippet child({ props })}
					<TriggerProvider {props}>
						<Trigger
							{variant}
							{color}
							{size}
							content={menu.content ?? content}
							disabled={menu.disabled}
							ariaLabel={menu.ariaLabel}
							class={menu.triggerClass}
						>
							{@render menu.children()}
						</Trigger>
					</TriggerProvider>
				{/snippet}
			</MenubarPrimitive.Trigger>
			<MenubarPrimitive.Portal>
				<MenubarPrimitive.Content side={contentSide} sideOffset={6} class={classes.content()}>
					{#each menu.items as item (item.id ?? item.value)}
						<MenubarPrimitive.Item
							disabled={item.disabled}
							class={cn(classes.item(), item.class)}
							onSelect={() => onSelect?.(item.value)}
						>
							{@render item.children()}
						</MenubarPrimitive.Item>
					{/each}
				</MenubarPrimitive.Content>
			</MenubarPrimitive.Portal>
		</MenubarPrimitive.Menu>
	{/each}
</MenubarPrimitive.Root>
