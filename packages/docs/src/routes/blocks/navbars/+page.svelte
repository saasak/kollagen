<script lang="ts">
	import { BottomNavBar, SideNavBar, TopNavBar, type NavGroup } from '$blocks/app-shell';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		Bot,
		ChartNoAxesColumnIncreasing,
		Folder,
		LayoutDashboard,
		LogOut,
		MessageSquare,
		Settings,
		ShoppingBag
	} from 'lucide-svelte';
	import type { NavAction, NavBrand, NavUserMenu } from '$blocks/app-shell';

	const brand: NavBrand = { label: 'Nexus', logoSrc: '/favicon.png', href: '/dashboard' };

	const horizontalGroups: NavGroup[] = [
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
						{ label: 'Deals', href: '/dashboard/crm/deals', badge: '12' }
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

	const userMenu: NavUserMenu = {
		name: 'Denish N',
		email: 'owner@nexus.test',
		initials: 'DN',
		items: [
			{ label: 'Settings', icon: Settings },
			{ label: 'Log out', icon: LogOut, tone: 'error' }
		]
	};

	const action: NavAction = { label: 'Sign in', href: '/login', color: 'primary' };

	const navProps = [
		{ name: 'label', type: 'string', default: '—', description: 'Accessible navigation label' },
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
			name: 'currentPath',
			type: 'string',
			default: '""',
			description: 'Standalone active state path'
		},
		{
			name: 'menuLabel',
			type: 'string',
			default: '"Open navigation"',
			description: 'Standalone mobile menu label'
		}
	];

	const sideProps = [
		{ name: 'side', type: '"left" | "right"', default: '"left"', description: 'SideNavBar side' },
		{
			name: 'collapsible',
			type: 'boolean',
			default: 'true',
			description: 'Desktop collapse control'
		},
		{
			name: 'collapsed',
			type: 'boolean',
			default: 'false',
			description: 'Controlled collapsed state'
		},
		{
			name: 'onCollapsedChange',
			type: '(collapsed: boolean) => void',
			default: '—',
			description: 'Called when collapse state changes'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">NavBars</h1>
		<p class="text-kl-muted-content mt-2">
			Standalone responsive bars that auto-register when rendered inside AppShellProvider.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="TopNavBar"
			description="Brand, centered navigation, and action/user menu."
			code={`<TopNavBar brand={brand} groups={groups} userMenu={userMenu} />`}
		>
			<div class="rounded-kl-box border-kl-base-300 overflow-hidden border">
				<TopNavBar {brand} groups={horizontalGroups} {userMenu} currentPath="/solutions/crm" />
			</div>
		</DemoCard>

		<DemoCard
			title="BottomNavBar"
			description="Same layout, with dropdowns opening upward."
			code={`<BottomNavBar brand={brand} groups={groups} action={action} />`}
		>
			<div class="rounded-kl-box border-kl-base-300 overflow-hidden border">
				<div class="bg-kl-base-200 min-h-32 p-4">
					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
						<div class="font-semibold">Content above the bottom bar</div>
						<div class="text-kl-muted-content mt-1 text-sm">Dropdowns open upward.</div>
					</div>
				</div>
				<BottomNavBar {brand} groups={horizontalGroups} {action} currentPath="/pricing" />
			</div>
		</DemoCard>

		<DemoCard
			title="SideNavBar"
			description="Collapsible on desktop; fullscreen overlay on mobile when standalone."
			code={`<SideNavBar brand={brand} groups={groups} userMenu={userMenu} />`}
		>
			<div
				class="rounded-kl-box border-kl-base-300 bg-kl-base-200 h-[560px] overflow-hidden border"
			>
				<SideNavBar {brand} groups={sidebarGroups} {userMenu} currentPath="/dashboard/crm/deals" />
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">TopNavBar / BottomNavBar Props</h2>
		<PropsTable items={navProps} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">SideNavBar Props</h2>
		<PropsTable items={[...navProps, ...sideProps]} />
	</section>
</div>
