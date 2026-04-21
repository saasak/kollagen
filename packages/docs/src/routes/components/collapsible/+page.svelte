<script lang="ts">
	import { Collapsible } from '$ui/collapsible';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledOpen = $state(false);

	const propsData = [
		{ name: 'label', type: 'string', default: '—', description: 'The trigger label text' },
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'defaultOpen',
			type: 'boolean',
			default: '—',
			description: 'Initial open state for uncontrolled mode'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether the collapsible is disabled'
		},
		{
			name: 'onOpenChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when open state changes'
		},
		{
			name: 'lazyMount',
			type: 'boolean',
			default: 'false',
			description: 'Lazy mount the content (only render when first opened)'
		},
		{
			name: 'unmountOnExit',
			type: 'boolean',
			default: 'false',
			description: 'Unmount content DOM when collapsed'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Custom trigger snippet to replace the default label'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Content to display when expanded'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Collapsible</h1>
		<p class="text-kl-muted-content mt-2">
			A panel that toggles between expanded and collapsed states. Built on bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple collapsible with a label trigger."
			code={`<Collapsible label="Show details">
  <p>Here are the details you were looking for.</p>
</Collapsible>`}
		>
			<div class="max-w-md">
				<Collapsible label="Show details">
					<p>Here are the details you were looking for.</p>
				</Collapsible>
			</div>
		</DemoCard>

		<DemoCard
			title="Default open"
			description="Starts in the expanded state."
			code={`<Collapsible label="Already open" defaultOpen={true}>
  <p>This content is visible on load.</p>
</Collapsible>`}
		>
			<div class="max-w-md">
				<Collapsible label="Already open" defaultOpen={true}>
					<p>This content is visible on load.</p>
				</Collapsible>
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Open state controlled externally via bind:open."
			code={`<button onclick={() => open = !open}>
  {open ? 'Close' : 'Open'}
</button>
<Collapsible label="Controlled panel" bind:open>
  <p>Controlled from outside the component.</p>
</Collapsible>`}
		>
			<div class="max-w-md space-y-3">
				<button
					onclick={() => (controlledOpen = !controlledOpen)}
					class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
				>
					{controlledOpen ? 'Close' : 'Open'}
				</button>
				<Collapsible label="Controlled panel" bind:open={controlledOpen}>
					<p>Controlled from outside the component.</p>
				</Collapsible>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Collapsible in disabled state."
			code={`<Collapsible label="Cannot toggle" disabled={true}>
  <p>You should not see this.</p>
</Collapsible>`}
		>
			<div class="max-w-md">
				<Collapsible label="Cannot toggle" disabled={true}>
					<p>You should not see this.</p>
				</Collapsible>
			</div>
		</DemoCard>

		<DemoCard
			title="Lazy mount"
			description="Content is only rendered in the DOM when first opened."
			code={`<Collapsible label="Lazy content" lazyMount={true}>
  <p>This was not in the DOM until you opened it.</p>
</Collapsible>`}
		>
			<div class="max-w-md">
				<Collapsible label="Lazy content" lazyMount={true}>
					<p>This was not in the DOM until you opened it.</p>
				</Collapsible>
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
