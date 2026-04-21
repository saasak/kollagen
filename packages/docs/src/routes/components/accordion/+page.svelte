<script lang="ts">
	import { Accordion } from '$ui/accordion';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const faqItems = [
		{ value: 'what', label: 'What is Kollagen?' },
		{ value: 'install', label: 'How do I install it?' },
		{ value: 'theme', label: 'Can I customize the theme?' },
		{ value: 'components', label: 'What components are available?' }
	];

	const faqContent: Record<string, string> = {
		what: 'Kollagen is a CLI tool that copies ready-to-use, themed SvelteKit components into your project. Built on Ark UI primitives.',
		install:
			'Run npx kollagen init to scaffold your project, then npx kollagen add <component> to add individual components.',
		theme:
			'Yes! Kollagen uses semantic CSS variables (OKLCH) that you can override. Switch themes via the data-theme attribute on your HTML element.',
		components:
			'Kollagen includes Accordion, Collapsible, ComboBox, and more. Each component is fully composed and ready to use out of the box.'
	};

	let controlledValue = $state<string[]>(['what']);

	const propsData = [
		{
			name: 'items',
			type: 'T[]',
			default: '—',
			description: 'Array of items with value, label, and optional disabled'
		},
		{
			name: 'value',
			type: 'string[]',
			default: '—',
			description: 'Controlled expanded item(s). Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'string[]',
			default: '—',
			description: 'Initial expanded item(s) for uncontrolled mode'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Allow multiple items open simultaneously'
		},
		{
			name: 'collapsible',
			type: 'boolean',
			default: 'true',
			description: 'Allow collapsing an open item by clicking again'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all accordion items'
		},
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"vertical"',
			description: 'Orientation of the accordion'
		},
		{
			name: 'onValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when expanded items change'
		},
		{
			name: 'onFocusChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when focused item changes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{
			name: 'children',
			type: 'Snippet<[T]>',
			default: '—',
			description: 'Content snippet — receives the current item'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Accordion</h1>
		<p class="text-kl-muted-content mt-2">
			Vertically stacked collapsible sections. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Single-expand accordion with collapsible items."
			code={`<Accordion items={faqItems}>
  {#snippet children(item)}
    <p>{faqContent[item.value]}</p>
  {/snippet}
</Accordion>`}
		>
			<div class="max-w-lg">
				<Accordion items={faqItems}>
					{#snippet children(item)}
						<p>{faqContent[item.value]}</p>
					{/snippet}
				</Accordion>
			</div>
		</DemoCard>

		<DemoCard
			title="Multiple"
			description="Allow multiple items to be expanded at the same time."
			code={`<Accordion items={faqItems} multiple={true}>
  {#snippet children(item)}
    <p>{faqContent[item.value]}</p>
  {/snippet}
</Accordion>`}
		>
			<div class="max-w-lg">
				<Accordion items={faqItems} multiple={true}>
					{#snippet children(item)}
						<p>{faqContent[item.value]}</p>
					{/snippet}
				</Accordion>
			</div>
		</DemoCard>

		<DemoCard
			title="Default expanded"
			description="Start with specific items expanded using defaultValue."
			code={`<Accordion items={faqItems} defaultValue={["install", "theme"]}>
  {#snippet children(item)}
    <p>{faqContent[item.value]}</p>
  {/snippet}
</Accordion>`}
		>
			<div class="max-w-lg">
				<Accordion items={faqItems} defaultValue={['install', 'theme']} multiple={true}>
					{#snippet children(item)}
						<p>{faqContent[item.value]}</p>
					{/snippet}
				</Accordion>
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Control the expanded state externally with bind:value."
			code={`<Accordion items={faqItems} bind:value={controlledValue}>
  {#snippet children(item)}
    <p>{faqContent[item.value]}</p>
  {/snippet}
</Accordion>
<p>Open: {controlledValue.join(", ")}</p>`}
		>
			<div class="max-w-lg space-y-3">
				<Accordion items={faqItems} bind:value={controlledValue}>
					{#snippet children(item)}
						<p>{faqContent[item.value]}</p>
					{/snippet}
				</Accordion>
				<p class="text-kl-muted-content text-sm">
					Open: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledValue.join(', ') || '(none)'}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Accordion in fully disabled state."
			code={`<Accordion items={faqItems} disabled={true}>
  {#snippet children(item)}
    <p>{faqContent[item.value]}</p>
  {/snippet}
</Accordion>`}
		>
			<div class="max-w-lg">
				<Accordion items={faqItems} disabled={true}>
					{#snippet children(item)}
						<p>{faqContent[item.value]}</p>
					{/snippet}
				</Accordion>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled items"
			description="Individual items can be disabled via the disabled property."
			code={`<Accordion items={[
  { value: "a", label: "Enabled item" },
  { value: "b", label: "Disabled item", disabled: true },
  { value: "c", label: "Another enabled item" },
]}>
  {#snippet children(item)}
    <p>Content for {item.label}</p>
  {/snippet}
</Accordion>`}
		>
			<div class="max-w-lg">
				<Accordion
					items={[
						{ value: 'a', label: 'Enabled item' },
						{ value: 'b', label: 'Disabled item', disabled: true },
						{ value: 'c', label: 'Another enabled item' }
					]}
				>
					{#snippet children(item)}
						<p>Content for {item.label}</p>
					{/snippet}
				</Accordion>
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
