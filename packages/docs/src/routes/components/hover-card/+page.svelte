<script lang="ts">
	import { HoverCard } from '$ui/hover-card';
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
		{
			name: 'openDelay',
			type: 'number',
			default: '600',
			description: 'Delay in ms before the hover card opens'
		},
		{
			name: 'closeDelay',
			type: 'number',
			default: '300',
			description: 'Delay in ms before the hover card closes'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Prevent the hover card from opening'
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
			description: 'Callback when the hover card opens or closes'
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
			description: 'Content rendered inside the hover card popover. Receives a close function.'
		},
		{
			name: 'arrow',
			type: 'boolean',
			default: 'true',
			description: 'Show an arrow pointing to the trigger'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the hover card content'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">HoverCard</h1>
		<p class="text-kl-muted-content mt-2">
			Rich content popup that appears when hovering over a trigger. Ideal for user profiles, link
			previews, and contextual information. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Hover over the link to see a preview card."
			code={`<HoverCard>
  <Trigger variant="link">@kollagen</Trigger>
  {#snippet body()}
    <div class="space-y-2">
      <p class="font-semibold">Kollagen UI</p>
      <p class="text-kl-muted-content">Ready-to-use, themed SvelteKit components built on bits-ui.</p>
    </div>
  {/snippet}
</HoverCard>`}
		>
			<HoverCard>
				<Trigger variant="link" color="primary">@kollagen</Trigger>
				{#snippet body()}
					<div class="space-y-2">
						<p class="font-semibold">Kollagen UI</p>
						<p class="text-kl-muted-content">
							Ready-to-use, themed SvelteKit components built on bits-ui.
						</p>
					</div>
				{/snippet}
			</HoverCard>
		</DemoCard>

		<DemoCard
			title="User profile"
			description="Show a user profile card on hover."
			code={`<HoverCard>
  <Trigger variant="link">Jane Doe</Trigger>
  {#snippet body()}
    <div class="flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kl-primary text-kl-primary-content text-sm font-bold">JD</div>
      <div>
        <p class="font-semibold">Jane Doe</p>
        <p class="text-xs text-kl-muted-content">Engineer · Joined Mar 2024</p>
      </div>
    </div>
  {/snippet}
</HoverCard>`}
		>
			<HoverCard>
				<Trigger variant="link" color="primary">Jane Doe</Trigger>
				{#snippet body()}
					<div class="flex items-center gap-3">
						<div
							class="bg-kl-primary text-kl-primary-content flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
						>
							JD
						</div>
						<div>
							<p class="font-semibold">Jane Doe</p>
							<p class="text-kl-muted-content text-xs">Engineer · Joined Mar 2024</p>
						</div>
					</div>
				{/snippet}
			</HoverCard>
		</DemoCard>

		<DemoCard
			title="Custom placement"
			description="Position the hover card on different sides of the trigger."
			code={`<HoverCard side="right">
  <Trigger variant="outline">Hover right</Trigger>
  {#snippet body()}
    <p>This card appears to the right.</p>
  {/snippet}
</HoverCard>`}
		>
			<div class="flex gap-6">
				<HoverCard side="top">
					<Trigger variant="outline">Top</Trigger>
					{#snippet body()}
						<p>Hover card on top.</p>
					{/snippet}
				</HoverCard>
				<HoverCard side="right">
					<Trigger variant="outline">Right</Trigger>
					{#snippet body()}
						<p>Hover card on the right.</p>
					{/snippet}
				</HoverCard>
				<HoverCard side="bottom">
					<Trigger variant="outline">Bottom</Trigger>
					{#snippet body()}
						<p>Hover card on the bottom.</p>
					{/snippet}
				</HoverCard>
			</div>
		</DemoCard>

		<DemoCard
			title="No arrow"
			description="Hide the arrow pointing to the trigger."
			code={`<HoverCard arrow={false}>
  <Trigger variant="link">No arrow</Trigger>
  {#snippet body()}
    <p>This card has no arrow.</p>
  {/snippet}
</HoverCard>`}
		>
			<HoverCard arrow={false}>
				<Trigger variant="link" color="primary">No arrow</Trigger>
				{#snippet body()}
					<p>This card has no arrow indicator.</p>
				{/snippet}
			</HoverCard>
		</DemoCard>

		<DemoCard
			title="Instant open"
			description="Set openDelay to 0 for immediate display."
			code={`<HoverCard openDelay={0}>
  <Trigger variant="link">Instant</Trigger>
  {#snippet body({ close })}
    <p>Opens immediately on hover.</p>
    <button onclick={close}>Close</button>
  {/snippet}
</HoverCard>`}
		>
			<HoverCard openDelay={0}>
				<Trigger variant="link" color="primary">Instant hover</Trigger>
				{#snippet body({ close })}
					<div class="space-y-3">
						<p>This card opens immediately on hover.</p>
						<button
							onclick={close}
							class="rounded-kl-field bg-kl-primary text-kl-primary-content px-3 py-1.5 text-xs font-medium"
						>
							Close
						</button>
					</div>
				{/snippet}
			</HoverCard>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
