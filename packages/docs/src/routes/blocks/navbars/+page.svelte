<script lang="ts">
	import BrowserDemoCard from '$lib/components/BrowserDemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

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

		<BrowserDemoCard
			title="TopNavBar"
			description="Brand, centered navigation, and action/user menu."
			src="/previews/blocks/navbars/top-navbar"
			height={180}
			code={`<TopNavBar brand={brand} groups={groups} userMenu={userMenu} />`}
		/>

		<BrowserDemoCard
			title="BottomNavBar"
			description="Same layout, with dropdowns opening upward."
			src="/previews/blocks/navbars/bottom-navbar"
			height={240}
			code={`<BottomNavBar brand={brand} groups={groups} action={action} />`}
		/>

		<BrowserDemoCard
			title="SideNavBar"
			description="Collapsible on desktop; fullscreen overlay on mobile when standalone."
			src="/previews/blocks/navbars/side-navbar"
			height={560}
			code={`<SideNavBar brand={brand} groups={groups} userMenu={userMenu} />`}
		/>
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
