<script lang="ts">
	import { Input } from '$ui/input';
	import { InputGroup } from '$ui/input-group';
	import { Textarea } from '$ui/textarea';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { DollarSign, Search } from 'lucide-svelte';

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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="URL"
			description="Compose with Input or Textarea."
			code="<InputGroup><Input /></InputGroup>"
		>
			<InputGroup class="max-w-md">
				{#snippet prefix()}https://{/snippet}
				<Input placeholder="example" />
				{#snippet suffix()}.com{/snippet}
			</InputGroup>
		</DemoCard>

		<DemoCard
			title="Search"
			description="Use an icon prefix for compact search fields."
			code={`<InputGroup>
  {#snippet prefix()}<Search size={16} />{/snippet}
  <Input placeholder="Search customers" />
</InputGroup>`}
		>
			<InputGroup class="max-w-md">
				{#snippet prefix()}<Search size={16} />{/snippet}
				<Input placeholder="Search customers" ariaLabel="Search customers" />
			</InputGroup>
		</DemoCard>

		<DemoCard
			title="Currency amount"
			description="Prefix and suffix make numeric fields self-describing."
			code={`<InputGroup>
  {#snippet prefix()}<DollarSign size={16} />{/snippet}
  <Input type="number" value={1200} />
  {#snippet suffix()}USD{/snippet}
</InputGroup>`}
		>
			<InputGroup class="max-w-sm">
				{#snippet prefix()}<DollarSign size={16} />{/snippet}
				<Input type="number" value={1200} ariaLabel="Amount" />
				{#snippet suffix()}USD{/snippet}
			</InputGroup>
		</DemoCard>

		<DemoCard
			title="Textarea addon"
			description="InputGroup also frames multiline controls."
			code={`<InputGroup>
  {#snippet prefix()}Note{/snippet}
  <Textarea rows={3} />
</InputGroup>`}
		>
			<InputGroup class="max-w-xl">
				{#snippet prefix()}Note{/snippet}
				<Textarea rows={3} placeholder="Add context for the reviewer..." ariaLabel="Note" />
			</InputGroup>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
