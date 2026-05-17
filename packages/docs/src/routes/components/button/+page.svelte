<script lang="ts">
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { ArrowRight, Download, Mail, Plus, Save, Trash2 } from 'lucide-svelte';

	let saving = $state(false);

	const loadingCode = [
		'<script lang="ts">',
		'  let saving = $state(false);',
		'</' + 'script>',
		'',
		'<div class="flex flex-wrap items-center gap-2">',
		'  <Button loading>Saving</Button>',
		'  <Button loading variant="outline" color="primary">Publishing</Button>',
		'  <Button loading={saving} onclick={() => (saving = true)}>',
		'    Save changes',
		'  </Button>',
		'  <Button variant="ghost" size="sm" onclick={() => (saving = false)}>',
		'    Reset',
		'  </Button>',
		'</div>'
	].join('\n');

	const propsData = [
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'",
			default: "'base'",
			description: 'Semantic color'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Button size scale'
		},
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: "'normal'",
			description: 'Content layout; use icon for square icon-only buttons'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the action' },
		{
			name: 'loading',
			type: 'boolean',
			default: 'false',
			description: 'Show a spinner and disable the action'
		},
		{
			name: 'type',
			type: "'button' | 'submit' | 'reset'",
			default: "'button'",
			description: 'Native button type'
		},
		{
			name: 'href',
			type: 'string',
			default: '—',
			description: 'Render as a link when provided'
		},
		{
			name: 'target',
			type: 'string',
			default: '—',
			description: 'Link target when rendered as an anchor'
		},
		{
			name: 'rel',
			type: 'string',
			default: '—',
			description: 'Link rel when rendered as an anchor'
		},
		{
			name: 'download',
			type: 'string | boolean',
			default: '—',
			description: 'Link download attribute when rendered as an anchor'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Native button name for form submission'
		},
		{
			name: 'value',
			type: 'string | number',
			default: '—',
			description: 'Native button value for form submission'
		},
		{
			name: 'title',
			type: 'string',
			default: '—',
			description: 'Native title tooltip'
		},
		{
			name: 'ref',
			type: 'HTMLElement | null',
			default: 'null',
			description: 'Element reference. Supports bind:ref'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: '—',
			description: 'Accessible label for icon-only buttons'
		},
		{
			name: 'onclick',
			type: '(event: MouseEvent) => void',
			default: '—',
			description: 'Click handler'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{
			name: 'data-*',
			type: 'unknown',
			default: '—',
			description: 'Forwarded data attributes on the rendered element'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Button content' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Button</h1>
		<p class="text-kl-muted-content mt-2">
			A compact action control for commands, forms, and links.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Default action button."
			code="<Button>Save changes</Button>"
		>
			<Button>Save changes</Button>
		</DemoCard>

		<DemoCard
			title="Colors"
			description="Semantic colors mapped to Kollagen theme tokens."
			code={`<div class="flex flex-wrap gap-2">
  <Button>Default</Button>
  <Button color="primary">Primary</Button>
  <Button color="secondary">Secondary</Button>
  <Button color="accent">Accent</Button>
  <Button color="neutral">Neutral</Button>
  <Button color="info">Info</Button>
  <Button color="success">Success</Button>
  <Button color="warning">Warning</Button>
  <Button color="error">Error</Button>
</div>`}
		>
			<div class="flex flex-wrap gap-2">
				<Button>Default</Button>
				<Button color="primary">Primary</Button>
				<Button color="secondary">Secondary</Button>
				<Button color="accent">Accent</Button>
				<Button color="neutral">Neutral</Button>
				<Button color="info">Info</Button>
				<Button color="success">Success</Button>
				<Button color="warning">Warning</Button>
				<Button color="error">Error</Button>
			</div>
		</DemoCard>

		<DemoCard
			title="Variants"
			description="Styles compose with any semantic color."
			code={`<div class="flex flex-wrap gap-2">
  <Button variant="outline">Outline</Button>
  <Button variant="dash" color="primary">Dash</Button>
  <Button variant="soft" color="success">Soft</Button>
  <Button variant="ghost" color="error">Ghost error</Button>
  <Button variant="link" color="primary">Link</Button>
</div>`}
		>
			<div class="flex flex-wrap gap-2">
				<Button variant="outline">Outline</Button>
				<Button variant="dash" color="primary">Dash</Button>
				<Button variant="soft" color="success">Soft</Button>
				<Button variant="ghost" color="error">Ghost error</Button>
				<Button variant="link" color="primary">Link</Button>
			</div>
		</DemoCard>

		<DemoCard
			title="Sizes"
			description="Size controls scale; content controls square icon-only layout."
			code={`<div class="flex flex-wrap items-center gap-2">
  <Button size="xs">Extra small</Button>
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button content="icon" size="xs" ariaLabel="Add"><Plus /></Button>
  <Button content="icon" size="sm" ariaLabel="Mail"><Mail /></Button>
  <Button content="icon" size="md" ariaLabel="Save"><Save /></Button>
  <Button content="icon" size="lg" ariaLabel="Download"><Download /></Button>
</div>`}
		>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="xs">Extra small</Button>
				<Button size="sm">Small</Button>
				<Button>Default</Button>
				<Button size="lg">Large</Button>
				<Button content="icon" size="xs" ariaLabel="Add"><Plus /></Button>
				<Button content="icon" size="sm" ariaLabel="Mail"><Mail /></Button>
				<Button content="icon" size="md" ariaLabel="Save"><Save /></Button>
				<Button content="icon" size="lg" ariaLabel="Download"><Download /></Button>
			</div>
		</DemoCard>

		<DemoCard
			title="With icons"
			description="Icons inherit compact spacing and stay fixed-size."
			code={`<div class="flex flex-wrap gap-2">
  <Button><Mail /> Invite</Button>
  <Button variant="outline">Open <ArrowRight /></Button>
  <Button color="error"><Trash2 /> Remove</Button>
</div>`}
		>
			<div class="flex flex-wrap gap-2">
				<Button><Mail /> Invite</Button>
				<Button variant="outline">Open <ArrowRight /></Button>
				<Button color="error"><Trash2 /> Remove</Button>
			</div>
		</DemoCard>

		<DemoCard
			title="Loading"
			description="Loading disables the action, exposes aria-busy, and adds a spinner."
			code={loadingCode}
		>
			<div class="flex flex-wrap items-center gap-2">
				<Button loading>Saving</Button>
				<Button loading variant="outline" color="primary">Publishing</Button>
				<Button loading={saving} onclick={() => (saving = true)}>Save changes</Button>
				<Button variant="ghost" size="sm" onclick={() => (saving = false)}>Reset</Button>
			</div>
		</DemoCard>

		<DemoCard
			title="Link"
			description="Provide href to render an anchor with button styling."
			code={`<Button href="/components/button-group" variant="link">
  Button group
</Button>`}
		>
			<Button href="/components/button-group" variant="link">Button group</Button>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Disabled and loading buttons cannot be activated."
			code={`<div class="flex gap-2">
  <Button disabled>Disabled</Button>
  <Button href="/components/button" disabled>Disabled link</Button>
</div>`}
		>
			<div class="flex gap-2">
				<Button disabled>Disabled</Button>
				<Button href="/components/button" disabled>Disabled link</Button>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
