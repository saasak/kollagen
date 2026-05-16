<script lang="ts">
	import { Tooltip } from '$ui/tooltip';
	import { Trigger } from '$ui/trigger';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'content',
			type: 'string',
			default: '—',
			description: 'Text displayed inside the tooltip'
		},
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'delayDuration',
			type: 'number',
			default: '400',
			description: 'Delay in ms before the tooltip opens'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Prevent the tooltip from opening'
		},
		{
			name: 'side',
			type: '"top" | "bottom" | "left" | "right"',
			default: '"top"',
			description: 'Which side of the trigger to place the tooltip on'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '6',
			description: 'Distance in px between the tooltip and the trigger'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '—',
			description: 'Callback when the tooltip opens or closes'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Implicit trigger content, usually a Trigger component'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the tooltip content'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Tooltip</h1>
		<p class="text-kl-muted-content mt-2">
			Informational popup that appears on hover or focus. Supports configurable delays, side/align
			positioning, and controlled state. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Hover over the button to see the tooltip."
			code={`<Tooltip content="Save your progress">
  <Trigger>Hover me</Trigger>
</Tooltip>`}
		>
			<Tooltip content="Save your progress">
				<Trigger color="primary">Hover me</Trigger>
			</Tooltip>
		</DemoCard>

		<DemoCard
			title="Custom placement"
			description="Position the tooltip on different sides of the trigger."
			code={`<Tooltip content="Right side" side="right">
  <Trigger variant="outline">Right</Trigger>
</Tooltip>`}
		>
			<div class="flex gap-4">
				<Tooltip content="Top tooltip" side="top">
					<Trigger variant="outline">Top</Trigger>
				</Tooltip>
				<Tooltip content="Right tooltip" side="right">
					<Trigger variant="outline">Right</Trigger>
				</Tooltip>
				<Tooltip content="Bottom tooltip" side="bottom">
					<Trigger variant="outline">Bottom</Trigger>
				</Tooltip>
				<Tooltip content="Left tooltip" side="left">
					<Trigger variant="outline">Left</Trigger>
				</Tooltip>
			</div>
		</DemoCard>

		<DemoCard
			title="Instant open"
			description="Set delayDuration to 0 for immediate display."
			code={`<Tooltip content="No delay!" delayDuration={0}>
  <Trigger variant="outline">Instant</Trigger>
</Tooltip>`}
		>
			<Tooltip content="No delay!" delayDuration={0}>
				<Trigger variant="outline">Instant tooltip</Trigger>
			</Tooltip>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Tooltip is suppressed when disabled."
			code={`<Tooltip content="You won't see this" disabled={true}>
  <Trigger variant="outline">Disabled tooltip</Trigger>
</Tooltip>`}
		>
			<Tooltip content="You won't see this" disabled={true}>
				<Trigger variant="outline">Disabled tooltip</Trigger>
			</Tooltip>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
