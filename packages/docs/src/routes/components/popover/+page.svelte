<script lang="ts">
	import { Popover } from '$ui/popover';
	import { Trigger } from '$ui/trigger';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{ name: 'title', type: 'string', default: '—', description: 'Popover heading text' },
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Popover description text below the title'
		},
		{
			name: 'side',
			type: '"top" | "bottom" | "left" | "right"',
			default: '"bottom"',
			description: 'Side placement'
		},
		{
			name: 'sideOffset',
			type: 'number',
			default: '8',
			description: 'Offset from the trigger'
		},
		{
			name: 'align',
			type: '"start" | "center" | "end"',
			default: '"center"',
			description: 'Alignment along the side'
		},
		{
			name: 'alignOffset',
			type: 'number',
			default: '0',
			description: 'Alignment offset'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '—',
			description: 'Callback when the popover opens or closes'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Implicit trigger content, usually a Trigger component'
		},
		{
			name: 'body',
			type: 'Snippet<[{ close: () => void }]>',
			default: '—',
			description: 'Popover body content. Receives a close function.'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the content panel'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Popover</h1>
		<p class="text-kl-muted-content mt-2">
			A floating panel anchored to a trigger element. Ideal for contextual forms, details, or
			actions. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Click the trigger to open the popover."
			code={`<Popover title="Dimensions" description="Set the dimensions for the layer.">
  <Trigger>Open popover</Trigger>
  {#snippet body()}
    <div class="grid gap-2">
      <label class="text-sm">Width</label>
      <input type="text" value="100%" class="rounded-kl-field border border-kl-base-300 bg-kl-base-100 px-3 py-1.5 text-sm" />
    </div>
  {/snippet}
</Popover>`}
		>
			<Popover title="Dimensions" description="Set the dimensions for the layer.">
				<Trigger color="primary">Open popover</Trigger>
				{#snippet body()}
					<div class="grid gap-2">
						<label for="popover-width" class="text-kl-base-content text-sm">Width</label>
						<input
							id="popover-width"
							type="text"
							value="100%"
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-3 py-1.5 text-sm"
						/>
					</div>
				{/snippet}
			</Popover>
		</DemoCard>

		<DemoCard
			title="Custom placement"
			description="Position the popover on different sides."
			code={`<Popover title="Settings" side="right">
  <Trigger>Right</Trigger>
  {#snippet body()}
    <p>Content goes here.</p>
  {/snippet}
</Popover>`}
		>
			<div class="flex gap-4">
				<Popover title="Top" side="top">
					<Trigger variant="outline">Top</Trigger>
					{#snippet body()}
						<p class="text-kl-muted-content text-sm">Popover positioned on top.</p>
					{/snippet}
				</Popover>
				<Popover title="Right" side="right">
					<Trigger variant="outline">Right</Trigger>
					{#snippet body()}
						<p class="text-kl-muted-content text-sm">Popover positioned on the right.</p>
					{/snippet}
				</Popover>
				<Popover title="Bottom" side="bottom">
					<Trigger variant="outline">Bottom</Trigger>
					{#snippet body()}
						<p class="text-kl-muted-content text-sm">Popover positioned on the bottom.</p>
					{/snippet}
				</Popover>
			</div>
		</DemoCard>

		<DemoCard
			title="With form content"
			description="Popovers can contain interactive form elements."
			code={`<Popover title="Feedback" description="How are we doing?">
  <Trigger color="secondary">Give feedback</Trigger>
  {#snippet body({ close })}
    <div class="grid gap-3">
      <textarea rows="3" placeholder="Your feedback..." class="..." />
      <button onclick={close} class="...">Submit</button>
    </div>
  {/snippet}
</Popover>`}
		>
			<Popover title="Feedback" description="How are we doing?">
				<Trigger color="secondary">Give feedback</Trigger>
				{#snippet body({ close })}
					<div class="grid gap-3">
						<textarea
							rows={3}
							placeholder="Your feedback..."
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-3 py-1.5 text-sm"
						></textarea>
						<button
							onclick={close}
							class="rounded-kl-field bg-kl-primary text-kl-primary-content px-3 py-1.5 text-sm font-medium"
						>
							Submit
						</button>
					</div>
				{/snippet}
			</Popover>
		</DemoCard>

		<DemoCard
			title="Initially open"
			description="Start with the popover open using bind:open."
			code={`<Popover title="Welcome" description="This popover opens by default." open={true}>
  <Trigger variant="outline">Already open</Trigger>
  {#snippet body()}
    <p>Popover content here.</p>
  {/snippet}
</Popover>`}
		>
			<Popover title="Welcome" description="This popover opens by default." open={true}>
				<Trigger variant="outline">Already open</Trigger>
				{#snippet body()}
					<p class="text-kl-muted-content text-sm">Popover content here.</p>
				{/snippet}
			</Popover>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
