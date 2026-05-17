<script lang="ts">
	import { Action as AlertDialogAction, AlertDialog } from '$ui/alert-dialog';
	import { Trigger } from '$ui/trigger';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledOpen = $state(false);
	let lastAction = $state('No action confirmed');
	let cancelReason = $state('No cancellation yet');

	const propsData = [
		{
			name: 'open',
			type: 'boolean',
			default: 'false',
			description: 'Controlled open state. Supports bind:open.'
		},
		{
			name: 'title',
			type: 'string',
			default: '-',
			description: 'Dialog title.'
		},
		{
			name: 'description',
			type: 'string',
			default: '-',
			description: 'Dialog description.'
		},
		{
			name: 'actionLabel',
			type: 'string',
			default: "'Continue'",
			description: 'Default action button label.'
		},
		{
			name: 'cancelLabel',
			type: 'string',
			default: "'Cancel'",
			description: 'Default cancel button label.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the trigger.'
		},
		{
			name: 'onAction',
			type: '() => void',
			default: '-',
			description: 'Called when the action is confirmed.'
		},
		{
			name: 'onCancel',
			type: '() => void',
			default: '-',
			description: 'Called when the dialog is cancelled.'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '-',
			description: 'Called when open state changes.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Implicit trigger content, usually a Trigger component.'
		},
		{
			name: 'body',
			type: 'Snippet<[{ close: () => void }]>',
			default: '-',
			description: 'Dialog body content. Receives a close function.'
		},
		{
			name: 'footer',
			type: 'Snippet<[{ close: () => void }]>',
			default: '-',
			description: 'Custom footer actions. Receives a close function.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional content classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">AlertDialog</h1>
		<p class="text-kl-muted-content mt-2">A blocking confirmation dialog built with Bits UI.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Destructive confirmation"
			description="Use for irreversible actions that need explicit confirmation."
			code={`<AlertDialog
  title="Delete project"
  description="This cannot be undone."
  actionLabel="Delete"
  cancelLabel="Keep project"
  onAction={() => deleteProject()}
>
  <Trigger color="error">Delete project</Trigger>
</AlertDialog>`}
		>
			<div class="space-y-3">
				<AlertDialog
					title="Delete project"
					description="This cannot be undone."
					actionLabel="Delete"
					cancelLabel="Keep project"
					onAction={() => (lastAction = 'Project deletion confirmed')}
					onCancel={() => (cancelReason = 'Deletion cancelled')}
				>
					<Trigger color="error">Delete project</Trigger>
				</AlertDialog>
				<p class="text-kl-muted-content text-sm">{lastAction} · {cancelReason}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Non-destructive decision"
			description="Use neutral labels when the action is consequential but not destructive."
			code={`<AlertDialog
  title="Publish release"
  description="Customers will see the new changelog immediately."
  actionLabel="Publish"
  cancelLabel="Review again"
>
  <Trigger>Publish release</Trigger>
  {#snippet body()}
    <div>Release details...</div>
  {/snippet}
</AlertDialog>`}
		>
			<AlertDialog
				title="Publish release"
				description="Customers will see the new changelog immediately."
				actionLabel="Publish"
				cancelLabel="Review again"
			>
				<Trigger>Publish release</Trigger>
				{#snippet body()}
					<div class="rounded-kl-field bg-kl-base-200 p-3">
						<p class="font-medium">Release 2026.05</p>
						<p class="text-kl-muted-content mt-1">
							Includes billing exports, account notes, and role audit events.
						</p>
					</div>
				{/snippet}
			</AlertDialog>
		</DemoCard>

		<DemoCard
			title="Controlled open state"
			description="Drive the dialog from external state and reflect the current status."
			code={`<Trigger onclick={() => (open = true)}>Open controlled dialog</Trigger>
<AlertDialog bind:open title="Rotate API key" />`}
		>
			<div class="flex flex-wrap items-center gap-3">
				<Trigger onclick={() => (controlledOpen = true)}>Open controlled dialog</Trigger>
				<span class="text-kl-muted-content text-sm">
					State: {controlledOpen ? 'open' : 'closed'}
				</span>
			</div>
			<AlertDialog
				bind:open={controlledOpen}
				title="Rotate API key"
				description="Existing integrations must be updated before the old key expires."
				actionLabel="Rotate key"
				cancelLabel="Not now"
			/>
		</DemoCard>

		<DemoCard
			title="Custom footer"
			description="Use exported primitives when footer buttons should close the dialog correctly."
			code={`<AlertDialog title="Archive workspace">
  <Trigger variant="outline">Archive workspace</Trigger>
  {#snippet body()}
    <p>The workspace remains searchable and can be restored by an admin.</p>
  {/snippet}
  {#snippet footer({ close })}
    <button onclick={close}>Cancel</button>
    <AlertDialogAction>Archive</AlertDialogAction>
  {/snippet}
</AlertDialog>`}
		>
			<AlertDialog title="Archive workspace" description="Archived workspaces become read-only.">
				<Trigger variant="outline">Archive workspace</Trigger>
				{#snippet body()}
					<p>The workspace remains searchable and can be restored by an admin.</p>
				{/snippet}
				{#snippet footer({ close })}
					<button
						onclick={close}
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md cursor-pointer border px-3 text-sm font-medium transition-colors duration-150"
					>
						Cancel
					</button>
					<AlertDialogAction
						class="rounded-kl-field bg-kl-primary text-kl-primary-content h-kl-field-md cursor-pointer border border-transparent px-3 text-sm font-medium transition-colors duration-150 hover:brightness-95"
					>
						Archive
					</AlertDialogAction>
				{/snippet}
			</AlertDialog>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
