<script lang="ts">
	import { Tooltip } from '$ui/tooltip';
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
			name: 'openDelay',
			type: 'number',
			default: '400',
			description: 'Delay in ms before the tooltip opens'
		},
		{
			name: 'closeDelay',
			type: 'number',
			default: '150',
			description: 'Delay in ms before the tooltip closes'
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
			name: 'align',
			type: '"start" | "center" | "end"',
			default: '"center"',
			description: 'Alignment of the tooltip along the trigger edge'
		},
		{
			name: 'alignOffset',
			type: 'number',
			default: '0',
			description: 'Offset in px from the aligned edge'
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
			description: 'The trigger element wrapped by the tooltip'
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
  <button>Hover me</button>
</Tooltip>`}
		>
			<Tooltip content="Save your progress">
				<button
					class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium"
				>
					Hover me
				</button>
			</Tooltip>
		</DemoCard>

		<DemoCard
			title="Custom placement"
			description="Position the tooltip on different sides of the trigger."
			code={`<Tooltip content="Right side" side="right">
  <button>Right</button>
</Tooltip>`}
		>
			<div class="flex gap-4">
				<Tooltip content="Top tooltip" side="top">
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
						>Top</button
					>
				</Tooltip>
				<Tooltip content="Right tooltip" side="right">
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
						>Right</button
					>
				</Tooltip>
				<Tooltip content="Bottom tooltip" side="bottom">
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
						>Bottom</button
					>
				</Tooltip>
				<Tooltip content="Left tooltip" side="left">
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
						>Left</button
					>
				</Tooltip>
			</div>
		</DemoCard>

		<DemoCard
			title="Instant open"
			description="Set openDelay to 0 for immediate display."
			code={`<Tooltip content="No delay!" openDelay={0}>
  <button>Instant</button>
</Tooltip>`}
		>
			<Tooltip content="No delay!" openDelay={0}>
				<button class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm">
					Instant tooltip
				</button>
			</Tooltip>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Tooltip is suppressed when disabled."
			code={`<Tooltip content="You won't see this" disabled={true}>
  <button>Disabled tooltip</button>
</Tooltip>`}
		>
			<Tooltip content="You won't see this" disabled={true}>
				<button class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm">
					Disabled tooltip
				</button>
			</Tooltip>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
