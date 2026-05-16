<script lang="ts">
	import { NavigationList, type NavGroup } from '$ui/navigation-list';
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
	const simpleGroups: NavGroup[] = [
		{
			items: [
				{ label: 'Profile', href: '/settings/profile', icon: Users },
				{ label: 'Billing', href: '/settings/billing', icon: CreditCard },
				{ label: 'Security', href: '/settings/security', icon: Settings, disabled: true }
			]
		}
	];

	let lastNavigation = $state('No navigation click yet');

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
		},
		{
			name: 'label',
			type: 'string',
			default: '"Navigation"',
			description: 'Accessible nav label'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">NavigationList</h1>
		<p class="text-kl-muted-content mt-2">
			Vertical navigation renderer used by SideNavBar and AppShell mobile drawers.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Expanded"
			description="Grouped vertical navigation with nested links and badges."
			code={`<NavigationList {groups} currentPath="/dashboard/crm/deals" />`}
		>
			<div
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 h-[420px] overflow-hidden border"
			>
				<NavigationList {groups} currentPath="/dashboard/crm/deals" />
			</div>
		</DemoCard>

		<DemoCard
			title="Collapsed"
			description="Icon-only rendering for condensed side navigation."
			code={`<NavigationList {groups} currentPath="/dashboard/crm" collapsed />`}
		>
			<div
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 h-[420px] w-16 overflow-hidden border"
			>
				<NavigationList {groups} currentPath="/dashboard/crm" collapsed />
			</div>
		</DemoCard>

		<DemoCard
			title="Exact matching"
			description="Use simple groups for settings drawers and exact active states."
			code={`<NavigationList
  groups={simpleGroups}
  currentPath="/settings/billing"
  match="exact"
/>`}
		>
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 max-w-sm overflow-hidden border">
				<NavigationList
					groups={simpleGroups}
					currentPath="/settings/billing"
					match="exact"
					label="Settings"
				/>
			</div>
		</DemoCard>

		<DemoCard
			title="Navigation callback"
			description="Use onNavigate to close mobile drawers after a link click."
			code={`<NavigationList
  {groups}
  currentPath="/apps/chat"
  onNavigate={() => closeDrawer()}
/>`}
		>
			<div class="space-y-3">
				<div
					class="rounded-kl-box border-kl-base-300 bg-kl-base-100 h-64 max-w-sm overflow-hidden border"
				>
					<NavigationList
						{groups}
						currentPath="/apps/chat"
						onNavigate={() => (lastNavigation = 'Navigation callback fired')}
					/>
				</div>
				<p class="text-kl-muted-content text-sm">{lastNavigation}</p>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={props} />
	</section>
</div>
