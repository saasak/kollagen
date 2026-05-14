<script lang="ts">
	import { Input } from '$ui/input';
	import { Label } from '$ui/label';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'for',
			type: 'string',
			default: '-',
			description: 'Associated control id.'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Show required marker.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Label content.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Label</h1>
		<p class="text-kl-muted-content mt-2">An accessible label primitive.</p>
	</div>
	<DemoCard
		title="Field label"
		description="Associates with form controls."
		code="<Label for='email'>Email</Label>"
	>
		<div class="grid max-w-sm gap-1.5">
			<Label for="email" required>Email</Label>
			<Input id="email" type="email" />
		</div>
	</DemoCard>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
