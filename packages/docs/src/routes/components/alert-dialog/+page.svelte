<script lang="ts">
	import {
		Action as AlertDialogAction,
		AlertDialog,
		Cancel as AlertDialogCancel
	} from '$ui/alert-dialog';
	import { Button } from '$ui/button';
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
			name: 'trigger',
			type: 'Snippet',
			default: '-',
			description: 'Trigger content.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Dialog body content.'
		},
		{
			name: 'footer',
			type: 'Snippet',
			default: '-',
			description: 'Custom footer actions.'
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
  {#snippet trigger()}
    <Button color="error">Delete project</Button>
  {/snippet}
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
					{#snippet trigger()}<Button color="error">Delete project</Button>{/snippet}
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
  {#snippet trigger()}
    <Button>Publish release</Button>
  {/snippet}
</AlertDialog>`}
		>
			<AlertDialog
				title="Publish release"
				description="Customers will see the new changelog immediately."
				actionLabel="Publish"
				cancelLabel="Review again"
			>
				{#snippet trigger()}<Button>Publish release</Button>{/snippet}
				<div class="rounded-kl-field bg-kl-base-200 p-3">
					<p class="font-medium">Release 2026.05</p>
					<p class="text-kl-muted-content mt-1">
						Includes billing exports, account notes, and role audit events.
					</p>
				</div>
			</AlertDialog>
		</DemoCard>

		<DemoCard
			title="Controlled open state"
			description="Drive the dialog from external state and reflect the current status."
			code={`<Button onclick={() => (open = true)}>Open controlled dialog</Button>
<AlertDialog bind:open title="Rotate API key" />`}
		>
			<div class="flex flex-wrap items-center gap-3">
				<Button onclick={() => (controlledOpen = true)}>Open controlled dialog</Button>
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
  {#snippet footer()}
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction>Archive</AlertDialogAction>
  {/snippet}
</AlertDialog>`}
		>
			<AlertDialog title="Archive workspace" description="Archived workspaces become read-only.">
				{#snippet trigger()}<Button variant="outline">Archive workspace</Button>{/snippet}
				<p>The workspace remains searchable and can be restored by an admin.</p>
				{#snippet footer()}
					<AlertDialogCancel
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md cursor-pointer border px-3 text-sm font-medium transition-colors duration-150"
					>
						Cancel
					</AlertDialogCancel>
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
