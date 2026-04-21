<script lang="ts">
	import { Dialog } from '$ui/dialog';
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
		{ name: 'title', type: 'string', default: '—', description: 'Dialog heading text' },
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Dialog description text below the title'
		},
		{
			name: 'closeOnEscape',
			type: 'boolean',
			default: 'true',
			description: 'Close the dialog on Escape key press'
		},
		{
			name: 'closeOnInteractOutside',
			type: 'boolean',
			default: 'true',
			description: 'Close when clicking outside the dialog'
		},
		{
			name: 'preventScroll',
			type: 'boolean',
			default: 'true',
			description: 'Prevent background scrolling when open'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the dialog trigger button'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
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
		{ name: 'children', type: 'Snippet', default: '—', description: 'Dialog body content' },
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the content panel'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Dialog</h1>
		<p class="text-kl-muted-content mt-2">
			Modal window appearing above the main content. Built on bits-ui with focus trapping, backdrop,
			and keyboard support.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple dialog with a title, description, and body content."
			code={`<Dialog title="Welcome" description="This is a basic dialog.">
  {#snippet trigger()}
    <button class="btn">Open Dialog</button>
  {/snippet}
  <p>Hello from inside the dialog!</p>
</Dialog>`}
		>
			<Dialog title="Welcome" description="This is a basic dialog.">
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Open Dialog
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">Hello from inside the dialog!</p>
			</Dialog>
		</DemoCard>

		<DemoCard
			title="With footer actions"
			description="Dialog with a footer containing action buttons."
			code={`<Dialog title="Confirm action" description="Are you sure you want to proceed?">
  {#snippet trigger()}
    <button class="btn">Confirm</button>
  {/snippet}
  <p>This action cannot be undone.</p>
  {#snippet footer()}
    <button class="btn-secondary">Cancel</button>
    <button class="btn-primary">Confirm</button>
  {/snippet}
</Dialog>`}
		>
			<Dialog title="Confirm action" description="Are you sure you want to proceed?">
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
			</Dialog>
		</DemoCard>

		<DemoCard
			title="Persistent dialog"
			description="Prevents closing by clicking outside, requiring explicit user action."
			code={`<Dialog
  title="Delete item"
  description="This will permanently delete the item."
  closeOnInteractOutside={false}
>
  {#snippet trigger()}
    <button class="btn-danger">Delete</button>
  {/snippet}
  <p>Are you absolutely sure? This cannot be reversed.</p>
  {#snippet footer()}
    <button class="btn-secondary">Cancel</button>
    <button class="btn-danger">Delete</button>
  {/snippet}
</Dialog>`}
		>
			<Dialog
				title="Delete item"
				description="This will permanently delete the item."
				closeOnInteractOutside={false}
			>
				{#snippet trigger()}
					<button
						class="rounded-kl-field bg-kl-error text-kl-error-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Delete
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">
					Are you absolutely sure? This cannot be reversed.
				</p>
				{#snippet footer()}
					<button
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-muted border px-4 py-2 text-sm font-medium transition-colors"
					>
						Cancel
					</button>
					<button
						class="rounded-kl-field bg-kl-error text-kl-error-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Delete
					</button>
				{/snippet}
			</Dialog>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Programmatically control the open state with bind:open."
			code={`<button onclick={() => open = true}>Open externally</button>
<Dialog bind:open title="Controlled Dialog">
  <p>Opened via external state.</p>
</Dialog>`}
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
			<Dialog
				bind:open={controlledOpen}
				title="Controlled Dialog"
				description="This dialog is controlled via bind:open."
			>
				<p class="text-kl-base-content text-sm">
					Opened via external state. Close me with the X button or Escape key.
				</p>
			</Dialog>
		</DemoCard>

		<DemoCard
			title="Disabled trigger"
			description="The trigger button is disabled, preventing the dialog from opening."
			code={`<Dialog title="Disabled" disabled={true}>
  {#snippet trigger()}
    <button class="btn" disabled>Can't open</button>
  {/snippet}
  <p>You shouldn't see this.</p>
</Dialog>`}
		>
			<Dialog title="Disabled" disabled={true}>
				{#snippet trigger()}
					<button
						disabled
						class="rounded-kl-field bg-kl-primary text-kl-primary-content cursor-not-allowed px-4 py-2 text-sm font-medium opacity-50"
					>
						Can't open
					</button>
				{/snippet}
				<p class="text-kl-base-content text-sm">You shouldn't see this.</p>
			</Dialog>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
