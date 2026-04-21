<script lang="ts">
	import { HoverCard } from '$ui/hover-card';
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
			default: '—',
			description: 'Initial open state for uncontrolled mode'
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
			name: 'positioning',
			type: 'PositioningOptions',
			default: '—',
			description: 'Popper.js positioning options (placement, offset, etc.)'
		},
		{
			name: 'onOpenChange',
			type: '(details: { open: boolean }) => void',
			default: '—',
			description: 'Callback when the hover card opens or closes'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'The trigger element rendered inside the hover zone'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Content rendered inside the hover card popover'
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
  {#snippet trigger()}
    <span class="underline cursor-pointer">@kollagen</span>
  {/snippet}
  <div class="space-y-2">
    <p class="font-semibold">Kollagen UI</p>
    <p class="text-kl-muted-content">Ready-to-use, themed SvelteKit components built on bits-ui.</p>
  </div>
</HoverCard>`}
		>
			<HoverCard>
				{#snippet trigger()}
					<span class="text-kl-primary cursor-pointer font-medium underline">@kollagen</span>
				{/snippet}
				<div class="space-y-2">
					<p class="font-semibold">Kollagen UI</p>
					<p class="text-kl-muted-content">
						Ready-to-use, themed SvelteKit components built on bits-ui.
					</p>
				</div>
			</HoverCard>
		</DemoCard>

		<DemoCard
			title="User profile"
			description="Show a user profile card on hover."
			code={`<HoverCard>
  {#snippet trigger()}
    <span>Jane Doe</span>
  {/snippet}
  <div class="flex items-center gap-3">
    <div class="flex h-10 w-10 items-center justify-center rounded-full bg-kl-primary text-kl-primary-content text-sm font-bold">JD</div>
    <div>
      <p class="font-semibold">Jane Doe</p>
      <p class="text-xs text-kl-muted-content">Engineer · Joined Mar 2024</p>
    </div>
  </div>
</HoverCard>`}
		>
			<HoverCard>
				{#snippet trigger()}
					<span class="text-kl-primary cursor-pointer font-medium underline">Jane Doe</span>
				{/snippet}
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
			</HoverCard>
		</DemoCard>

		<DemoCard
			title="Custom placement"
			description="Position the hover card on different sides of the trigger."
			code={`<HoverCard positioning={{ placement: "right" }}>
  {#snippet trigger()}
    <span>Hover right</span>
  {/snippet}
  <p>This card appears to the right.</p>
</HoverCard>`}
		>
			<div class="flex gap-6">
				<HoverCard positioning={{ placement: 'top' }}>
					{#snippet trigger()}
						<span
							class="rounded-kl-field border-kl-base-300 cursor-pointer border px-3 py-1.5 text-sm"
							>Top</span
						>
					{/snippet}
					<p>Hover card on top.</p>
				</HoverCard>
				<HoverCard positioning={{ placement: 'right' }}>
					{#snippet trigger()}
						<span
							class="rounded-kl-field border-kl-base-300 cursor-pointer border px-3 py-1.5 text-sm"
							>Right</span
						>
					{/snippet}
					<p>Hover card on the right.</p>
				</HoverCard>
				<HoverCard positioning={{ placement: 'bottom' }}>
					{#snippet trigger()}
						<span
							class="rounded-kl-field border-kl-base-300 cursor-pointer border px-3 py-1.5 text-sm"
							>Bottom</span
						>
					{/snippet}
					<p>Hover card on the bottom.</p>
				</HoverCard>
			</div>
		</DemoCard>

		<DemoCard
			title="No arrow"
			description="Hide the arrow pointing to the trigger."
			code={`<HoverCard arrow={false}>
  {#snippet trigger()}
    <span>No arrow</span>
  {/snippet}
  <p>This card has no arrow.</p>
</HoverCard>`}
		>
			<HoverCard arrow={false}>
				{#snippet trigger()}
					<span class="text-kl-primary cursor-pointer font-medium underline">No arrow</span>
				{/snippet}
				<p>This card has no arrow indicator.</p>
			</HoverCard>
		</DemoCard>

		<DemoCard
			title="Instant open"
			description="Set openDelay to 0 for immediate display."
			code={`<HoverCard openDelay={0}>
  {#snippet trigger()}
    <span>Instant</span>
  {/snippet}
  <p>Opens immediately on hover.</p>
</HoverCard>`}
		>
			<HoverCard openDelay={0}>
				{#snippet trigger()}
					<span class="text-kl-primary cursor-pointer font-medium underline">Instant hover</span>
				{/snippet}
				<p>This card opens immediately on hover.</p>
			</HoverCard>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
