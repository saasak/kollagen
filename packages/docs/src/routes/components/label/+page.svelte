<script lang="ts">
	import { Input } from '$ui/input';
	import { Label } from '$ui/label';
	import { Textarea } from '$ui/textarea';
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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

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

		<DemoCard
			title="Optional field"
			description="Compose helper text next to a label without changing semantics."
			code={`<Label for="company">Company</Label>
<Input id="company" placeholder="Optional" />`}
		>
			<div class="grid max-w-sm gap-1.5">
				<div class="flex items-center justify-between">
					<Label for="company">Company</Label>
					<span class="text-kl-muted-content text-xs">Optional</span>
				</div>
				<Input id="company" placeholder="Acme Inc." />
			</div>
		</DemoCard>

		<DemoCard
			title="Textarea label"
			description="Use the same primitive with multiline controls."
			code={`<Label for="notes" required>Notes</Label>
<Textarea id="notes" rows={4} />`}
		>
			<div class="grid max-w-md gap-1.5">
				<Label for="notes" required>Notes</Label>
				<Textarea id="notes" rows={4} placeholder="Add handoff details..." />
			</div>
		</DemoCard>

		<DemoCard
			title="Inline control"
			description="Pair the label with compact native controls."
			code={`<div class="flex items-center gap-2">
  <input id="weekly" type="checkbox" />
  <Label for="weekly">Send weekly summary</Label>
</div>`}
		>
			<div class="flex items-center gap-2">
				<input
					id="weekly"
					type="checkbox"
					class="rounded-kl-selector size-4 accent-[var(--kl-primary)]"
				/>
				<Label for="weekly">Send weekly summary</Label>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
