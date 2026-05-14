<script lang="ts">
	import { AppShell } from '$blocks/app-shell';
	import { Sidebar, type SidebarGroup } from '$blocks/sidebar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		Bell,
		Bot,
		ChartNoAxesColumnIncreasing,
		CreditCard,
		Folder,
		LayoutDashboard,
		Menu,
		MessageSquare,
		Search,
		Settings,
		ShoppingBag,
		Users
	} from 'lucide-svelte';

	const groups: SidebarGroup[] = [
		{
			label: 'Overview',
			items: [
				{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
				{
					label: 'CRM',
					href: '/dashboard/crm',
					icon: ChartNoAxesColumnIncreasing,
					match: 'startsWith',
					children: [
						{ label: 'Customers', href: '/dashboard/crm/customers' },
						{ label: 'Deals', href: '/dashboard/crm/deals', badge: '12' },
						{ label: 'Reports', href: '/dashboard/crm/reports' }
					]
				},
				{ label: 'Ecommerce', href: '/dashboard/ecommerce', icon: ShoppingBag }
			]
		},
		{
			label: 'Apps',
			items: [
				{ label: 'File manager', href: '/apps/files', icon: Folder },
				{ label: 'Chat', href: '/apps/chat', icon: MessageSquare },
				{ label: 'Gen AI', href: '/apps/ai', icon: Bot, badge: 'New' }
			]
		},
		{
			label: 'Admin',
			items: [
				{ label: 'Members', href: '/settings/members', icon: Users },
				{ label: 'Billing', href: '/settings/billing', icon: CreditCard },
				{ label: 'Settings', href: '/settings', icon: Settings, match: 'startsWith' }
			]
		}
	];

	const props = [
		{
			name: 'menuLabel',
			type: 'string',
			default: '"Toggle navigation"',
			description: 'Accessible label for the mobile menu button'
		},
		{
			name: 'sidebarWidth',
			type: 'string',
			default: '"16rem"',
			description: 'Desktop sidebar width'
		},
		{
			name: 'sidebarBreakpoint',
			type: 'number',
			default: '1024',
			description: 'Container width where the sidebar becomes inline'
		},
		{
			name: 'sidebar',
			type: 'Snippet<[() => void]>',
			default: '—',
			description: 'Optional sidebar content receiving closeSidebar'
		},
		{
			name: 'topbar',
			type: 'Snippet<[() => void, boolean, boolean]>',
			default: '—',
			description: 'Custom top bar content receiving toggleSidebar, hasSidebar, and isSidebarInline'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Main content' },
		{ name: 'class', type: 'string', default: '—', description: 'Additional CSS classes' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">AppShell</h1>
		<p class="text-kl-muted-content mt-2">
			A responsive dashboard shell with a desktop sidebar, mobile off-canvas navigation, top bar,
			and scrollable main content.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="With sidebar"
			description="Inject any sidebar markup. Pass closeSidebar to the sidebar onNavigate callback for mobile drawers."
			code={`<AppShell>
  {#snippet sidebar(closeSidebar)}
    <Sidebar {groups} currentPath="/dashboard/crm/deals" onNavigate={closeSidebar} />
  {/snippet}

  {#snippet topbar(toggleSidebar, hasSidebar, isSidebarInline)}
    ...
  {/snippet}

  ...
</AppShell>`}
		>
			<div class="border-kl-base-300 rounded-kl-box h-[760px] overflow-hidden border">
				<AppShell class="h-full min-h-0">
					{#snippet sidebar(closeSidebar)}
						<Sidebar {groups} currentPath="/dashboard/crm/deals" onNavigate={closeSidebar}>
							{#snippet header()}
								<div class="flex items-center gap-2">
									<div
										class="bg-kl-primary text-kl-primary-content rounded-kl-selector flex size-9 items-center justify-center font-bold"
									>
										N
									</div>
									<div class="min-w-0">
										<div class="truncate text-sm font-semibold">Nexus</div>
										<div class="text-kl-muted-content truncate text-xs">Business suite</div>
									</div>
								</div>
							{/snippet}

							{#snippet footer()}
								<div class="flex items-center gap-2">
									<div
										class="bg-kl-secondary text-kl-secondary-content flex size-8 items-center justify-center rounded-full text-xs font-semibold"
									>
										DN
									</div>
									<div class="min-w-0">
										<div class="truncate text-sm font-medium">Denish N</div>
										<div class="text-kl-muted-content truncate text-xs">Team owner</div>
									</div>
								</div>
							{/snippet}
						</Sidebar>
					{/snippet}

					{#snippet topbar(toggleSidebar, hasSidebar, isSidebarInline)}
						<div class="flex w-full items-center gap-3">
							{#if hasSidebar && !isSidebarInline}
								<button
									type="button"
									aria-label="Open navigation"
									onclick={toggleSidebar}
									class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-9 items-center justify-center transition-colors"
								>
									<Menu size={18} aria-hidden="true" />
								</button>
							{/if}
							<div
								class="border-kl-base-300 bg-kl-base-200 text-kl-muted-content rounded-kl-field hidden h-9 w-72 items-center gap-2 border px-3 text-sm md:flex"
							>
								<Search size={15} aria-hidden="true" />
								<span>Search</span>
							</div>
							<div class="ml-auto flex items-center gap-2">
								<button
									type="button"
									aria-label="Notifications"
									class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-9 items-center justify-center transition-colors"
								>
									<Bell size={17} aria-hidden="true" />
								</button>
								<div
									class="bg-kl-primary text-kl-primary-content flex size-8 items-center justify-center rounded-full text-xs font-semibold"
								>
									DN
								</div>
							</div>
						</div>
					{/snippet}

					<div class="space-y-5">
						<div class="flex flex-wrap items-end justify-between gap-3">
							<div>
								<h3 class="text-2xl font-semibold">CRM Overview</h3>
								<p class="text-kl-muted-content mt-1 text-sm">
									Pipeline activity and revenue health.
								</p>
							</div>
							<div class="text-kl-muted-content text-sm">2025 vs. 2026</div>
						</div>

						<div class="grid gap-4 md:grid-cols-3">
							{#each [['Customers', '4,235', '+8.84%'], ['Revenue', '$75,400', '+13.5%'], ['Closed Deals', '574', '-2.4%']] as metric (metric[0])}
								<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
									<div class="text-kl-muted-content text-sm">{metric[0]}</div>
									<div class="mt-3 flex items-end justify-between gap-2">
										<div class="text-2xl font-semibold">{metric[1]}</div>
										<div
											class="rounded-kl-selector bg-kl-success/15 text-kl-success px-2 py-1 text-xs font-semibold"
										>
											{metric[2]}
										</div>
									</div>
								</div>
							{/each}
						</div>

						<div class="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
								<div class="mb-4 flex items-center justify-between">
									<h4 class="font-semibold">Sale Metrics</h4>
									<span class="text-kl-muted-content text-xs">Realtime Sales</span>
								</div>
								<div class="flex h-64 items-end gap-2">
									{#each [34, 48, 58, 72, 64, 86, 52, 74, 44, 92, 66, 79] as value (value)}
										<div class="flex flex-1 items-end gap-1">
											<div
												class="bg-kl-secondary h-[calc(var(--bar)*1%)] flex-1 rounded-t"
												style:--bar={value}
											></div>
											<div
												class="bg-kl-primary h-[calc(var(--bar)*1%)] flex-1 rounded-t"
												style:--bar={Math.max(18, 100 - value)}
											></div>
										</div>
									{/each}
								</div>
							</div>

							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
								<h4 class="font-semibold">Goal Status</h4>
								<p class="text-kl-muted-content mt-1 text-sm">You completed 76% of yearly goal.</p>
								<div class="mt-6">
									<div class="bg-kl-base-300 h-3 overflow-hidden rounded-full">
										<div class="bg-kl-primary h-full w-[76%] rounded-full"></div>
									</div>
									<div class="mt-2 flex justify-between text-xs">
										<span class="text-kl-muted-content">Budget spent</span>
										<span class="font-medium">$22,500 / $30,000</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</AppShell>
			</div>
		</DemoCard>

		<DemoCard
			title="Without sidebar"
			description="Omit the sidebar snippet to use AppShell as a top-bar layout with no reserved sidebar space."
			code={`<AppShell>
  {#snippet topbar()}
    ...
  {/snippet}

  ...
</AppShell>`}
		>
			<div class="border-kl-base-300 rounded-kl-box h-[420px] overflow-hidden border">
				<AppShell class="h-full min-h-0">
					{#snippet topbar(toggleSidebar, hasSidebar, isSidebarInline)}
						<div class="flex w-full items-center gap-3">
							{#if hasSidebar && !isSidebarInline}
								<button
									type="button"
									aria-label="Open navigation"
									onclick={toggleSidebar}
									class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-9 items-center justify-center transition-colors"
								>
									<Menu size={18} aria-hidden="true" />
								</button>
							{/if}
							<div class="min-w-0">
								<div class="truncate text-sm font-semibold">Workspace</div>
								<div class="text-kl-muted-content truncate text-xs">Top bar only</div>
							</div>
							<div class="ml-auto flex items-center gap-2">
								<div
									class="border-kl-base-300 bg-kl-base-200 text-kl-muted-content rounded-kl-field hidden h-9 w-64 items-center gap-2 border px-3 text-sm md:flex"
								>
									<Search size={15} aria-hidden="true" />
									<span>Search</span>
								</div>
								<button
									type="button"
									aria-label="Notifications"
									class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-9 items-center justify-center transition-colors"
								>
									<Bell size={17} aria-hidden="true" />
								</button>
							</div>
						</div>
					{/snippet}

					<div class="grid gap-4 md:grid-cols-3">
						{#each [['Projects', '18'], ['Tasks', '247'], ['Members', '42']] as item (item[0])}
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
								<div class="text-kl-muted-content text-sm">{item[0]}</div>
								<div class="mt-3 text-2xl font-semibold">{item[1]}</div>
							</div>
						{/each}
					</div>
				</AppShell>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={props} />
	</section>
</div>
