<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as NavigationMenuPrimitive } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';

	type NavigationLink = {
		label: string;
		href: string;
		description?: string;
	};
	type NavigationItem = NavigationLink & {
		items?: NavigationLink[];
	};

	interface Props {
		items: NavigationItem[];
		class?: string;
	}

	let { items, class: className }: Props = $props();
</script>

<NavigationMenuPrimitive.Root class={cn('relative z-[var(--kl-z-dropdown)]', className)}>
	<NavigationMenuPrimitive.List class="flex items-center gap-1">
		{#each items as item (item.href)}
			<NavigationMenuPrimitive.Item>
				{#if item.items?.length}
					<NavigationMenuPrimitive.Trigger
						class="rounded-kl-field text-kl-base-content hover:bg-kl-base-200 data-[state=open]:bg-kl-base-200 h-kl-field-md flex cursor-pointer items-center gap-1 px-3 text-sm font-medium transition-colors outline-none"
					>
						{item.label}
						<ChevronDown
							size={14}
							class="transition-transform duration-150 data-[state=open]:rotate-180"
						/>
					</NavigationMenuPrimitive.Trigger>
					<NavigationMenuPrimitive.Content
						class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md absolute top-full left-0 mt-2 w-[min(32rem,calc(100vw-2rem))] border p-2"
					>
						<div class="grid gap-1 sm:grid-cols-2">
							{#each item.items as child (child.href)}
								<NavigationMenuPrimitive.Link
									href={child.href}
									class="rounded-kl-selector hover:bg-kl-base-200 block p-3 transition-colors"
								>
									<div class="text-kl-base-content text-sm font-medium">{child.label}</div>
									{#if child.description}
										<div class="text-kl-muted-content mt-1 text-sm">{child.description}</div>
									{/if}
								</NavigationMenuPrimitive.Link>
							{/each}
						</div>
					</NavigationMenuPrimitive.Content>
				{:else}
					<NavigationMenuPrimitive.Link
						href={item.href}
						class="rounded-kl-field text-kl-base-content hover:bg-kl-base-200 h-kl-field-md flex items-center px-3 text-sm font-medium transition-colors"
					>
						{item.label}
					</NavigationMenuPrimitive.Link>
				{/if}
			</NavigationMenuPrimitive.Item>
		{/each}
	</NavigationMenuPrimitive.List>
	<NavigationMenuPrimitive.Viewport />
</NavigationMenuPrimitive.Root>
