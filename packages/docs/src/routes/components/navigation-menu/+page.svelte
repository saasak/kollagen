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
	<DemoCard title="Navigation" description="Links and flyouts." code="<NavigationMenu {items} />">
		<NavigationMenu {items} />
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
