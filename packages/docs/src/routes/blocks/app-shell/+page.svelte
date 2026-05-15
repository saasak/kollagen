<script lang="ts">
	import BrowserDemoCard from '$lib/components/BrowserDemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

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
		{ name: 'side', type: '"left" | "right"', default: '"left"', description: 'SideNavBar side' },
		{ name: 'label', type: 'string', default: '—', description: 'Accessible navigation label' },
		{ name: 'brand', type: 'NavBrand', default: '—', description: 'Logo and brand area' },
		{ name: 'groups', type: 'NavGroup[]', default: '[]', description: 'Navigation data' },
		{
			name: 'action',
			type: 'NavAction',
			default: '—',
			description: 'Right-side button for top/bottom bars'
		},
		{
			name: 'userMenu',
			type: 'NavUserMenu',
			default: '—',
			description: 'Avatar dropdown menu declared by the bar'
		},
		{
			name: 'collapsible',
			type: 'boolean',
			default: 'true',
			description: 'Desktop collapse control for SideNavBar'
		},
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
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">AppShell</h1>
		<p class="text-kl-muted-content mt-2">
			NavBars auto-register when rendered inside AppShellProvider; outside a provider they render as
			standalone responsive bars.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<BrowserDemoCard
			title="Side and top navigation"
			description="NavBars register with AppShellProvider; AppShell renders the layout."
			src="/previews/blocks/app-shell/side-and-top-navigation"
			height={760}
			code={`<AppShellProvider currentPath="/dashboard/crm/deals">
  <SideNavBar side="left" brand={brand} groups={sidebarGroups} userMenu={userMenu} />
  <TopNavBar groups={topGroups} action={action} />

  <AppShell>
    ...
  </AppShell>
</AppShellProvider>`}
		/>

		<BrowserDemoCard
			title="Bottom bar on mobile"
			description="Set mobileBar to bottom when the mobile shell should keep the bottom navigation visible."
			src="/previews/blocks/app-shell/bottom-bar-on-mobile"
			height={420}
			code={`<AppShellProvider mobileBar="bottom">
  <BottomNavBar brand={brand} groups={groups} />
  <AppShell>...</AppShell>
</AppShellProvider>`}
		/>

		<BrowserDemoCard
			title="Standalone top bar"
			description="Without AppShellProvider, a NavBar owns its responsive mobile menu."
			src="/previews/blocks/app-shell/standalone-top-bar"
			height={300}
			code={`<TopNavBar
  brand={brand}
  groups={groups}
  userMenu={userMenu}
  currentPath="/solutions/crm"
/>`}
		/>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={providerProps} />
		<PropsTable items={shellProps} />
		<PropsTable items={navProps} />
	</section>
</div>
