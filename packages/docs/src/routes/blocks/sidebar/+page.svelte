<script lang="ts">
	import { Sidebar } from '$blocks/sidebar';
	import type { SidebarGroup } from '$blocks/sidebar';
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
		{ name: 'groups', type: 'SidebarGroup[]', default: '[]', description: 'Navigation groups' },
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
		{ name: 'header', type: 'Snippet', default: '—', description: 'Custom header content' },
		{ name: 'footer', type: 'Snippet', default: '—', description: 'Custom footer content' },
		{
			name: 'onNavigate',
			type: '() => void',
			default: '—',
			description: 'Called after a sidebar link click'
		},
		{ name: 'class', type: 'string', default: '—', description: 'Additional CSS classes' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Sidebar</h1>
		<p class="text-kl-muted-content mt-2">
			A dashboard sidebar with grouped navigation, two-level menu items, active URL matching, and
			custom header and footer snippets.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Dashboard navigation"
			description="Groups, parent entries, child entries, badges, and startsWith matching."
			code={`<Sidebar
  {groups}
  currentPath="/dashboard/crm/deals"
>
  {#snippet header()}
    ...
  {/snippet}

  {#snippet footer()}
    ...
  {/snippet}
</Sidebar>`}
		>
			<div
				class="border-kl-base-300 bg-kl-base-200 rounded-kl-box h-[680px] overflow-hidden border"
			>
				<Sidebar {groups} currentPath="/dashboard/crm/deals">
					{#snippet header()}
						<div class="flex items-center gap-2">
							<div
								class="bg-kl-primary text-kl-primary-content rounded-kl-selector flex size-9 items-center justify-center font-bold"
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
			title="URL matching"
			description="Use exact matching by default and opt into startsWith per parent section."
			code={`const groups = [{
  label: "Overview",
  items: [{
    label: "CRM",
    href: "/dashboard/crm",
    match: "startsWith",
    children: [...]
  }]
}];`}
		>
			<div class="grid gap-4 lg:grid-cols-2">
				<div class="border-kl-base-300 rounded-kl-box overflow-hidden border">
					<Sidebar {groups} currentPath="/dashboard/crm" class="h-[420px] w-full" />
				</div>
				<div class="border-kl-base-300 rounded-kl-box overflow-hidden border">
					<Sidebar {groups} currentPath="/dashboard/crm/reports" class="h-[420px] w-full" />
				</div>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={props} />
	</section>
</div>
