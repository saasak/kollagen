<script lang="ts">
	import { Toggle } from '$ui/toggle';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Bold, Italic, Underline } from 'lucide-svelte';

	let controlled = $state(false);
	const scriptClose = '</' + 'script>';
	const withIconsCode = `<script>
  import { Bold, Italic, Underline } from "lucide-svelte";
${scriptClose}

<div class="flex gap-2">
  <Toggle variant="outline"><Bold size={16} /> Bold</Toggle>
  <Toggle variant="outline"><Italic size={16} /> Italic</Toggle>
  <Toggle variant="outline"><Underline size={16} /> Underline</Toggle>
</div>`;

	const propsData = [
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | status color",
			default: "'base'",
			description: 'Semantic color'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Toggle size'
		},
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: "'normal'",
			description: 'Toggle content layout'
		},
		{
			name: 'pressed',
			type: 'boolean',
			default: 'false',
			description: 'Controlled pressed state. Supports bind:pressed'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the toggle' },
		{
			name: 'ariaLabel',
			type: 'string',
			default: '—',
			description: 'Accessible label for icon-only toggles'
		},
		{
			name: 'onPressedChange',
			type: '(pressed: boolean) => void',
			default: '—',
			description: 'Callback when pressed state changes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Button content (label, icons, etc.)'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Toggle</h1>
		<p class="text-kl-muted-content mt-2">
			A two-state button that can be either on or off. Built on bits-ui.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple toggle with a text label."
			code="<Toggle>Bold</Toggle>"
		>
			<Toggle>Bold</Toggle>
		</DemoCard>

		<DemoCard
			title="With icons"
			description="Toggles with icons for formatting actions."
			code={withIconsCode}
		>
			<div class="flex gap-2">
				<Toggle variant="outline"><Bold size={16} /> Bold</Toggle>
				<Toggle variant="outline"><Italic size={16} /> Italic</Toggle>
				<Toggle variant="outline"><Underline size={16} /> Underline</Toggle>
			</div>
		</DemoCard>

		<DemoCard
			title="Variants"
			description="Match Button and Trigger styling props."
			code={`<div class="flex gap-2">
  <Toggle variant="outline" color="primary">Outline</Toggle>
  <Toggle variant="soft" color="secondary">Soft</Toggle>
  <Toggle content="icon" ariaLabel="Bold"><Bold /></Toggle>
</div>`}
		>
			<div class="flex gap-2">
				<Toggle variant="outline" color="primary">Outline</Toggle>
				<Toggle variant="soft" color="secondary">Soft</Toggle>
				<Toggle content="icon" ariaLabel="Bold"><Bold /></Toggle>
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Bind to external state with bind:pressed."
			code={`<Toggle bind:pressed>
  {pressed ? "On" : "Off"}
</Toggle>
<p class="text-sm text-kl-muted-content">State: {pressed}</p>`}
		>
			<div class="space-y-2">
				<Toggle bind:pressed={controlled}>
					{controlled ? 'On' : 'Off'}
				</Toggle>
				<p class="text-kl-muted-content text-sm">State: {controlled}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Toggle in disabled state."
			code={`<div class="flex gap-2">
  <Toggle disabled>Disabled off</Toggle>
  <Toggle disabled pressed={true}>Disabled on</Toggle>
</div>`}
		>
			<div class="flex gap-2">
				<Toggle disabled>Disabled off</Toggle>
				<Toggle disabled pressed={true}>Disabled on</Toggle>
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
