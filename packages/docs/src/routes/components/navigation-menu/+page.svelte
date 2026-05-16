<script lang="ts">
	import { NavigationMenu } from '$ui/navigation-menu';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const items = [
		{ label: 'Docs', href: '/getting-started' },
		{
			label: 'Components',
			href: '/components',
			items: [
				{ label: 'Button', href: '/components/button', description: 'Actions and links.' },
				{ label: 'Dialog', href: '/components/dialog', description: 'Modal content.' }
			]
		}
	];
	const productItems = [
		{ label: 'Platform', href: '/components/navigation-menu' },
		{
			label: 'Solutions',
			href: '/components',
			items: [
				{
					label: 'CRM workspace',
					href: '/components/navigation-list',
					description: 'Navigation, filters, and customer operations.'
				},
				{
					label: 'Billing console',
					href: '/components/table',
					description: 'Invoices, payments, and subscription controls.'
				},
				{
					label: 'Support desk',
					href: '/components/command',
					description: 'Search-driven workflows for customer teams.'
				}
			]
		},
		{ label: 'Pricing', href: '/getting-started' }
	];
	const docsItems = [
		{
			label: 'Components',
			href: '/components',
			items: [
				{ label: 'Forms', href: '/components/input', description: 'Input, select, and labels.' },
				{ label: 'Overlays', href: '/components/dialog', description: 'Dialog and alert flows.' },
				{
					label: 'Navigation',
					href: '/components/navigation-menu',
					description: 'Menus and lists.'
				},
				{ label: 'Data display', href: '/components/table', description: 'Tables and status UI.' }
			]
		}
	];
	const simpleItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Theme', href: '/theme' },
		{ label: 'Start', href: '/getting-started' }
	];

	const propsData = [
		{
			name: 'items',
			type: 'NavigationItem[]',
			default: '-',
			description: 'Links and flyout items.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional root classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">NavigationMenu</h1>
		<p class="text-kl-muted-content mt-2">A composed navigation menu built with Bits UI.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Navigation" description="Links and flyouts." code="<NavigationMenu {items} />">
			<NavigationMenu {items} />
		</DemoCard>

		<DemoCard
			title="Product nav"
			description="Mix direct links with a solution flyout."
			code={`<NavigationMenu items={productItems} />`}
		>
			<NavigationMenu items={productItems} />
		</DemoCard>

		<DemoCard
			title="Docs flyout"
			description="Use descriptions to make large navigation choices scannable."
			code={`<NavigationMenu items={docsItems} />`}
		>
			<NavigationMenu items={docsItems} />
		</DemoCard>

		<DemoCard
			title="Simple links"
			description="The same component can render a compact link-only navbar."
			code={`<NavigationMenu items={simpleItems} />`}
		>
			<NavigationMenu items={simpleItems} />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
