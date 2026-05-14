<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import type { SidebarGroup, SidebarItem, SidebarMatch } from './types';

	interface Props {
		/** Navigation groups */
		groups?: SidebarGroup[];
		/** Current URL pathname used to resolve the active entry */
		currentPath?: string;
		/** Default matching strategy for active entries */
		match?: SidebarMatch;
		/** Header content */
		header?: Snippet;
		/** Footer content */
		footer?: Snippet;
		/** Called when a navigation link is clicked */
		onNavigate?: () => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		groups = [],
		currentPath = '',
		match = 'exact',
		header,
		footer,
		onNavigate,
		class: className
	}: Props = $props();

	function isSelfActive(item: SidebarItem) {
		if (!currentPath) return false;

		const strategy = item.match ?? match;
		return strategy === 'startsWith'
			? currentPath.startsWith(item.href)
			: currentPath === item.href;
	}

	function isActive(item: SidebarItem): boolean {
		return isSelfActive(item) || item.children?.some((child) => isActive(child)) === true;
	}

	function handleNavigate() {
		onNavigate?.();
	}
</script>

<aside
	class={cn(
		`border-kl-base-300 bg-kl-base-100 text-kl-base-content flex h-full min-h-0 w-64 shrink-0 flex-col overflow-hidden border-r`,
		className
	)}
>
	{#if header}
		<div class="border-kl-base-300 shrink-0 border-b px-4 py-3">
			{@render header()}
		</div>
	{/if}

	<nav
		class="min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-3 py-4"
		aria-label="Sidebar navigation"
	>
		<div class="space-y-6">
			{#each groups as group, groupIndex (group.label ?? groupIndex)}
				<section class="space-y-1.5">
					{#if group.label}
						<h2 class="text-kl-muted-content px-2 text-xs font-semibold tracking-wider uppercase">
							{group.label}
						</h2>
					{/if}

					<div class="space-y-0.5">
						{#each group.items as item (item.href)}
							{@const Icon = item.icon}
							{@const active = isActive(item)}
							<a
								href={item.href}
								aria-current={isSelfActive(item) ? 'page' : undefined}
								onclick={handleNavigate}
								class={cn(
									`rounded-kl-field flex min-h-9 items-center gap-2 px-2.5 py-2 text-sm font-medium transition-colors duration-150`,
									active
										? 'bg-kl-primary text-kl-primary-content'
										: 'text-kl-base-content hover:bg-kl-muted'
								)}
							>
								{#if Icon}
									<Icon size={16} class="shrink-0" aria-hidden="true" />
								{/if}
								<span class="min-w-0 flex-1 truncate">{item.label}</span>
								{#if item.badge}
									<span
										class={cn(
											`rounded-kl-selector shrink-0 px-1.5 py-0.5 text-[0.6875rem] font-semibold`,
											active ? 'bg-kl-primary-content/20' : 'bg-kl-muted text-kl-muted-content'
										)}
									>
										{item.badge}
									</span>
								{/if}
							</a>

							{#if item.children?.length}
								<div class="border-kl-base-300 ml-4 space-y-0.5 border-l pl-2">
									{#each item.children as child (child.href)}
										{@const ChildIcon = child.icon}
										{@const childActive = isSelfActive(child)}
										<a
											href={child.href}
											aria-current={childActive ? 'page' : undefined}
											onclick={handleNavigate}
											class={cn(
												`rounded-kl-field flex min-h-8 items-center gap-2 px-2.5 py-1.5 text-sm transition-colors duration-150`,
												childActive
													? 'bg-kl-primary text-kl-primary-content font-medium'
													: 'text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content'
											)}
										>
											{#if ChildIcon}
												<ChildIcon size={14} class="shrink-0" aria-hidden="true" />
											{/if}
											<span class="min-w-0 flex-1 truncate">{child.label}</span>
											{#if child.badge}
												<span
													class={cn(
														`rounded-kl-selector shrink-0 px-1.5 py-0.5 text-[0.6875rem] font-semibold`,
														childActive
															? 'bg-kl-primary-content/20'
															: 'bg-kl-muted text-kl-muted-content'
													)}
												>
													{child.badge}
												</span>
											{/if}
										</a>
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/each}
		</div>
	</nav>

	{#if footer}
		<div class="border-kl-base-300 shrink-0 border-t px-4 py-3">
			{@render footer()}
		</div>
	{/if}
</aside>
