<script lang="ts">
	import {
		AppShell,
		AppShellProvider,
		BottomNavBar,
		SideNavBar,
		TopNavBar,
		type NavGroup
	} from '$blocks/app-shell';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		Bot,
		ChartNoAxesColumnIncreasing,
		Folder,
		LayoutDashboard,
		LogOut,
		MessageSquare,
		ShoppingBag
	} from 'lucide-svelte';

	const sidebarGroups: NavGroup[] = [
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
		}
	];

	const topGroups: NavGroup[] = [
		{
			items: [
				{ label: 'Product', href: '/product' },
				{
					label: 'Solutions',
					href: '/solutions',
					children: [
						{ label: 'CRM', href: '/solutions/crm', description: 'Pipeline and account work' },
						{ label: 'Commerce', href: '/solutions/commerce', description: 'Orders and revenue' }
					]
				},
				{ label: 'Pricing', href: '/pricing' }
			]
		}
	];

	const providerProps = [
		{
			name: 'currentPath',
			type: 'string',
			default: '""',
			description: 'Path used for active nav state'
		},
		{
			name: 'mobileBar',
			type: '"top" | "bottom"',
			default: '"top"',
			description: 'Which bar remains visible on mobile'
		},
		{
			name: 'sidebarBreakpoint',
			type: 'number',
			default: '1024',
			description: 'Container width where sidebars become inline'
		}
	];

	const shellProps = [
		{
			name: 'menuLabel',
			type: 'string',
			default: '"Open navigation"',
			description: 'Accessible label for the mobile menu button'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Main content' },
		{ name: 'class', type: 'string', default: '—', description: 'Additional CSS classes' }
	];

	const navProps = [
		{ name: 'brand', type: 'NavBrand', default: '—', description: 'Logo and brand area' },
		{ name: 'groups', type: 'NavGroup[]', default: '[]', description: 'Navigation data' },
		{
			name: 'action',
			type: 'NavAction',
			default: '—',
			description: 'Right-side button for top/bottom bars'
		},
		{ name: 'userMenu', type: 'NavUserMenu', default: '—', description: 'Avatar dropdown menu' },
		{
			name: 'collapsible',
			type: 'boolean',
			default: 'true',
			description: 'Desktop collapse control for SideNavBar'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">AppShell</h1>
		<p class="text-kl-muted-content mt-2">
			Provider-driven application shell with registered top, bottom, left, and right NavBars.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Sidebar and top navigation"
			description="NavBars register with AppShellProvider; AppShell renders the layout."
			code={`<AppShellProvider currentPath="/dashboard/crm/deals">
  <SideNavBar side="left" brand={brand} groups={sidebarGroups} userMenu={userMenu} />
  <TopNavBar brand={brand} groups={topGroups} action={action} />

  <AppShell>
    ...
  </AppShell>
</AppShellProvider>`}
		>
			<div class="rounded-kl-box border-kl-base-300 h-[760px] overflow-hidden border">
				<AppShellProvider currentPath="/dashboard/crm/deals">
					<SideNavBar
						side="left"
						brand={{ label: 'Nexus', logoSrc: '/favicon.png', href: '/dashboard' }}
						groups={sidebarGroups}
						userMenu={{
							name: 'Denish N',
							email: 'owner@nexus.test',
							initials: 'DN',
							items: [{ label: 'Log out', icon: LogOut, tone: 'error' }]
						}}
					/>
					<TopNavBar
						brand={{ label: 'Nexus', logoSrc: '/favicon.png', href: '/dashboard' }}
						groups={topGroups}
						action={{ label: 'Upgrade', href: '/billing', color: 'primary' }}
					/>

					<AppShell class="h-full min-h-0">
						<div class="space-y-5">
							<div class="flex flex-wrap items-end justify-between gap-3">
								<div>
									<h3 class="text-2xl font-semibold">CRM Overview</h3>
									<p class="text-kl-muted-content mt-1 text-sm">
										Pipeline activity and revenue health.
									</p>
								</div>
								<div class="text-kl-muted-content text-sm">2026</div>
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

							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
								<div class="mb-4 flex items-center justify-between">
									<h4 class="font-semibold">Sales metrics</h4>
									<span class="text-kl-muted-content text-xs">Realtime</span>
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
						</div>
					</AppShell>
				</AppShellProvider>
			</div>
		</DemoCard>

		<DemoCard
			title="Bottom bar on mobile"
			description="Set mobileBar to bottom when the mobile shell should keep the bottom navigation visible."
			code={`<AppShellProvider mobileBar="bottom">
  <BottomNavBar brand={brand} groups={groups} />
  <AppShell>...</AppShell>
</AppShellProvider>`}
		>
			<div class="rounded-kl-box border-kl-base-300 h-[420px] overflow-hidden border">
				<AppShellProvider currentPath="/product" mobileBar="bottom">
					<BottomNavBar
						brand={{ label: 'Storefront', logoSrc: '/favicon.png', href: '/product' }}
						groups={topGroups}
						action={{ label: 'Sign in', href: '/login', color: 'neutral' }}
					/>
					<AppShell class="h-full min-h-0">
						<div class="grid gap-4 md:grid-cols-3">
							{#each [['Orders', '1,248'], ['Revenue', '$28.4k'], ['Conversion', '7.8%']] as item (item[0])}
								<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
									<div class="text-kl-muted-content text-sm">{item[0]}</div>
									<div class="mt-3 text-2xl font-semibold">{item[1]}</div>
								</div>
							{/each}
						</div>
					</AppShell>
				</AppShellProvider>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={providerProps} />
		<PropsTable items={shellProps} />
		<PropsTable items={navProps} />
	</section>
</div>
