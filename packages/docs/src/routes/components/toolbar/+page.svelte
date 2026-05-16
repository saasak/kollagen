<script lang="ts">
	import { Toolbar } from '$ui/toolbar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Bold, Italic, Link2, List, Save, Underline } from 'lucide-svelte';

	const propsData = [
		{
			name: 'items',
			type: 'ToolbarItem[]',
			default: 'required',
			description: 'Toolbar controls to render.'
		},
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style passed to each item.'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | status color",
			default: "'base'",
			description: 'Semantic color passed to each item.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Control size driven by --kl-size-field.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Toolbar direction.'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: 'none',
			description: 'Accessible toolbar label.'
		},
		{
			name: 'class',
			type: 'string',
			default: 'none',
			description: 'Additional root classes.'
		}
	];

	const itemPropsData = [
		{
			name: 'type',
			type: "'button' | 'link' | 'group'",
			default: 'required',
			description: 'Item renderer.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: 'required',
			description: 'Visible item content.'
		},
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: "'normal'",
			description: 'Button content layout.'
		},
		{
			name: 'items',
			type: 'ToolbarGroupItem[]',
			default: 'required for group',
			description: 'Group controls.'
		},
		{
			name: 'value',
			type: 'string | string[]',
			default: 'none',
			description: 'Selected group value.'
		}
	];
</script>

{#snippet boldContent()}
	<Bold />
{/snippet}

{#snippet italicContent()}
	<Italic />
{/snippet}

{#snippet underlineContent()}
	<Underline />
{/snippet}

{#snippet listContent()}
	<List />
{/snippet}

{#snippet saveContent()}
	<Save />
	Save
{/snippet}

{#snippet docsContent()}
	<Link2 />
	Docs
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Toolbar</h1>
		<p class="text-kl-muted-content mt-2">Keyboard-aware item toolbar.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Actions"
			description="Render toolbar buttons from an item array."
			code={`{#snippet boldContent()}<Bold />{/snippet}
{#snippet italicContent()}<Italic />{/snippet}

<Toolbar
  ariaLabel="Formatting"
  variant="outline"
  size="sm"
  items={[
    { type: 'button', content: 'icon', ariaLabel: 'Bold', children: boldContent },
    { type: 'button', content: 'icon', ariaLabel: 'Italic', children: italicContent }
  ]}
/>`}
		>
			<Toolbar
				ariaLabel="Formatting"
				variant="outline"
				size="sm"
				items={[
					{ type: 'button', content: 'icon', ariaLabel: 'Bold', children: boldContent },
					{ type: 'button', content: 'icon', ariaLabel: 'Italic', children: italicContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Group"
			description="Toolbar group items share the same size token as buttons."
			code={`<Toolbar
  ariaLabel="Text style"
  variant="ghost"
  items={[
    {
      type: 'group',
      groupType: 'multiple',
      items: [
        { value: 'bold', content: 'icon', ariaLabel: 'Bold', children: boldContent },
        { value: 'italic', content: 'icon', ariaLabel: 'Italic', children: italicContent },
        { value: 'underline', content: 'icon', ariaLabel: 'Underline', children: underlineContent }
      ]
    }
  ]}
/>`}
		>
			<Toolbar
				ariaLabel="Text style"
				variant="ghost"
				items={[
					{
						type: 'group',
						groupType: 'multiple',
						items: [
							{ value: 'bold', content: 'icon', ariaLabel: 'Bold', children: boldContent },
							{ value: 'italic', content: 'icon', ariaLabel: 'Italic', children: italicContent },
							{
								value: 'underline',
								content: 'icon',
								ariaLabel: 'Underline',
								children: underlineContent
							}
						]
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Links and buttons"
			description="Mix navigation and commands in one toolbar."
			code={`<Toolbar
  ariaLabel="Document"
  items={[
    { type: 'link', href: '/components/toolbar', children: docsContent },
    { type: 'button', children: saveContent }
  ]}
/>`}
		>
			<Toolbar
				ariaLabel="Document"
				items={[
					{ type: 'link', href: '/components/toolbar', children: docsContent },
					{ type: 'button', children: saveContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Vertical"
			description="Use vertical orientation for side tool palettes."
			code={`<Toolbar
  orientation="vertical"
  variant="outline"
  items={[
    { type: 'button', content: 'icon', ariaLabel: 'Bold', children: boldContent },
    { type: 'button', content: 'icon', ariaLabel: 'List', children: listContent }
  ]}
/>`}
		>
			<Toolbar
				orientation="vertical"
				variant="outline"
				items={[
					{ type: 'button', content: 'icon', ariaLabel: 'Bold', children: boldContent },
					{ type: 'button', content: 'icon', ariaLabel: 'List', children: listContent }
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
