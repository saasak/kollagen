<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ChevronLeft, ChevronRight, Menu, PanelLeftClose, PanelLeftOpen, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import { NavigationList } from '../../components/navigation-list';
	import { getAppShellContext } from './context.svelte';
	import type { NavAction, NavBarPosition, NavBrand, NavItem, RegisteredNavBar } from './types';

	interface Props {
		/** Accessible label for the mobile menu button */
		menuLabel?: string;
		/** Main content */
		children: Snippet;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let { menuLabel = 'Open navigation', children, class: className }: Props = $props();

	const shell = getAppShellContext();
	let openUserMenu = $state<NavBarPosition | null>(null);

	let topNav = $derived(shell.navbars.top);
	let bottomNav = $derived(shell.navbars.bottom);
	let leftNav = $derived(shell.navbars.left);
	let rightNav = $derived(shell.navbars.right);
	let mobileNav = $derived(shell.navbars[shell.mobileBar]);
	let mobileBrand = $derived(mobileNav?.brand ?? leftNav?.brand ?? rightNav?.brand);
	let mobileBarPosition = $derived(shell.mobileBar);
	const navPaddingX = 'clamp(0.5rem, calc(0.875rem * var(--kl-density, 1)), 1.25rem)';
	const navPaddingY = 'clamp(0.35rem, calc(0.65rem * var(--kl-density, 1)), 0.875rem)';
	const contentPaddingX = 'clamp(1rem, calc(1.5rem * var(--kl-density, 1)), 2rem)';
	const contentPaddingY = 'clamp(1rem, calc(1.5rem * var(--kl-density, 1)), 2rem)';

	function isSelfActive(item: NavItem) {
		if (!shell.currentPath) return false;

		const strategy = item.match ?? 'exact';
		return strategy === 'startsWith'
			? shell.currentPath.startsWith(item.href)
			: shell.currentPath === item.href;
	}

	function isActive(item: NavItem): boolean {
		return isSelfActive(item) || item.children?.some((child) => isActive(child)) === true;
	}

	function closeMobileNavigation() {
		shell.closeMobileMenu();
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			shell.closeMobileMenu();
			openUserMenu = null;
		}
	}

	function actionClass(action?: NavAction) {
		const color = action?.color ?? 'primary';
		return cn(
			'inline-flex min-h-9 items-center justify-center gap-2 rounded-kl-field px-3 py-1.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
			color === 'primary' && 'bg-kl-primary text-kl-primary-content hover:opacity-90',
			color === 'secondary' && 'bg-kl-secondary text-kl-secondary-content hover:opacity-90',
			color === 'accent' && 'bg-kl-accent text-kl-accent-content hover:opacity-90',
			color === 'neutral' && 'bg-kl-neutral text-kl-neutral-content hover:opacity-90'
		);
	}
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -- navigation hrefs are caller-provided and should already be resolved by the app -->
<svelte:window onkeydown={handleKeydown} />

{#snippet brandContent(brand: NavBrand | undefined, collapsed = false)}
	{#if brand}
		{@const Logo = brand.logo}
		{#if brand.href && !collapsed}
			<a
				href={brand.href}
				class="rounded-kl-field focus-visible:ring-kl-primary flex min-w-0 items-center gap-2 outline-none focus-visible:ring-2"
			>
				{#if brand.logoSrc}
					<img
						src={brand.logoSrc}
						alt={brand.logoAlt ?? ''}
						class="rounded-kl-selector size-8 shrink-0 object-cover"
					/>
				{:else if Logo}
					<Logo class="size-7 shrink-0" aria-hidden="true" />
				{/if}
				<span class="text-kl-base-content truncate text-sm font-semibold">{brand.label}</span>
			</a>
		{:else if brand.href}
			<a
				href={brand.href}
				aria-label={brand.label}
				class="rounded-kl-field hover:bg-kl-muted focus-visible:ring-kl-primary flex size-10 items-center justify-center outline-none focus-visible:ring-2"
			>
				{#if brand.logoSrc}
					<img
						src={brand.logoSrc}
						alt={brand.logoAlt ?? ''}
						class="rounded-kl-selector size-8 shrink-0 object-cover"
					/>
				{:else if Logo}
					<Logo class="size-6 shrink-0" aria-hidden="true" />
				{:else}
					<span class="text-sm font-semibold">{brand.label.slice(0, 1)}</span>
				{/if}
			</a>
		{:else}
			<div class={cn('flex min-w-0 items-center gap-2', collapsed && 'justify-center')}>
				{#if brand.logoSrc}
					<img
						src={brand.logoSrc}
						alt={brand.logoAlt ?? ''}
						class="rounded-kl-selector size-8 shrink-0 object-cover"
					/>
				{:else if Logo}
					<Logo class="size-7 shrink-0" aria-hidden="true" />
				{/if}
				{#if !collapsed}
					<span class="text-kl-base-content truncate text-sm font-semibold">{brand.label}</span>
				{/if}
			</div>
		{/if}
	{/if}
{/snippet}

{#snippet horizontalItem(item: NavItem, position: 'top' | 'bottom' = 'top')}
	{@const Icon = item.icon}
	{@const active = isActive(item)}
	<div class="group/nav relative">
		<a
			href={item.disabled ? undefined : item.href}
			aria-current={isSelfActive(item) ? 'page' : undefined}
			aria-disabled={item.disabled ? 'true' : undefined}
			class={cn(
				'rounded-kl-field flex min-h-9 items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors',
				item.disabled && 'pointer-events-none opacity-50',
				active ? 'bg-kl-primary text-kl-primary-content' : 'text-kl-base-content hover:bg-kl-muted'
			)}
		>
			{#if Icon}
				<Icon size={16} class="shrink-0" aria-hidden="true" />
			{/if}
			<span>{item.label}</span>
			{#if item.children?.length}
				<ChevronRight size={14} class="shrink-0 rotate-90" aria-hidden="true" />
			{/if}
		</a>
		{#if item.children?.length}
			<div
				class={cn(
					'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md invisible absolute left-0 z-[var(--kl-z-dropdown)] w-64 border p-2 opacity-0 transition group-focus-within/nav:visible group-focus-within/nav:opacity-100 group-hover/nav:visible group-hover/nav:opacity-100',
					position === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'
				)}
			>
				{#each item.children as child (child.href)}
					<a
						href={child.disabled ? undefined : child.href}
						aria-current={isSelfActive(child) ? 'page' : undefined}
						aria-disabled={child.disabled ? 'true' : undefined}
						class={cn(
							'rounded-kl-field block px-3 py-2 text-sm transition-colors',
							child.disabled && 'pointer-events-none opacity-50',
							isSelfActive(child)
								? 'bg-kl-primary text-kl-primary-content'
								: 'text-kl-base-content hover:bg-kl-muted'
						)}
					>
						<span class="font-medium">{child.label}</span>
						{#if child.description}
							<span class="mt-0.5 block text-xs opacity-80">{child.description}</span>
						{/if}
					</a>
				{/each}
			</div>
		{/if}
	</div>
{/snippet}

{#snippet horizontalNavigation(
	navbar: RegisteredNavBar | undefined,
	position: 'top' | 'bottom' = 'top'
)}
	{#if navbar?.groups.length}
		<nav
			class="flex min-w-0 items-center justify-center gap-1"
			aria-label={navbar.label ?? 'Navigation'}
		>
			{#each navbar.groups as group, groupIndex (group.label ?? groupIndex)}
				{#each group.items as item (item.href)}
					{@render horizontalItem(item, position)}
				{/each}
			{/each}
		</nav>
	{/if}
{/snippet}

{#snippet action(action: NavAction | undefined)}
	{#if action}
		{@const Icon = action.icon}
		{#if action.href}
			<a
				href={action.href}
				class={actionClass(action)}
				aria-disabled={action.disabled ? 'true' : undefined}
			>
				{#if Icon}
					<Icon size={16} aria-hidden="true" />
				{/if}
				<span>{action.label}</span>
			</a>
		{:else}
			<button
				type="button"
				disabled={action.disabled}
				onclick={action.onclick}
				class={actionClass(action)}
			>
				{#if Icon}
					<Icon size={16} aria-hidden="true" />
				{/if}
				<span>{action.label}</span>
			</button>
		{/if}
	{/if}
{/snippet}

{#snippet userMenu(navbar: RegisteredNavBar)}
	{#if navbar.userMenu}
		{@const menu = navbar.userMenu}
		<div class="relative">
			<button
				type="button"
				aria-haspopup="menu"
				aria-expanded={openUserMenu === navbar.position}
				onclick={() => (openUserMenu = openUserMenu === navbar.position ? null : navbar.position)}
				class="rounded-kl-field hover:bg-kl-muted focus-visible:outline-kl-primary flex min-w-0 items-center gap-2 p-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2"
			>
				{#if menu.image}
					<img src={menu.image} alt="" class="size-8 shrink-0 rounded-full object-cover" />
				{:else}
					<span
						class="bg-kl-muted text-kl-muted-content flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
					>
						{menu.initials ?? menu.name.slice(0, 2).toUpperCase()}
					</span>
				{/if}
				<span class="hidden min-w-0 flex-1 sm:block">
					<span class="text-kl-base-content block truncate text-sm font-medium">{menu.name}</span>
					{#if menu.email}
						<span class="text-kl-muted-content block truncate text-xs">{menu.email}</span>
					{/if}
				</span>
			</button>

			{#if openUserMenu === navbar.position}
				<div
					role="menu"
					class={cn(
						'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md absolute z-[var(--kl-z-dropdown)] min-w-48 border p-1',
						navbar.position === 'right' ? 'right-0' : 'left-0',
						navbar.position === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'
					)}
				>
					{#each menu.items ?? [] as item (item.label)}
						{@const ItemIcon = item.icon}
						{#if item.href}
							<a
								role="menuitem"
								href={item.href}
								aria-disabled={item.disabled ? 'true' : undefined}
								onclick={() => (openUserMenu = null)}
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
									openUserMenu = null;
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
	{/if}
{/snippet}

{#snippet sidebarUserMenu(navbar: RegisteredNavBar, collapsed = false)}
	{#if navbar.userMenu}
		{@const menu = navbar.userMenu}
		<div class="relative w-full">
			<button
				type="button"
				aria-haspopup="menu"
				aria-expanded={openUserMenu === navbar.position}
				aria-label={collapsed ? menu.name : undefined}
				title={collapsed ? menu.name : undefined}
				onclick={() => (openUserMenu = openUserMenu === navbar.position ? null : navbar.position)}
				class={cn(
					'rounded-kl-field hover:bg-kl-muted focus-visible:outline-kl-primary flex min-w-0 items-center gap-2 text-left transition-colors focus-visible:outline focus-visible:outline-2',
					collapsed ? 'mx-auto size-10 justify-center p-1' : 'w-full p-1.5'
				)}
			>
				{#if menu.image}
					<img src={menu.image} alt="" class="size-8 shrink-0 rounded-full object-cover" />
				{:else}
					<span
						class="bg-kl-muted text-kl-muted-content flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
					>
						{menu.initials ?? menu.name.slice(0, 2).toUpperCase()}
					</span>
				{/if}
				{#if !collapsed}
					<span class="min-w-0 flex-1">
						<span class="text-kl-base-content block truncate text-sm font-medium">{menu.name}</span>
						{#if menu.email}
							<span class="text-kl-muted-content block truncate text-xs">{menu.email}</span>
						{/if}
					</span>
				{/if}
			</button>

			{#if openUserMenu === navbar.position}
				<div
					role="menu"
					class={cn(
						'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md absolute bottom-full z-[var(--kl-z-dropdown)] mb-2 min-w-48 border p-1',
						navbar.position === 'right' ? 'right-0' : 'left-0',
						!collapsed && 'w-full'
					)}
				>
					{#each menu.items ?? [] as item (item.label)}
						{@const ItemIcon = item.icon}
						{#if item.href}
							<a
								role="menuitem"
								href={item.href}
								aria-disabled={item.disabled ? 'true' : undefined}
								onclick={() => (openUserMenu = null)}
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
									openUserMenu = null;
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
	{/if}
{/snippet}

{#snippet horizontalBar(
	navbar: RegisteredNavBar | undefined,
	position: 'top' | 'bottom',
	className = ''
)}
	{#if navbar}
		<header
			class={cn(
				'border-kl-base-300 bg-kl-base-100 grid min-h-14 shrink-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]',
				position === 'top' ? 'border-b' : 'border-t',
				className
			)}
		>
			<div class="min-w-0 justify-self-start">
				{@render brandContent(navbar.brand)}
			</div>
			<div class="min-w-0">
				{@render horizontalNavigation(navbar, position)}
			</div>
			<div class="flex min-w-0 justify-end">
				{#if navbar.userMenu}
					{@render userMenu(navbar)}
				{:else}
					{@render action(navbar.action)}
				{/if}
			</div>
		</header>
	{/if}
{/snippet}

{#snippet mobileBar(
	navbar: RegisteredNavBar | undefined,
	position: 'top' | 'bottom',
	className = ''
)}
	<header
		class={cn(
			'border-kl-base-300 bg-kl-base-100 grid min-h-14 shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]',
			position === 'top' ? 'border-b' : 'border-t',
			className
		)}
	>
		<button
			type="button"
			aria-label={menuLabel}
			onclick={() => shell.toggleMobileMenu()}
			class="rounded-kl-field text-kl-base-content hover:bg-kl-muted focus-visible:outline-kl-primary flex size-10 items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2"
		>
			<Menu size={20} aria-hidden="true" />
		</button>
		<div class="min-w-0 justify-self-start">
			{@render brandContent(mobileBrand)}
		</div>
		<div class="flex min-w-0 justify-end">
			{#if navbar?.userMenu}
				{@render userMenu(navbar)}
			{:else}
				{@render action(navbar?.action)}
			{/if}
		</div>
	</header>
{/snippet}

{#snippet sidebar(navbar: RegisteredNavBar, side: 'left' | 'right', className = '')}
	{@const collapsed = shell.collapsed[side]}
	<aside
		class={cn(
			'border-kl-base-300 bg-kl-base-100 text-kl-base-content flex h-full min-h-0 shrink-0 flex-col overflow-hidden transition-[width]',
			side === 'left' ? 'border-r' : 'border-l',
			collapsed ? 'w-16' : 'w-64',
			className
		)}
	>
		{#if navbar.brand || navbar.collapsible}
			<div
				class={cn(
					'flex shrink-0 items-center px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]',
					collapsed ? 'justify-center' : 'justify-between gap-2'
				)}
			>
				{#if collapsed}
					{#if navbar.collapsible}
						<button
							type="button"
							aria-label="Expand navigation"
							onclick={() => shell.toggleCollapsed(side)}
							class="rounded-kl-field text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-10 shrink-0 items-center justify-center transition-colors"
						>
							{#if side === 'left'}
								<ChevronRight size={18} aria-hidden="true" />
							{:else}
								<ChevronLeft size={18} aria-hidden="true" />
							{/if}
						</button>
					{:else}
						{@render brandContent(navbar.brand, collapsed)}
					{/if}
				{:else}
					{@render brandContent(navbar.brand)}
					{#if navbar.collapsible}
						<button
							type="button"
							aria-label="Collapse navigation"
							onclick={() => shell.toggleCollapsed(side)}
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
			groups={navbar.groups}
			currentPath={shell.currentPath}
			{collapsed}
			label={navbar.label ?? `${side} navigation`}
		/>

		{#if navbar.userMenu}
			<div class="shrink-0 px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]">
				{@render sidebarUserMenu(navbar, collapsed)}
			</div>
		{/if}
	</aside>
{/snippet}

{#snippet mobileMenuSection(navbar: RegisteredNavBar | undefined)}
	{#if navbar?.groups.length}
		<section class="space-y-2">
			{#if navbar.label}
				<h2 class="text-kl-muted-content px-2 text-xs font-semibold tracking-wider uppercase">
					{navbar.label}
				</h2>
			{/if}
			<NavigationList
				groups={navbar.groups}
				currentPath={shell.currentPath}
				onNavigate={closeMobileNavigation}
				label={navbar.label ?? 'Mobile navigation'}
				class="px-0 py-0"
			/>
		</section>
	{/if}
{/snippet}

{#snippet mobileMenuUserSection(navbar: RegisteredNavBar | undefined)}
	{#if navbar?.userMenu}
		<section>
			{@render sidebarUserMenu(navbar)}
		</section>
	{/if}
{/snippet}

<div
	class={cn(
		'bg-kl-base-200 text-kl-base-content flex h-dvh min-h-screen w-full overflow-hidden',
		className
	)}
	style:--kl-nav-px={navPaddingX}
	style:--kl-nav-py={navPaddingY}
	style:--kl-shell-px={contentPaddingX}
	style:--kl-shell-py={contentPaddingY}
>
	{#if leftNav}
		{@render sidebar(leftNav, 'left', 'max-lg:hidden')}
	{/if}

	<div class="flex min-w-0 flex-1 flex-col">
		{#if topNav}
			{@render horizontalBar(topNav, 'top', 'max-lg:hidden')}
		{/if}
		{#if mobileBarPosition === 'top'}
			{@render mobileBar(mobileNav, 'top', 'lg:hidden')}
		{/if}

		<main class="min-h-0 flex-1 overflow-y-auto px-[var(--kl-shell-px)] py-[var(--kl-shell-py)]">
			{@render children()}
		</main>

		{#if bottomNav}
			{@render horizontalBar(bottomNav, 'bottom', 'max-lg:hidden')}
		{/if}
		{#if mobileBarPosition === 'bottom'}
			{@render mobileBar(mobileNav, 'bottom', 'lg:hidden')}
		{/if}
	</div>

	{#if rightNav}
		{@render sidebar(rightNav, 'right', 'max-lg:hidden')}
	{/if}

	{#if shell.mobileMenuOpen}
		<div
			class="bg-kl-base-100 text-kl-base-content fixed inset-0 z-[var(--kl-z-modal)] overflow-y-auto lg:hidden"
			transition:fly={{
				x: mobileBarPosition === 'bottom' ? 0 : '-100%',
				y: mobileBarPosition === 'bottom' ? '100%' : 0,
				duration: 180
			}}
		>
			<div
				class="border-kl-base-300 bg-kl-base-100 sticky top-0 z-10 flex min-h-14 items-center justify-between border-b px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]"
			>
				{@render brandContent(mobileBrand)}
				<button
					type="button"
					aria-label="Close navigation"
					onclick={() => shell.closeMobileMenu()}
					class="rounded-kl-field text-kl-base-content hover:bg-kl-muted focus-visible:outline-kl-primary flex size-10 items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2"
				>
					<X size={20} aria-hidden="true" />
				</button>
			</div>
			<div class="flex min-h-[calc(100dvh-3.5rem)] flex-col px-[var(--kl-nav-px)] py-6">
				<div class="space-y-8">
					{@render mobileMenuSection(leftNav)}
					{@render mobileMenuSection(topNav)}
					{@render mobileMenuSection(bottomNav)}
					{@render mobileMenuSection(rightNav)}
				</div>
				<div class="mt-auto space-y-4 pt-8">
					{@render mobileMenuUserSection(leftNav)}
					{@render mobileMenuUserSection(rightNav)}
				</div>
			</div>
		</div>
	{/if}
</div>
