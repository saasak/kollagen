<script lang="ts">
	import { Slider } from '$ui/slider';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let controlledValue = $state([30]);
	let rangeValue = $state([20, 80]);
	let formResult = $state('');

	const propsData = [
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Label text displayed above the slider'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{
			name: 'value',
			type: 'number[]',
			default: '—',
			description: 'Controlled value (array for range mode). Supports bind:value'
		},
		{
			name: 'defaultValue',
			type: 'number[]',
			default: '[50]',
			description: 'Default value for uncontrolled mode'
		},
		{ name: 'min', type: 'number', default: '0', description: 'Minimum value' },
		{ name: 'max', type: 'number', default: '100', description: 'Maximum value' },
		{ name: 'step', type: 'number', default: '1', description: 'Step increment' },
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"horizontal"',
			description: 'Slider orientation'
		},
		{
			name: 'origin',
			type: '"start" | "center" | "end"',
			default: '"start"',
			description: 'Origin of the filled range'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the slider' },
		{
			name: 'readOnly',
			type: 'boolean',
			default: 'false',
			description: 'Make the slider read-only'
		},
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{
			name: 'showValue',
			type: 'boolean',
			default: 'false',
			description: 'Show the current value as text'
		},
		{
			name: 'markers',
			type: 'number[]',
			default: '—',
			description: 'Show step markers at given values'
		},
		{
			name: 'minStepsBetweenThumbs',
			type: 'number',
			default: '0',
			description: 'Minimum steps between thumbs in range mode'
		},
		{
			name: 'getAriaValueText',
			type: '(details) => string',
			default: '—',
			description: 'Function to format the displayed value text'
		},
		{
			name: 'onValueChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when value changes'
		},
		{
			name: 'onValueChangeEnd',
			type: '(details) => void',
			default: '—',
			description: 'Callback when dragging ends'
		},
		{
			name: 'onFocusChange',
			type: '(details) => void',
			default: '—',
			description: 'Callback when focused thumb changes'
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
	<div>
		<h1 class="text-3xl font-bold">Slider</h1>
		<p class="text-kl-muted-content mt-2">
			A slider control for selecting numeric values from a range. Supports single thumb, range mode,
			markers, and vertical orientation. Built on Ark UI.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Basic" description="A simple slider with default settings." code="<Slider />">
			<Slider />
		</DemoCard>

		<DemoCard
			title="With label and value"
			description="Show a label and the current value."
			code="<Slider label=&quot;Volume&quot; showValue />"
		>
			<Slider label="Volume" showValue />
		</DemoCard>

		<DemoCard
			title="Custom range"
			description="Set min, max, and step."
			code={`<Slider label="Temperature" showValue min={0} max={40} step={0.5} defaultValue={[22]} />`}
		>
			<Slider label="Temperature" showValue min={0} max={40} step={0.5} defaultValue={[22]} />
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage value externally with bind:value."
			code={`<Slider label="Brightness" showValue bind:value={controlledValue} />
<p>Value: {controlledValue}</p>`}
		>
			<div class="space-y-2">
				<Slider label="Brightness" showValue bind:value={controlledValue} />
				<p class="text-kl-muted-content text-sm">
					Value: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{controlledValue}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Range"
			description="Two thumbs for selecting a range of values."
			code={`<Slider label="Price range" showValue bind:value={rangeValue} minStepsBetweenThumbs={5} />`}
		>
			<div class="space-y-2">
				<Slider label="Price range" showValue bind:value={rangeValue} minStepsBetweenThumbs={5} />
				<p class="text-kl-muted-content text-sm">
					Range: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{rangeValue[0]}–{rangeValue[1]}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="With markers"
			description="Display markers at specific values."
			code={`<Slider label="Rating" showValue markers={[0, 25, 50, 75, 100]} />`}
		>
			<Slider label="Rating" showValue markers={[0, 25, 50, 75, 100]} />
		</DemoCard>

		<DemoCard
			title="Center origin"
			description="Fill the range from the center. Useful for offset values."
			code={`<Slider label="Pan" showValue origin="center" defaultValue={[0]} min={-50} max={50} />`}
		>
			<Slider label="Pan" showValue origin="center" defaultValue={[0]} min={-50} max={50} />
		</DemoCard>

		<DemoCard
			title="Vertical"
			description="A vertically oriented slider."
			code="<Slider label=&quot;Height&quot; showValue orientation=&quot;vertical&quot; />"
		>
			<Slider label="Height" showValue orientation="vertical" />
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Disabled state."
			code="<Slider label=&quot;Disabled&quot; disabled />"
		>
			<Slider label="Disabled" disabled />
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Shows error styling when validation fails."
			code="<Slider label=&quot;Invalid&quot; invalid />"
		>
			<Slider label="Invalid" invalid />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <Slider label="Rating" name="rating" showValue />
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
					<Slider label="Rating" name="rating" showValue />
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

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
