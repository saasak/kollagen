<script lang="ts">
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { ArrowRight, Download, Mail, Plus, Save, Trash2 } from 'lucide-svelte';

	let loading = $state(false);

	const propsData = [
		{
			name: 'variant',
			type: "'primary' | 'secondary' | 'accent' | 'neutral' | 'outline' | 'ghost' | 'link' | 'destructive'",
			default: "'primary'",
			description: 'Visual style'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg' | 'icon-sm' | 'icon' | 'icon-lg'",
			default: "'md'",
			description: 'Button size'
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
			title="Variants"
			description="Semantic variants mapped to Kollagen theme tokens."
			code={`<div class="flex flex-wrap gap-2">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="accent">Accent</Button>
  <Button variant="neutral">Neutral</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
</div>`}
		>
			<div class="flex flex-wrap gap-2">
				<Button>Primary</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="accent">Accent</Button>
				<Button variant="neutral">Neutral</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="destructive">Delete</Button>
			</div>
		</DemoCard>

		<DemoCard
			title="Sizes"
			description="Text and icon sizes for dense interfaces."
			code={`<div class="flex flex-wrap items-center gap-2">
  <Button size="xs">Extra small</Button>
  <Button size="sm">Small</Button>
  <Button>Default</Button>
  <Button size="lg">Large</Button>
  <Button size="icon-sm" ariaLabel="Add"><Plus /></Button>
  <Button size="icon" ariaLabel="Save"><Save /></Button>
  <Button size="icon-lg" ariaLabel="Download"><Download /></Button>
</div>`}
		>
			<div class="flex flex-wrap items-center gap-2">
				<Button size="xs">Extra small</Button>
				<Button size="sm">Small</Button>
				<Button>Default</Button>
				<Button size="lg">Large</Button>
				<Button size="icon-sm" ariaLabel="Add"><Plus /></Button>
				<Button size="icon" ariaLabel="Save"><Save /></Button>
				<Button size="icon-lg" ariaLabel="Download"><Download /></Button>
			</div>
		</DemoCard>

		<DemoCard
			title="With icons"
			description="Icons inherit compact spacing and stay fixed-size."
			code={`<div class="flex flex-wrap gap-2">
  <Button><Mail /> Invite</Button>
  <Button variant="outline">Open <ArrowRight /></Button>
  <Button variant="destructive"><Trash2 /> Remove</Button>
</div>`}
		>
			<div class="flex flex-wrap gap-2">
				<Button><Mail /> Invite</Button>
				<Button variant="outline">Open <ArrowRight /></Button>
				<Button variant="destructive"><Trash2 /> Remove</Button>
			</div>
		</DemoCard>

		<DemoCard
			title="Loading"
			description="Loading disables the action and adds a spinner."
			code={`<Button loading={loading} onclick={() => (loading = true)}>
  Save changes
</Button>`}
		>
			<div class="flex items-center gap-2">
				<Button {loading} onclick={() => (loading = true)}>Save changes</Button>
				<Button variant="ghost" size="sm" onclick={() => (loading = false)}>Reset</Button>
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
