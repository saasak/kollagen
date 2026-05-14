<script lang="ts">
	import { Input } from '$ui/input';
	import { InputGroup } from '$ui/input-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'prefix',
			type: 'Snippet',
			default: '-',
			description: 'Leading addon.'
		},
		{
			name: 'suffix',
			type: 'Snippet',
			default: '-',
			description: 'Trailing addon.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Input or textarea content.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional root classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">InputGroup</h1>
		<p class="text-kl-muted-content mt-2">Prefix and suffix slots around form controls.</p>
	</div>
	<DemoCard
		title="URL"
		description="Compose with Input or Textarea."
		code="<InputGroup><Input /></InputGroup>"
	>
		<InputGroup class="max-w-md">
			{#snippet prefix()}https://{/snippet}
			<Input placeholder="example.com" />
			{#snippet suffix()}.com{/snippet}
		</InputGroup>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
