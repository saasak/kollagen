<script lang="ts">
	import { TreeView } from '$ui/tree-view';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const fileSystem = [
		{
			value: 'src',
			label: 'src',
			children: [
				{
					value: 'components',
					label: 'components',
					children: [
						{ value: 'Button.svelte', label: 'Button.svelte' },
						{ value: 'Input.svelte', label: 'Input.svelte' }
					]
				},
				{
					value: 'routes',
					label: 'routes',
					children: [{ value: 'index.svelte', label: '+page.svelte' }]
				},
				{ value: 'app.css', label: 'app.css' }
			]
		},
		{
			value: 'package.json',
			label: 'package.json'
		},
		{
			value: 'svelte.config.js',
			label: 'svelte.config.js'
		}
	];

	const orgChart = [
		{
			value: 'engineering',
			label: 'Engineering',
			children: [
				{
					value: 'frontend',
					label: 'Frontend',
					children: [
						{ value: 'alice', label: 'Alice' },
						{ value: 'bob', label: 'Bob' }
					]
				},
				{
					value: 'backend',
					label: 'Backend',
					children: [
						{ value: 'carol', label: 'Carol' },
						{ value: 'dave', label: 'Dave' }
					]
				}
			]
		},
		{
			value: 'design',
			label: 'Design',
			children: [
				{ value: 'eve', label: 'Eve' },
				{ value: 'frank', label: 'Frank' }
			]
		}
	];

	const disabledNodes = [
		{
			value: 'docs',
			label: 'docs',
			children: [
				{ value: 'readme', label: 'README.md' },
				{ value: 'license', label: 'LICENSE', disabled: true }
			]
		},
		{ value: 'config', label: 'config.json', disabled: true },
		{ value: 'main', label: 'main.ts' }
	];

	// eslint-disable-next-line no-useless-assignment -- $state() initial value is used by Svelte reactivity
	let selectedValue = $state<string[]>([]);

	const propsData = [
		{
			name: 'nodes',
			type: 'TreeNode[]',
			default: '—',
			description: 'Array of tree nodes to render'
		},
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Optional label rendered above the tree'
		},
		{
			name: 'selectedValue',
			type: 'string[]',
			default: '[]',
			description: 'Controlled selected node values. Supports bind:selectedValue'
		},
		{
			name: 'expandedValue',
			type: 'string[]',
			default: '[]',
			description: 'Controlled expanded branch values. Supports bind:expandedValue'
		},
		{
			name: 'selectionMode',
			type: '"single" | "multiple"',
			default: '"single"',
			description: 'Whether one or multiple nodes can be selected'
		},
		{
			name: 'onSelectionChange',
			type: '(details: { value: string[] }) => void',
			default: '—',
			description: 'Callback when selection changes'
		},
		{
			name: 'onExpandedChange',
			type: '(details: { value: string[] }) => void',
			default: '—',
			description: 'Callback when expanded branches change'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">TreeView</h1>
		<p class="text-kl-muted-content mt-2">
			Hierarchical tree structure for displaying nested data. Supports single and multiple
			selection, keyboard navigation, and controlled state.
		</p>
	</div>

	<!-- Examples -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="File system tree with expandable folders and leaf files."
			code={`<TreeView nodes={fileSystem} label="Project" />`}
		>
			<div class="max-w-xs">
				<TreeView nodes={fileSystem} label="Project" />
			</div>
		</DemoCard>

		<DemoCard
			title="Multiple selection"
			description="Select multiple nodes at once with selectionMode='multiple'."
			code={`<TreeView nodes={orgChart} selectionMode="multiple" label="Org Chart" />`}
		>
			<div class="max-w-xs">
				<TreeView nodes={orgChart} selectionMode="multiple" label="Org Chart" />
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled selection"
			description="Track selected nodes via bind:selectedValue."
			code={`<script>
  let selectedValue = $state([]);
</script>

<TreeView
  nodes={fileSystem}
  bind:selectedValue
/>
{#if selectedValue.length}
  <p>Selected: {selectedValue.join(', ')}</p>
{/if}`}
		>
			<div class="max-w-xs space-y-3">
				<TreeView nodes={fileSystem} bind:selectedValue />
				{#if selectedValue.length}
					<p class="text-kl-muted-content text-sm">
						Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{selectedValue.join(', ')}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled nodes"
			description="Individual nodes or entire branches can be disabled."
			code={`<TreeView nodes={[
  { value: 'docs', label: 'docs', children: [
    { value: 'readme', label: 'README.md' },
    { value: 'license', label: 'LICENSE', disabled: true },
  ]},
  { value: 'config', label: 'config.json', disabled: true },
  { value: 'main', label: 'main.ts' },
]} />`}
		>
			<div class="max-w-xs">
				<TreeView nodes={disabledNodes} />
			</div>
		</DemoCard>

		<DemoCard
			title="Pre-expanded branches"
			description="Use expandedValue to open branches on mount."
			code={`<TreeView
  nodes={fileSystem}
  expandedValue={['src', 'components']}
/>`}
		>
			<div class="max-w-xs">
				<TreeView nodes={fileSystem} expandedValue={['src', 'components']} />
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
