<script lang="ts">
	import { RatingGroup } from '$ui/rating-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledValue = $state(3);
	let formResult = $state('');

	const propsData = [
		{
			name: 'value',
			type: 'number',
			default: '—',
			description: 'Controlled value. Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'number',
			default: '—',
			description: 'Initial value for uncontrolled mode'
		},
		{ name: 'count', type: 'number', default: '5', description: 'Total number of stars' },
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Display label rendered above the stars'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all interaction' },
		{
			name: 'readOnly',
			type: 'boolean',
			default: 'false',
			description: 'Make the rating read-only'
		},
		{
			name: 'required',
			type: 'boolean',
			default: 'false',
			description: 'Mark the field as required'
		},
		{
			name: 'allowHalf',
			type: 'boolean',
			default: 'false',
			description: 'Allow half-star ratings (0.5 increments)'
		},
		{
			name: 'onValueChange',
			type: '(details: RatingGroup.ValueChangeDetails) => void',
			default: '—',
			description: 'Callback when the rating value changes'
		},
		{
			name: 'onHoverChange',
			type: '(details: RatingGroup.HoverChangeDetails) => void',
			default: '—',
			description: 'Callback when the hovered star changes'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: '—',
			description: 'Accessible label for screen readers when the visible label prop is omitted'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">RatingGroup</h1>
		<p class="text-kl-muted-content mt-2">
			Star rating input with support for half-stars, read-only display, and native form submission.
			Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple uncontrolled star rating with a label."
			code={`<RatingGroup label="Rate this" defaultValue={3} />`}
		>
			<RatingGroup label="Rate this" defaultValue={3} />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Controlled value with bind:value — displays the current rating below."
			code={`<RatingGroup label="Your rating" bind:value />
<p>Selected: {value ?? 'none'}</p>`}
		>
			<div class="space-y-2">
				<RatingGroup label="Your rating" bind:value={controlledValue} />
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledValue ?? 'none'}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Half stars"
			description="Enable half-star increments with allowHalf. Hover between stars to select 0.5 values."
			code={`<RatingGroup label="Precision rating" allowHalf={true} defaultValue={3.5} />`}
		>
			<RatingGroup label="Precision rating" allowHalf={true} defaultValue={3.5} />
		</DemoCard>

		<DemoCard
			title="Custom count"
			description="Use a 10-star scale instead of the default 5."
			code={`<RatingGroup label="Out of 10" count={10} defaultValue={7} />`}
		>
			<RatingGroup label="Out of 10" count={10} defaultValue={7} />
		</DemoCard>

		<DemoCard
			title="Read-only"
			description="Display a rating without allowing interaction — useful for showing scores."
			code={`<RatingGroup label="Average score" readOnly={true} defaultValue={4} />`}
		>
			<RatingGroup label="Average score" readOnly={true} defaultValue={4} />
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Fully disabled state with reduced opacity."
			code={`<RatingGroup label="Disabled" disabled={true} defaultValue={2} />`}
		>
			<RatingGroup label="Disabled" disabled={true} defaultValue={2} />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission using the name prop. Submit to see the value."
			code={`<form onsubmit={handleSubmit}>
  <RatingGroup name="rating" label="Rate your experience" defaultValue={0} />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						formResult = data.get('rating')?.toString() ?? '(empty)';
					}}
					class="space-y-3"
				>
					<RatingGroup name="rating" label="Rate your experience" defaultValue={0} />
					<button
						type="submit"
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Submit
					</button>
				</form>
				{#if formResult}
					<p class="text-kl-muted-content text-sm">
						Submitted: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{formResult}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
