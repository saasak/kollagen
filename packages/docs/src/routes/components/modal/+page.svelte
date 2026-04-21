<script lang="ts">
	import { Modal } from '$ui/modal';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledOpen = $state(false);

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
		{ name: 'title', type: 'string', default: '—', description: 'Modal heading text' },
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Modal description text below the title'
		},
		{
			name: 'variant',
			type: '"responsive" | "drawer"',
			default: '"responsive"',
			description:
				"Display mode. 'responsive' shows a dialog on desktop and drawer on mobile. 'drawer' always shows a bottom-sheet drawer."
		},
		{
			name: 'breakpoint',
			type: 'number',
			default: '768',
			description:
				"Viewport width in px below which the drawer is used (only for variant='responsive')"
		},
		{
			name: 'modal',
			type: 'boolean',
			default: 'true',
			description: 'Whether the modal blocks outside interaction'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close on Escape key press'
		},
		{
			name: 'closeOnInteractOutside',
			type: 'boolean',
			default: 'true',
			description: 'Close when clicking outside'
		},
		{
			name: 'preventScroll',
			type: 'boolean',
			default: 'true',
			description: 'Prevent background scrolling when open'
		},
		{
			name: 'role',
			type: '"dialog" | "alertdialog"',
			default: '"dialog"',
			description: 'Semantic role for the modal'
		},
		{
			name: 'snapPoints',
			type: '(number | string)[]',
			default: '—',
			description:
				'Snap points for the drawer as fractions (0–1) or pixel strings. Ignored in dialog mode.'
		},
		{
			name: 'defaultSnapPoint',
			type: 'number | string',
			default: '—',
			description: 'Initial snap point when the drawer opens. Ignored in dialog mode.'
		},
		{
			name: 'onSnapPointChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when the active snap point changes. Ignored in dialog mode.'
		},
		{
			name: 'snapToSequentialPoints',
			type: 'boolean',
			default: 'false',
			description: 'Force sequential snapping between snap points. Ignored in dialog mode.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger button'
		},
		{
			name: 'onOpenChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when open state changes'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Trigger button content (Svelte 5 snippet)'
		},
		{
			name: 'footer',
			type: 'Snippet',
			default: '—',
			description: 'Footer content, e.g. action buttons (Svelte 5 snippet)'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Modal body content' },
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
		<h1 class="text-3xl font-bold">Modal</h1>
		<p class="text-kl-muted-content mt-2">
			Responsive modal that renders as a centered dialog on desktop and a bottom-sheet drawer on
			mobile. Built on bits-ui Dialog + Drawer primitives.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Responsive (default)"
			description="Shows a dialog on desktop and a swipeable bottom-sheet drawer on mobile. Resize your browser to see the switch."
			code={`<Modal title="Welcome" description="This is a responsive modal.">
  {#snippet trigger()}
    <button class="btn">Open Modal</button>
  {/snippet}
  <p>This renders as a dialog on desktop and a drawer on mobile.</p>
</Modal>`}
		>
			<Modal title="Welcome" description="This is a responsive modal.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Modal
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">
					This renders as a dialog on desktop and a drawer on mobile. Try resizing your browser!
				</p>
			</Modal>
		</DemoCard>

		<DemoCard
			title="Always drawer"
			description="Use variant=&quot;drawer&quot; to always render as a bottom-sheet, regardless of screen size."
			code={`<Modal variant="drawer" title="Bottom Sheet" description="Always a drawer.">
  {#snippet trigger()}
    <button class="btn">Open Drawer</button>
  {/snippet}
  <p>This is always a bottom-sheet drawer.</p>
</Modal>`}
		>
			<Modal variant="drawer" title="Bottom Sheet" description="Always a drawer.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Drawer
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">
					This is always a bottom-sheet drawer, even on desktop. Swipe down to dismiss.
				</p>
			</Modal>
		</DemoCard>

		<DemoCard
			title="Snap points (Google Maps style)"
			description="Drawer with multiple anchor positions. Drag the grabber to snap between 25%, 50%, and full height."
			code={`<Modal
  variant="drawer"
  title="Explore nearby"
  snapPoints={[0.25, 0.5, 1]}
  defaultSnapPoint={0.5}
  snapToSequentialPoints
>
  {#snippet trigger()}
    <button class="btn">Open Map Drawer</button>
  {/snippet}
  <p>Drag the handle to resize.</p>
</Modal>`}
		>
			<Modal
				variant="drawer"
				title="Explore nearby"
				description="Drag the grabber to snap between positions."
				snapPoints={[0.25, 0.5, 1]}
				defaultSnapPoint={0.5}
				snapToSequentialPoints
			>
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Map Drawer
					</button>
				{/snippet}
				<div class="space-y-3">
					<p class="text-kl-base-content text-sm">
						This drawer snaps to 25%, 50%, and 100% of the viewport height — like Google Maps.
					</p>
					<div class="space-y-2">
						{#each Array(8) as _, i}
							<div class="rounded-kl-field border-kl-base-300 flex items-center gap-3 border p-3">
								<div class="bg-kl-muted h-10 w-10 shrink-0 rounded-full"></div>
								<div class="min-w-0 flex-1">
									<div class="text-kl-base-content text-sm font-medium">Place {i + 1}</div>
									<div class="text-kl-muted-content text-xs">0.{i + 1} km away</div>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</Modal>
		</DemoCard>

		<DemoCard
			title="With footer actions"
			description="Modal with action buttons in the footer."
			code={`<Modal title="Confirm action" description="Are you sure?">
  {#snippet trigger()}
    <button class="btn">Confirm</button>
  {/snippet}
  <p>This action cannot be undone.</p>
  {#snippet footer()}
    <button class="btn-secondary">Cancel</button>
    <button class="btn-primary">Confirm</button>
  {/snippet}
</Modal>`}
		>
			<Modal title="Confirm action" description="Are you sure you want to proceed?">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Confirm
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">This action cannot be undone.</p>
				{#snippet footer()}
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-muted border px-4 py-2 text-sm font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Confirm
					</button>
				{/snippet}
			</Modal>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Programmatically control the open state with bind:open."
			code={`<button onclick={() => open = true}>Open externally</button>
<Modal bind:open title="Controlled Modal">
  <p>Opened via external state.</p>
</Modal>`}
		>
			<div class="flex items-center gap-3">
				<button
					onclick={() => (controlledOpen = true)}
					class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
				>
					Open externally
				</button>
				<span class="text-kl-muted-content text-sm">
					State: {controlledOpen ? 'open' : 'closed'}
				</span>
			</div>
			<Modal
				bind:open={controlledOpen}
				title="Controlled Modal"
				description="This modal is controlled via bind:open."
			>
				<p class="text-kl-base-content text-sm">
					Opened via external state. Close me with the X button, Escape key, or swipe down on
					mobile.
				</p>
			</Modal>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
