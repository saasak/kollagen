<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { NavGroup, NavItem, NavMatch } from './types';

	interface Props {
		/** Navigation groups */
		groups?: NavGroup[];
		/** Current URL pathname used to resolve the active entry */
		currentPath?: string;
		/** Default matching strategy for active entries */
		match?: NavMatch;
		/** Hide labels and render top-level icons only */
		collapsed?: boolean;
		/** Called when a navigation link is clicked */
		onNavigate?: () => void;
		/** Accessible navigation label */
		label?: string;
		/** Additional CSS classes on the nav element */
		class?: string;
	}

	let {
		groups = [],
		currentPath = '',
		match = 'exact',
		collapsed = false,
		onNavigate,
		label = 'Navigation',
		class: className
	}: Props = $props();

	function isSelfActive(item: NavItem) {
		if (!currentPath) return false;

		const strategy = item.match ?? match;
		return strategy === 'startsWith'
			? currentPath.startsWith(item.href)
			: currentPath === item.href;
	}

	function isActive(item: NavItem): boolean {
		return isSelfActive(item) || item.children?.some((child) => isActive(child)) === true;
	}

	function handleNavigate() {
		onNavigate?.();
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- navigation hrefs are caller-provided and should already be resolved by the app -->
<nav
	class={cn(
		'min-h-0 flex-1 overflow-x-hidden overflow-y-auto px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]',
		className
	)}
	aria-label={label}
	data-collapsed={collapsed ? 'true' : undefined}
>
	<div class={cn(collapsed ? 'space-y-2' : 'space-y-6')}>
		{#each groups as group, groupIndex (group.label ?? groupIndex)}
			<section class={cn(collapsed ? 'space-y-1' : 'space-y-1.5')}>
				{#if group.label && !collapsed}
					<h2 class="text-kl-muted-content px-2 text-xs font-semibold tracking-wider uppercase">
						{group.label}
					</h2>
				{/if}

				<div class="space-y-0.5">
					{#each group.items as item (item.href)}
						{@const Icon = item.icon}
						{@const active = isActive(item)}
						<a
							href={item.disabled ? undefined : item.href}
							aria-current={isSelfActive(item) ? 'page' : undefined}
							aria-disabled={item.disabled ? 'true' : undefined}
							title={collapsed ? item.label : undefined}
							onclick={handleNavigate}
							class={cn(
								'rounded-kl-field flex min-h-9 items-center gap-2 px-2.5 py-2 text-sm font-medium transition-colors duration-150',
								collapsed && 'justify-center px-2',
								item.disabled && 'pointer-events-none opacity-50',
								active
									? 'bg-kl-primary text-kl-primary-content'
									: 'text-kl-base-content hover:bg-kl-muted'
							)}
						>
							{#if Icon}
								<Icon size={16} class="shrink-0" aria-hidden="true" />
							{/if}
							{#if !collapsed}
								<span class="min-w-0 flex-1 truncate">{item.label}</span>
								{#if item.badge}
									<span
										class={cn(
											'rounded-kl-selector shrink-0 px-1.5 py-0.5 text-[0.6875rem] font-semibold',
											active ? 'bg-kl-primary-content/20' : 'bg-kl-muted text-kl-muted-content'
										)}
									>
										{item.badge}
									</span>
								{/if}
							{/if}
						</a>

						{#if item.children?.length && !collapsed}
							<div class="ml-4 space-y-0.5 pl-2">
								{#each item.children as child (child.href)}
									{@const ChildIcon = child.icon}
									{@const childActive = isSelfActive(child)}
									<a
										href={child.disabled ? undefined : child.href}
										aria-current={childActive ? 'page' : undefined}
										aria-disabled={child.disabled ? 'true' : undefined}
										onclick={handleNavigate}
										class={cn(
											'rounded-kl-field flex min-h-8 items-center gap-2 px-2.5 py-1.5 text-sm transition-colors duration-150',
											child.disabled && 'pointer-events-none opacity-50',
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
													'rounded-kl-selector shrink-0 px-1.5 py-0.5 text-[0.6875rem] font-semibold',
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
