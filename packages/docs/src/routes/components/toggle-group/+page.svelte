<script lang="ts">
	import { ToggleGroup } from '$ui/toggle-group';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { AlignCenter, AlignLeft, AlignRight } from 'lucide-svelte';

	let value = $state('week');
	let multipleValue = $state(['day', 'month']);
	let density = $state('comfortable');
	let alignment = $state('left');

	const propsData = [
		{
			name: 'items',
			type: 'ToggleGroupItem[]',
			default: 'required',
			description: 'Toggle item definitions.'
		},
		{
			name: 'value',
			type: 'string | string[]',
			default: "''",
			description: 'Selected value(s). Supports bind:value.'
		},
		{
			name: 'multiple',
			type: 'boolean',
			default: 'false',
			description: 'Selection mode.'
		},
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style passed to every item.'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | status color",
			default: "'base'",
			description: 'Semantic color passed to every item.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Item size.'
		},
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: "'normal'",
			description: 'Default item content layout.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout and keyboard orientation.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the group.'
		},
		{
			name: 'onValueChange',
			type: '(value: string | string[]) => void',
			default: 'none',
			description: 'Called when value changes.'
		}
	];

	const itemPropsData = [
		{ name: 'value', type: 'string', default: 'required', description: 'Selected value.' },
		{ name: 'children', type: 'Snippet', default: 'required', description: 'Visible content.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the item.' },
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: 'group content',
			description: 'Per-item content layout.'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: 'none',
			description: 'Accessible label for icon-only items.'
		}
	];
</script>

{#snippet dayContent()}
	Day
{/snippet}

{#snippet weekContent()}
	Week
{/snippet}

{#snippet monthContent()}
	Month
{/snippet}

{#snippet compactContent()}
	Compact
{/snippet}

{#snippet comfortableContent()}
	Comfortable
{/snippet}

{#snippet spaciousContent()}
	Spacious
{/snippet}

{#snippet leftContent()}
	<AlignLeft />
{/snippet}

{#snippet centerContent()}
	<AlignCenter />
{/snippet}

{#snippet rightContent()}
	<AlignRight />
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">ToggleGroup</h1>
		<p class="text-kl-muted-content mt-2">A grouped set of toggle buttons.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Single"
			description="Single selected value with snippet items."
			code={`{#snippet dayContent()}Day{/snippet}
{#snippet weekContent()}Week{/snippet}

<ToggleGroup
  bind:value
  variant="outline"
  items={[
    { value: "day", children: dayContent },
    { value: "week", children: weekContent },
    { value: "month", children: monthContent }
  ]}
/>`}
		>
			<ToggleGroup
				bind:value
				variant="outline"
				items={[
					{ value: 'day', children: dayContent },
					{ value: 'week', children: weekContent },
					{ value: 'month', children: monthContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Multiple"
			description="Multiple selected values."
			code={`<ToggleGroup
  multiple
  bind:value={multipleValue}
  items={[
    { value: "day", children: dayContent },
    { value: "week", children: weekContent },
    { value: "month", children: monthContent }
  ]}
/>`}
		>
			<div class="space-y-2">
				<ToggleGroup
					multiple
					bind:value={multipleValue}
					items={[
						{ value: 'day', children: dayContent },
						{ value: 'week', children: weekContent },
						{ value: 'month', children: monthContent }
					]}
				/>
				<p class="text-kl-muted-content text-sm">
					Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{multipleValue.join(', ')}</code
					>
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled item"
			description="Disable individual items from the source data."
			code={`<ToggleGroup
  bind:value={density}
  color="secondary"
  variant="soft"
  items={[
    { value: "compact", children: compactContent },
    { value: "comfortable", children: comfortableContent },
    { value: "spacious", children: spaciousContent, disabled: true }
  ]}
/>`}
		>
			<div class="space-y-2">
				<ToggleGroup
					bind:value={density}
					color="secondary"
					variant="soft"
					items={[
						{ value: 'compact', children: compactContent },
						{ value: 'comfortable', children: comfortableContent },
						{ value: 'spacious', children: spaciousContent, disabled: true }
					]}
				/>
				<p class="text-kl-muted-content text-sm">Density: {density}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Icons"
			description="Use item snippets for icon-only content."
			code={`<ToggleGroup
  bind:value={alignment}
  content="icon"
  ariaLabel="Text alignment"
  items={[
    { value: "left", ariaLabel: "Align left", children: leftContent },
    { value: "center", ariaLabel: "Align center", children: centerContent },
    { value: "right", ariaLabel: "Align right", children: rightContent }
  ]}
/>`}
		>
			<ToggleGroup
				bind:value={alignment}
				content="icon"
				ariaLabel="Text alignment"
				items={[
					{ value: 'left', ariaLabel: 'Align left', children: leftContent },
					{ value: 'center', ariaLabel: 'Align center', children: centerContent },
					{ value: 'right', ariaLabel: 'Align right', children: rightContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Vertical"
			description="Vertical orientation changes layout and keyboard direction."
			code={`<ToggleGroup
  orientation="vertical"
  bind:value={density}
  variant="outline"
  items={[
    { value: "compact", children: compactContent },
    { value: "comfortable", children: comfortableContent },
    { value: "spacious", children: spaciousContent }
  ]}
/>`}
		>
			<ToggleGroup
				orientation="vertical"
				bind:value={density}
				variant="outline"
				items={[
					{ value: 'compact', children: compactContent },
					{ value: 'comfortable', children: comfortableContent },
					{ value: 'spacious', children: spaciousContent }
				]}
			/>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Item props</h2>
		<PropsTable items={itemPropsData} />
	</section>
</div>
