<script lang="ts">
	import { Breadcrumb } from '$ui/breadcrumb';
	import { Home, ShoppingBag, FolderOpen } from 'lucide-svelte';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const basicItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Headphones' }
	];

	const longTrail = [
		{ label: 'Home', href: '/' },
		{ label: 'Electronics', href: '/electronics' },
		{ label: 'Audio', href: '/audio' },
		{ label: 'Headphones', href: '/headphones' },
		{ label: 'Wireless', href: '/wireless' },
		{ label: 'Sony WH-1000XM5' }
	];

	const disabledItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Archived', href: '/archived', disabled: true },
		{ label: 'Old Product' }
	];

	const propsData = [
		{
			name: 'items',
			type: 'BreadcrumbItem[]',
			default: '—',
			description: 'Array of breadcrumb items from root to current page'
		},
		{
			name: 'separator',
			type: 'Snippet',
			default: 'ChevronRight icon',
			description: 'Custom separator snippet rendered between items'
		},
		{
			name: 'maxItems',
			type: 'number',
			default: '0',
			description: 'Max visible items before truncation. 0 = show all'
		},
		{
			name: 'label',
			type: 'string',
			default: '"Breadcrumb"',
			description: 'Accessible aria-label for the nav element'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root nav element'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Breadcrumb</h1>
		<p class="text-kl-muted-content mt-2">
			Navigation breadcrumbs showing the current page's location within a hierarchy. Semantic HTML
			with proper WAI-ARIA attributes.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple breadcrumb trail. The last item is automatically marked as the current page."
			code={`<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Headphones" },
  ]}
/>`}
		>
			<Breadcrumb items={basicItems} />
		</DemoCard>

		<DemoCard
			title="With icons"
			description="Items can include per-item icons using Svelte 5 snippets."
			code={`<Breadcrumb
  items={[
    { label: "Home", href: "/", icon: homeIcon },
    { label: "Products", href: "/products", icon: productsIcon },
    { label: "Headphones" },
  ]}
/>`}
		>
			<Breadcrumb
				items={[
					{ label: 'Home', href: '/', icon: homeIcon },
					{ label: 'Products', href: '/products', icon: productsIcon },
					{ label: 'Files', icon: filesIcon }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Truncated"
			description="Long trails collapse with an ellipsis when maxItems is set. Shows the first item, ellipsis, and last N items."
			code={`<Breadcrumb
  items={longTrail}
  maxItems={3}
/>`}
		>
			<Breadcrumb items={longTrail} maxItems={3} />
		</DemoCard>

		<DemoCard
			title="Custom separator"
			description="Override the default chevron separator with any snippet."
			code={`<Breadcrumb items={items}>
  {#snippet separator()}
    <span class="text-xs">/</span>
  {/snippet}
</Breadcrumb>`}
		>
			<Breadcrumb items={basicItems}>
				{#snippet separator()}
					<span class="text-xs">/</span>
				{/snippet}
			</Breadcrumb>
		</DemoCard>

		<DemoCard
			title="Disabled items"
			description="Individual items can be disabled to prevent navigation."
			code={`<Breadcrumb
  items={[
    { label: "Home", href: "/" },
    { label: "Archived", href: "/archived", disabled: true },
    { label: "Old Product" },
  ]}
/>`}
		>
			<Breadcrumb items={disabledItems} />
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>

{#snippet homeIcon()}
	<Home size={14} />
{/snippet}

{#snippet productsIcon()}
	<ShoppingBag size={14} />
{/snippet}

{#snippet filesIcon()}
	<FolderOpen size={14} />
{/snippet}
