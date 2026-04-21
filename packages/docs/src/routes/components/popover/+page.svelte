<script lang="ts">
	import { Popover } from '$ui/popover';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'defaultOpen',
			type: 'boolean',
			default: 'false',
			description: 'Initial open state for uncontrolled mode'
		},
		{ name: 'title', type: 'string', default: '—', description: 'Popover heading text' },
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Popover description text below the title'
		},
		{
			name: 'closeOnInteractOutside',
			type: 'boolean',
			default: 'true',
			description: 'Close the popover when clicking outside'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close the popover on Escape key'
		},
		{
			name: 'modal',
			type: 'boolean',
			default: 'false',
			description: 'Whether the popover traps focus like a modal'
		},
		{
			name: 'autoFocus',
			type: 'boolean',
			default: 'true',
			description: 'Auto-focus the first focusable element when opened'
		},
		{
			name: 'positioning',
			type: 'PositioningOptions',
			default: '—',
			description: 'Popper.js positioning options (placement, offset, etc.)'
		},
		{
			name: 'onOpenChange',
			type: '(details: { open: boolean }) => void',
			default: '—',
			description: 'Callback when the popover opens or closes'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Trigger element that toggles the popover'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Popover body content' },
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
			actions. Built on Ark UI.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Click the trigger to open the popover."
			code={`<Popover title="Dimensions" description="Set the dimensions for the layer.">
  {#snippet trigger()}
    <button>Open popover</button>
  {/snippet}
  <div class="grid gap-2">
    <label class="text-sm">Width</label>
    <input type="text" value="100%" class="rounded-kl-field border border-kl-base-300 bg-kl-base-100 px-3 py-1.5 text-sm" />
  </div>
</Popover>`}
		>
			<Popover title="Dimensions" description="Set the dimensions for the layer.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium"
					>
						Open popover
					</button>
				{/snippet}
				<div class="grid gap-2">
					<label class="text-kl-base-content text-sm">Width</label>
					<input
						type="text"
						value="100%"
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-3 py-1.5 text-sm"
					/>
				</div>
			</Popover>
		</DemoCard>

		<DemoCard
			title="Custom placement"
			description="Position the popover on different sides."
			code={`<Popover title="Settings" positioning={{ placement: "right" }}>
  {#snippet trigger()}
    <button>Right</button>
  {/snippet}
  <p>Content goes here.</p>
</Popover>`}
		>
			<div class="flex gap-4">
				<Popover title="Top" positioning={{ placement: 'top' }}>
					{#snippet trigger()}
						<button
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
							>Top</button
						>
					{/snippet}
					<p class="text-kl-muted-content text-sm">Popover positioned on top.</p>
				</Popover>
				<Popover title="Right" positioning={{ placement: 'right' }}>
					{#snippet trigger()}
						<button
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
							>Right</button
						>
					{/snippet}
					<p class="text-kl-muted-content text-sm">Popover positioned on the right.</p>
				</Popover>
				<Popover title="Bottom" positioning={{ placement: 'bottom' }}>
					{#snippet trigger()}
						<button
							class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
							>Bottom</button
						>
					{/snippet}
					<p class="text-kl-muted-content text-sm">Popover positioned on the bottom.</p>
				</Popover>
			</div>
		</DemoCard>

		<DemoCard
			title="With form content"
			description="Popovers can contain interactive form elements."
			code={`<Popover title="Feedback" description="How are we doing?">
  {#snippet trigger()}
    <button>Give feedback</button>
  {/snippet}
  <div class="grid gap-3">
    <textarea rows="3" placeholder="Your feedback..." class="..." />
    <button class="...">Submit</button>
  </div>
</Popover>`}
		>
			<Popover title="Feedback" description="How are we doing?">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-secondary text-kl-secondary-content px-4 py-2 text-sm font-medium"
					>
						Give feedback
					</button>
				{/snippet}
				<div class="grid gap-3">
					<textarea
						rows={3}
						placeholder="Your feedback..."
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-3 py-1.5 text-sm"
					></textarea>
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-3 py-1.5 text-sm font-medium"
					>
						Submit
					</button>
				</div>
			</Popover>
		</DemoCard>

		<DemoCard
			title="Default open"
			description="Start with the popover open using defaultOpen."
			code={`<Popover title="Welcome" description="This popover opens by default." defaultOpen={true}>
  {#snippet trigger()}
    <button>Already open</button>
  {/snippet}
  <p>Popover content here.</p>
</Popover>`}
		>
			<Popover title="Welcome" description="This popover opens by default." defaultOpen={true}>
				{#snippet trigger()}
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
					>
						Already open
					</button>
				{/snippet}
				<p class="text-kl-muted-content text-sm">Popover content here.</p>
			</Popover>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
