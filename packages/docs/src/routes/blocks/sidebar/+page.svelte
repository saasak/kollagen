<script lang="ts">
	import { Sidebar, SidebarNavigation, type NavGroup } from '$blocks/sidebar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		Bot,
		ChartNoAxesColumnIncreasing,
		CreditCard,
		Folder,
		LayoutDashboard,
		MessageSquare,
		Settings,
		ShoppingBag,
		Users
	} from 'lucide-svelte';

	const groups: NavGroup[] = [
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
		{ name: 'groups', type: 'NavGroup[]', default: '[]', description: 'Navigation groups' },
		{
			name: 'currentPath',
			type: 'string',
			default: '""',
			description: 'Current pathname used for active state'
		},
		{
			name: 'match',
			type: '"exact" | "startsWith"',
			default: '"exact"',
			description: 'Default active matching strategy'
		},
		{ name: 'collapsed', type: 'boolean', default: 'false', description: 'Icon-only rendering' },
		{
			name: 'onNavigate',
			type: '() => void',
			default: '—',
			description: 'Called after a link click'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Sidebar</h1>
		<p class="text-kl-muted-content mt-2">
			Vertical navigation primitives used by sidebars and the mobile AppShell navigation.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Dashboard sidebar"
			description="The wrapper keeps header/footer slots while delegating navigation to SidebarNavigation."
			code={`<Sidebar {groups} currentPath="/dashboard/crm/deals">
  {#snippet header()}...{/snippet}
  {#snippet footer()}...{/snippet}
</Sidebar>`}
		>
			<div
				class="rounded-kl-box border-kl-base-300 bg-kl-base-200 h-[680px] overflow-hidden border"
			>
				<Sidebar {groups} currentPath="/dashboard/crm/deals">
					{#snippet header()}
						<div class="flex items-center gap-2">
							<div
								class="rounded-kl-selector bg-kl-primary text-kl-primary-content flex size-9 items-center justify-center font-bold"
							>
								N
							</div>
							<div class="min-w-0">
								<div class="truncate text-sm font-semibold">Nexus</div>
								<div class="text-kl-muted-content truncate text-xs">Operations</div>
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
								<div class="text-kl-muted-content truncate text-xs">@withden</div>
							</div>
						</div>
					{/snippet}
				</Sidebar>
			</div>
		</DemoCard>

		<DemoCard
			title="Navigation renderer"
			description="Use SidebarNavigation directly when a shell owns the surrounding chrome."
			code={`<SidebarNavigation {groups} currentPath="/dashboard/crm" />
<SidebarNavigation {groups} currentPath="/dashboard/crm" collapsed />`}
		>
			<div class="grid gap-4 lg:grid-cols-[16rem_4rem]">
				<div
					class="rounded-kl-box border-kl-base-300 bg-kl-base-100 h-[420px] overflow-hidden border"
				>
					<SidebarNavigation {groups} currentPath="/dashboard/crm" />
				</div>
				<div
					class="rounded-kl-box border-kl-base-300 bg-kl-base-100 h-[420px] overflow-hidden border"
				>
					<SidebarNavigation {groups} currentPath="/dashboard/crm" collapsed />
				</div>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={props} />
	</section>
</div>
