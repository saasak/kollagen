<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ChevronRight, Menu, X } from 'lucide-svelte';
	import { NavigationList } from '../../components/navigation-list';
	import type { NavAction, NavBrand, NavGroup, NavItem, NavUserMenu } from './types';

	interface Props {
		/** Bar position */
		position?: 'top' | 'bottom';
		/** Accessible navigation label */
		label?: string;
		/** Brand rendered at the left edge */
		brand?: NavBrand;
		/** Navigation groups rendered in the center */
		groups?: NavGroup[];
		/** Optional right-side action */
		action?: NavAction;
		/** Optional right-side user menu */
		userMenu?: NavUserMenu;
		/** Current URL pathname used to resolve the active entry */
		currentPath?: string;
		/** Accessible label for the mobile menu button */
		menuLabel?: string;
		/** Additional CSS classes */
		class?: string;
	}

	let {
		position = 'top',
		label = 'Navigation',
		brand,
		groups = [],
		action,
		userMenu,
		currentPath = '',
		menuLabel = 'Open navigation',
		class: className
	}: Props = $props();

	let mobileOpen = $state(false);
	let openUserMenu = $state(false);

	const navPaddingX = 'clamp(0.5rem, calc(0.875rem * var(--kl-density, 1)), 1.25rem)';
	const navPaddingY = 'clamp(0.35rem, calc(0.65rem * var(--kl-density, 1)), 0.875rem)';

	function isSelfActive(item: NavItem) {
		if (!currentPath) return false;

		const strategy = item.match ?? 'exact';
		return strategy === 'startsWith'
			? currentPath.startsWith(item.href)
			: currentPath === item.href;
	}

	function isActive(item: NavItem): boolean {
		return isSelfActive(item) || item.children?.some((child) => isActive(child)) === true;
	}

	function closeMobileNavigation() {
		mobileOpen = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			mobileOpen = false;
			openUserMenu = false;
		}
	}

	function actionClass(value?: NavAction) {
		const color = value?.color ?? 'primary';
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

{#snippet brandContent(value: NavBrand | undefined)}
	{#if value}
		{@const Logo = value.logo}
		{#if value.href}
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
		{:else}
			<div class="flex min-w-0 items-center gap-2">
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
			</div>
		{/if}
	{/if}
{/snippet}

{#snippet horizontalItem(item: NavItem)}
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

{#snippet userMenuContent(value: NavUserMenu)}
	<div class="relative">
		<button
			type="button"
			aria-haspopup="menu"
			aria-expanded={openUserMenu}
			onclick={() => (openUserMenu = !openUserMenu)}
			class="rounded-kl-field hover:bg-kl-muted focus-visible:outline-kl-primary flex min-w-0 items-center gap-2 p-1.5 text-left transition-colors focus-visible:outline focus-visible:outline-2"
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
			<span class="hidden min-w-0 flex-1 sm:block">
				<span class="text-kl-base-content block truncate text-sm font-medium">{value.name}</span>
				{#if value.email}
					<span class="text-kl-muted-content block truncate text-xs">{value.email}</span>
				{/if}
			</span>
		</button>

		{#if openUserMenu}
			<div
				role="menu"
				class={cn(
					'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md absolute right-0 z-[var(--kl-z-dropdown)] min-w-48 border p-1',
					position === 'top' ? 'top-full mt-2' : 'bottom-full mb-2'
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

<header
	class={cn(
		'border-kl-base-300 bg-kl-base-100 text-kl-base-content grid min-h-14 shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-[var(--kl-nav-px)] py-[var(--kl-nav-py)] md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]',
		position === 'top' ? 'border-b' : 'border-t',
		className
	)}
	style:--kl-nav-px={navPaddingX}
	style:--kl-nav-py={navPaddingY}
>
	<button
		type="button"
		aria-label={menuLabel}
		onclick={() => (mobileOpen = true)}
		class="rounded-kl-field text-kl-base-content hover:bg-kl-muted focus-visible:outline-kl-primary flex size-10 items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2 md:hidden"
	>
		<Menu size={20} aria-hidden="true" />
	</button>

	<div class="min-w-0 justify-self-start">
		{@render brandContent(brand)}
	</div>

	<nav class="hidden min-w-0 items-center justify-center gap-1 md:flex" aria-label={label}>
		{#each groups as group, groupIndex (group.label ?? groupIndex)}
			{#each group.items as item (item.href)}
				{@render horizontalItem(item)}
			{/each}
		{/each}
	</nav>

	<div class="flex min-w-0 justify-end">
		{#if userMenu}
			{@render userMenuContent(userMenu)}
		{:else if action}
			{@const ActionIcon = action.icon}
			{#if action.href}
				<a
					href={action.href}
					class={actionClass(action)}
					aria-disabled={action.disabled ? 'true' : undefined}
				>
					{#if ActionIcon}
						<ActionIcon size={16} aria-hidden="true" />
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
					{#if ActionIcon}
						<ActionIcon size={16} aria-hidden="true" />
					{/if}
					<span>{action.label}</span>
				</button>
			{/if}
		{/if}
	</div>
</header>

{#if mobileOpen}
	<div
		class="bg-kl-base-100 text-kl-base-content fixed inset-0 z-[var(--kl-z-modal)] overflow-y-auto md:hidden"
	>
		<div
			class="border-kl-base-300 bg-kl-base-100 sticky top-0 z-10 flex min-h-14 items-center justify-between border-b px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]"
			style:--kl-nav-px={navPaddingX}
			style:--kl-nav-py={navPaddingY}
		>
			{@render brandContent(brand)}
			<button
				type="button"
				aria-label="Close navigation"
				onclick={() => (mobileOpen = false)}
				class="rounded-kl-field text-kl-base-content hover:bg-kl-muted focus-visible:outline-kl-primary flex size-10 items-center justify-center transition-colors focus-visible:outline focus-visible:outline-2"
			>
				<X size={20} aria-hidden="true" />
			</button>
		</div>
		<div class="px-[var(--kl-nav-px)] py-6" style:--kl-nav-px={navPaddingX}>
			<NavigationList
				{groups}
				{currentPath}
				onNavigate={closeMobileNavigation}
				{label}
				class="px-0 py-0"
			/>
		</div>
	</div>
{/if}
