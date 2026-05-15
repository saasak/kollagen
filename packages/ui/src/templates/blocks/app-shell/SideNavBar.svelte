<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ChevronLeft, ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import { NavigationList } from '../../components/navigation-list';
	import { tryGetAppShellContext } from './context.svelte';
	import type { NavBrand, NavGroup, NavUserMenu } from './types';

	interface Props {
		/** SideNavBar side */
		side?: 'left' | 'right';
		/** Accessible label used for desktop and mobile navigation */
		label?: string;
		/** Brand rendered in the side nav header */
		brand?: NavBrand;
		/** Side navigation groups */
		groups?: NavGroup[];
		/** Optional footer user menu */
		userMenu?: NavUserMenu;
		/** Whether the side nav can collapse on desktop */
		collapsible?: boolean;
		/** Current collapsed state */
		collapsed?: boolean;
		/** Called when collapsed changes */
		onCollapsedChange?: (collapsed: boolean) => void;
		/** Current URL pathname used in standalone mode */
		currentPath?: string;
		/** Accessible label for the standalone mobile menu button */
		menuLabel?: string;
		/** Additional CSS classes in standalone mode */
		class?: string;
	}

	let {
		side = 'left',
		label = 'Side navigation',
		brand,
		groups = [],
		userMenu,
		collapsible = true,
		collapsed = $bindable(false),
		onCollapsedChange,
		currentPath = '',
		menuLabel = 'Open navigation',
		class: className
	}: Props = $props();

	const shell = tryGetAppShellContext();
	const unregister = shell?.register({
		get position() {
			return side;
		},
		get label() {
			return label;
		},
		get brand() {
			return brand;
		},
		get groups() {
			return groups;
		},
		get userMenu() {
			return userMenu;
		},
		get collapsible() {
			return collapsible;
		},
		get collapsed() {
			return collapsed;
		},
		setCollapsed(next) {
			collapsed = next;
			onCollapsedChange?.(next);
		}
	});

	onDestroy(() => unregister?.());

	let mobileOpen = $state(false);
	let openUserMenu = $state(false);

	const navPaddingX = 'clamp(0.5rem, calc(0.875rem * var(--kl-density, 1)), 1.25rem)';
	const navPaddingY = 'clamp(0.35rem, calc(0.65rem * var(--kl-density, 1)), 0.875rem)';

	function toggleCollapsed() {
		collapsed = !collapsed;
		onCollapsedChange?.(collapsed);
	}

	function closeMobileNavigation() {
		mobileOpen = false;
	}

	function openMobileNavigation() {
		mobileOpen = true;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			mobileOpen = false;
			openUserMenu = false;
		}
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- navigation hrefs are caller-provided and should already be resolved by the app -->
<svelte:window onkeydown={handleKeydown} />

{#snippet brandContent(value: NavBrand | undefined, isCollapsed = false)}
	{#if value}
		{@const Logo = value.logo}
		{#if value.href && !isCollapsed}
			<a
				href={value.href}
				class="rounded-kl-field focus-visible:ring-kl-primary flex min-w-0 items-center gap-2 outline-none focus-visible:ring-2"
			>
				{#if value.logoSrc}
					<img
						src={value.logoSrc}
						alt={value.logoAlt ?? ''}
						class="rounded-kl-selector size-8 shrink-0 object-cover"
					/>
				{:else if Logo}
					<Logo class="size-7 shrink-0" aria-hidden="true" />
				{/if}
				<span class="text-kl-base-content truncate text-sm font-semibold">{value.label}</span>
			</a>
		{:else if value.href}
			<a
				href={value.href}
				aria-label={value.label}
				class="rounded-kl-field hover:bg-kl-muted focus-visible:ring-kl-primary flex size-10 items-center justify-center outline-none focus-visible:ring-2"
			>
				{#if value.logoSrc}
					<img
						src={value.logoSrc}
						alt={value.logoAlt ?? ''}
						class="rounded-kl-selector size-8 shrink-0 object-cover"
					/>
				{:else if Logo}
					<Logo class="size-6 shrink-0" aria-hidden="true" />
				{:else}
					<span class="text-sm font-semibold">{value.label.slice(0, 1)}</span>
				{/if}
			</a>
		{:else}
			<div class={cn('flex min-w-0 items-center gap-2', isCollapsed && 'justify-center')}>
				{#if value.logoSrc}
					<img
						src={value.logoSrc}
						alt={value.logoAlt ?? ''}
						class="rounded-kl-selector size-8 shrink-0 object-cover"
					/>
				{:else if Logo}
					<Logo class="size-7 shrink-0" aria-hidden="true" />
				{:else if isCollapsed}
					<span class="text-sm font-semibold">{value.label.slice(0, 1)}</span>
				{/if}
				{#if !isCollapsed}
					<span class="text-kl-base-content truncate text-sm font-semibold">{value.label}</span>
				{/if}
			</div>
		{/if}
	{/if}
{/snippet}

{#snippet userMenuContent(value: NavUserMenu, isCollapsed = false)}
	<div class="relative w-full">
		<button
			type="button"
			aria-haspopup="menu"
			aria-expanded={openUserMenu}
			aria-label={isCollapsed ? value.name : undefined}
			title={isCollapsed ? value.name : undefined}
			onclick={() => (openUserMenu = !openUserMenu)}
			class={cn(
				'rounded-kl-field hover:bg-kl-muted focus-visible:outline-kl-primary flex min-w-0 items-center gap-2 text-left transition-colors focus-visible:outline focus-visible:outline-2',
				isCollapsed ? 'mx-auto size-10 justify-center p-1' : 'w-full p-1.5'
			)}
		>
			{#if value.image}
				<img src={value.image} alt="" class="size-8 shrink-0 rounded-full object-cover" />
			{:else}
				<span
					class="bg-kl-muted text-kl-muted-content flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
				>
					{value.initials ?? value.name.slice(0, 2).toUpperCase()}
				</span>
			{/if}
			{#if !isCollapsed}
				<span class="min-w-0 flex-1">
					<span class="text-kl-base-content block truncate text-sm font-medium">{value.name}</span>
					{#if value.email}
						<span class="text-kl-muted-content block truncate text-xs">{value.email}</span>
					{/if}
				</span>
			{/if}
		</button>

		{#if openUserMenu}
			<div
				role="menu"
				class={cn(
					'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md absolute bottom-full z-[var(--kl-z-dropdown)] mb-2 min-w-48 border p-1',
					side === 'right' ? 'right-0' : 'left-0',
					!isCollapsed && 'w-full'
				)}
			>
				{#each value.items ?? [] as item (item.label)}
					{@const ItemIcon = item.icon}
					{#if item.href}
						<a
							role="menuitem"
							href={item.href}
							aria-disabled={item.disabled ? 'true' : undefined}
							onclick={() => (openUserMenu = false)}
							class={cn(
								'rounded-kl-field hover:bg-kl-muted flex items-center gap-2 px-3 py-2 text-sm transition-colors',
								item.disabled && 'pointer-events-none opacity-50',
								item.tone === 'error' ? 'text-kl-error' : 'text-kl-base-content'
							)}
						>
							{#if ItemIcon}
								<ItemIcon size={16} aria-hidden="true" />
							{/if}
							<span>{item.label}</span>
						</a>
					{:else}
						<button
							role="menuitem"
							type="button"
							disabled={item.disabled}
							onclick={() => {
								item.onSelect?.();
								openUserMenu = false;
							}}
							class={cn(
								'rounded-kl-field hover:bg-kl-muted flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors disabled:pointer-events-none disabled:opacity-50',
								item.tone === 'error' ? 'text-kl-error' : 'text-kl-base-content'
							)}
						>
							{#if ItemIcon}
								<ItemIcon size={16} aria-hidden="true" />
							{/if}
							<span>{item.label}</span>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet sidebarContent(isCollapsed = false, overlay = false, mobileRail = false)}
	<aside
		class={cn(
			'border-kl-base-300 bg-kl-base-100 text-kl-base-content flex h-full min-h-0 shrink-0 flex-col overflow-hidden transition-[width]',
			side === 'left' ? 'border-r' : 'border-l',
			isCollapsed ? 'w-16' : 'w-64',
			overlay && 'shadow-kl-lg'
		)}
		style:--kl-nav-px={navPaddingX}
		style:--kl-nav-py={navPaddingY}
	>
		{#if brand || collapsible}
			<div
				class={cn(
					'flex shrink-0 items-center px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]',
					isCollapsed ? 'justify-center' : 'justify-between gap-2'
				)}
			>
				{#if isCollapsed}
					{#if collapsible}
						<button
							type="button"
							aria-label={mobileRail ? menuLabel : 'Expand navigation'}
							onclick={mobileRail ? openMobileNavigation : toggleCollapsed}
							class="rounded-kl-field text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-10 shrink-0 items-center justify-center transition-colors"
						>
							{#if side === 'left'}
								<ChevronRight size={18} aria-hidden="true" />
							{:else}
								<ChevronLeft size={18} aria-hidden="true" />
							{/if}
						</button>
					{:else}
						{@render brandContent(brand, isCollapsed)}
					{/if}
				{:else}
					{@render brandContent(brand)}
					{#if collapsible}
						<button
							type="button"
							aria-label={overlay ? 'Close navigation' : 'Collapse navigation'}
							onclick={overlay ? closeMobileNavigation : toggleCollapsed}
							class="rounded-kl-field text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-8 shrink-0 items-center justify-center transition-colors"
						>
							{#if side === 'left'}
								<PanelLeftClose size={16} aria-hidden="true" />
							{:else}
								<PanelLeftOpen size={16} aria-hidden="true" />
							{/if}
						</button>
					{/if}
				{/if}
			</div>
		{/if}

		<NavigationList
			{groups}
			{currentPath}
			collapsed={isCollapsed}
			{label}
			onNavigate={overlay ? closeMobileNavigation : undefined}
		/>

		{#if userMenu}
			<div class="shrink-0 px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]">
				{@render userMenuContent(userMenu, isCollapsed)}
			</div>
		{/if}
	</aside>
{/snippet}

{#if !shell}
	<div class={cn('text-kl-base-content relative h-dvh min-h-0 md:h-full', className)}>
		<div class="h-full md:hidden">
			{@render sidebarContent(true, false, true)}
		</div>

		<div class="hidden h-full md:block">
			{@render sidebarContent(collapsed)}
		</div>
	</div>

	{#if mobileOpen}
		<div class="fixed inset-0 z-[var(--kl-z-modal)] md:hidden">
			<button
				type="button"
				aria-label="Close navigation"
				class="absolute inset-0 bg-black/15"
				onclick={closeMobileNavigation}
			></button>
			<div class={cn('absolute inset-y-0', side === 'right' ? 'right-0' : 'left-0')}>
				{@render sidebarContent(false, true)}
			</div>
		</div>
	{/if}
{/if}
