<script lang="ts">
	import { Spinner } from '$ui/spinner';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'size',
			type: "'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Spinner size.'
		},
		{
			name: 'label',
			type: 'string',
			default: "'Loading'",
			description: 'Accessible label.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional icon classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Spinner</h1>
		<p class="text-kl-muted-content mt-2">Inline loading indicator.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Sizes" description="Three fixed sizes." code="<Spinner />">
			<div class="flex items-center gap-4">
				<Spinner size="sm" />
				<Spinner />
				<Spinner size="lg" />
			</div>
		</DemoCard>

		<DemoCard
			title="Inline label"
			description="Pair a spinner with visible status text."
			code={`<div class="flex items-center gap-2">
  <Spinner size="sm" label="Saving" />
  <span>Saving changes...</span>
</div>`}
		>
			<div class="flex items-center gap-2 text-sm">
				<Spinner size="sm" label="Saving" />
				<span>Saving changes...</span>
			</div>
		</DemoCard>

		<DemoCard
			title="Loading button"
			description="Use inside buttons when a command is pending."
			code={`<button disabled>
  <Spinner size="sm" label="Exporting" />
  Exporting
</button>`}
		>
			<button
				disabled
				class="rounded-kl-field bg-kl-primary text-kl-primary-content inline-flex items-center gap-2 px-4 py-2 text-sm font-medium opacity-80"
			>
				<Spinner size="sm" label="Exporting" />
				Exporting
			</button>
		</DemoCard>

		<DemoCard
			title="Muted surface"
			description="Customize color with class when the spinner sits inside subdued UI."
			code="<Spinner class=&quot;text-kl-muted-content&quot; />"
		>
			<div class="rounded-kl-box bg-kl-base-200 flex h-24 max-w-sm items-center justify-center">
				<Spinner class="text-kl-muted-content" label="Loading panel" />
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
