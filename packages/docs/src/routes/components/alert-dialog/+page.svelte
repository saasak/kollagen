<script lang="ts">
	import { AlertDialog } from '$ui/alert-dialog';
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

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
	<DemoCard
		title="Confirm action"
		description="Use for destructive or irreversible flows."
		code="<AlertDialog title='Delete project' description='This cannot be undone.' />"
	>
		<AlertDialog title="Delete project" description="This cannot be undone." actionLabel="Delete">
			{#snippet trigger()}<Button color="error">Delete project</Button>{/snippet}
		</AlertDialog>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
