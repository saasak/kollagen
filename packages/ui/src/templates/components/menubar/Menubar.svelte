<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const itemClass =
		'flex cursor-pointer items-center rounded-kl-selector px-3 py-2 text-sm text-kl-base-content transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-kl-base-200';
</script>

<MenubarPrimitive.Root
	class={cn(
		'rounded-kl-field border-kl-base-300 bg-kl-base-100 h-kl-field-md inline-flex items-center gap-1 border p-1',
		className
	)}
>
	{#each menus as menu (menu.label)}
		<MenubarPrimitive.Menu>
			<MenubarPrimitive.Trigger
				class="rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[state=open]:bg-kl-base-200 h-full cursor-pointer px-3 text-sm font-medium transition-colors outline-none"
			>
				{menu.label}
			</MenubarPrimitive.Trigger>
			<MenubarPrimitive.Portal>
				<MenubarPrimitive.Content
					sideOffset={6}
					class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-40 border p-1 outline-none"
				>
					{#each menu.items as item (item.value)}
						<MenubarPrimitive.Item
							disabled={item.disabled}
							class={itemClass}
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
