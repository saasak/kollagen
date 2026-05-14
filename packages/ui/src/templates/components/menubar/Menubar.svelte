<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { menubarVariants } from './Menubar.variants';
	import { Menubar as MenubarPrimitive } from 'bits-ui';

	type MenubarItem = {
		label: string;
		value: string;
		disabled?: boolean;
	};
	type MenubarMenu = {
		label: string;
		items: MenubarItem[];
	};

	interface Props {
		menus: MenubarMenu[];
		onSelect?: (value: string) => void;
		class?: string;
	}

	let { menus, onSelect, class: className }: Props = $props();

	const classes = menubarVariants();
</script>

<MenubarPrimitive.Root class={cn(classes.root(), className)}>
	{#each menus as menu (menu.label)}
		<MenubarPrimitive.Menu>
			<MenubarPrimitive.Trigger class={classes.trigger()}>
				{menu.label}
			</MenubarPrimitive.Trigger>
			<MenubarPrimitive.Portal>
				<MenubarPrimitive.Content sideOffset={6} class={classes.content()}>
					{#each menu.items as item (item.value)}
						<MenubarPrimitive.Item
							disabled={item.disabled}
							class={classes.item()}
							onSelect={() => onSelect?.(item.value)}
						>
							{item.label}
						</MenubarPrimitive.Item>
					{/each}
				</MenubarPrimitive.Content>
			</MenubarPrimitive.Portal>
		</MenubarPrimitive.Menu>
	{/each}
</MenubarPrimitive.Root>
