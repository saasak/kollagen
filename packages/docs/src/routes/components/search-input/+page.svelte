<script lang="ts">
	import { SearchInput } from '$ui/search-input';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let search = $state('');
	let fastSearch = $state('');
	let submitted = $state('');

	const propsData = [
		{
			name: 'value',
			type: 'string',
			default: "''",
			description: 'Input value. Supports bind:value.'
		},
		{
			name: 'placeholder',
			type: 'string',
			default: "'Search...'",
			description: 'Placeholder and fallback accessible label.'
		},
		{
			name: 'debounceMs',
			type: 'number',
			default: '300',
			description: 'Delay before onUpdate is called after typing.'
		},
		{ name: 'id', type: 'string', default: '-', description: 'Native input id.' },
		{ name: 'name', type: 'string', default: '-', description: 'Native form field name.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the input.' },
		{ name: 'ariaLabel', type: 'string', default: '-', description: 'Explicit accessible label.' },
		{
			name: 'onUpdate',
			type: '(value: string) => void',
			default: '-',
			description: 'Debounced update callback.'
		},
		{ name: 'class', type: 'string', default: '-', description: 'Additional root classes.' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">SearchInput</h1>
		<p class="text-kl-muted-content mt-2">A composable search field with debounced updates.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Debounced search"
			description="The input updates immediately while onUpdate is debounced."
			code={`<SearchInput
  bind:value={search}
  placeholder="Search customers..."
  onUpdate={fetchResults}
/>`}
		>
			<div class="space-y-3">
				<SearchInput
					bind:value={fastSearch}
					placeholder="Search customers..."
					onUpdate={(value) => (search = value)}
				/>
				<div class="grid gap-2 text-sm sm:grid-cols-2">
					<p class="text-kl-muted-content">Typed: {fastSearch || 'Empty'}</p>
					<p class="text-kl-muted-content">Updated: {search || 'Empty'}</p>
				</div>
			</div>
		</DemoCard>

		<DemoCard
			title="Form field"
			description="Use name when the search term should be submitted with a native form."
			code={`<form>
  <SearchInput name="q" placeholder="Search..." />
</form>`}
		>
			<form
				class="space-y-3"
				onsubmit={(event) => {
					event.preventDefault();
					const data = new FormData(event.currentTarget);
					submitted = data.get('q')?.toString() ?? '';
				}}
			>
				<SearchInput name="q" placeholder="Search..." />
				<button
					type="submit"
					class="rounded-kl-field bg-kl-primary text-kl-primary-content h-kl-field-sm inline-flex cursor-pointer items-center px-3 text-sm font-medium transition-opacity hover:opacity-90"
				>
					Submit
				</button>
				<p class="text-kl-muted-content text-sm">Submitted: {submitted || 'Empty'}</p>
			</form>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
