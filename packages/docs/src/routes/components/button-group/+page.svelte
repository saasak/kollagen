<script lang="ts">
	import { ButtonGroup } from '$ui/button-group';
	import type { MenuEntry } from '$ui/menu';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		ArrowLeft,
		ArrowRight,
		Copy,
		Download,
		Minus,
		MoreHorizontal,
		Plus,
		Trash2
	} from 'lucide-svelte';

	const moreActions = [
		{ label: 'Mark as unread', value: 'unread' },
		{ label: 'Move to folder', value: 'move' },
		{ type: 'separator' },
		{ label: 'Mute thread', value: 'mute' }
	] satisfies MenuEntry[];

	const propsData = [
		{
			name: 'items',
			type: 'ButtonGroupItem[]',
			default: 'required',
			description: 'Buttons and menu triggers to render'
		},
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style passed to every item'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | status color",
			default: "'base'",
			description: 'Semantic color passed to every item'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Button size passed to every item'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout direction'
		},
		{
			name: 'separator',
			type: 'boolean',
			default: 'true for explicit non-base color',
			description: 'Override separator visibility between items'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: 'none',
			description: 'Accessible label for the group'
		},
		{
			name: 'class',
			type: 'string',
			default: 'none',
			description: 'Additional CSS classes on the root element'
		}
	];

	const itemPropsData = [
		{
			name: 'type',
			type: "'button' | 'menu'",
			default: 'required',
			description: 'Item renderer'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: 'required',
			description: 'Visible item content'
		},
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: "'normal'",
			description: 'Button content layout'
		},
		{
			name: 'params',
			type: 'MenuEntry[]',
			default: 'required for menu',
			description: 'Menu entries for menu items'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the item'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: 'none',
			description: 'Accessible label for icon-only items'
		}
	];
</script>

{#snippet archiveContent()}
	Archive
{/snippet}

{#snippet reportContent()}
	Report
{/snippet}

{#snippet snoozeContent()}
	Snooze
{/snippet}

{#snippet backContent()}
	<ArrowLeft />
{/snippet}

{#snippet downloadContent()}
	<Download />
{/snippet}

{#snippet moreContent()}
	<MoreHorizontal />
{/snippet}

{#snippet increaseContent()}
	<Plus />
{/snippet}

{#snippet decreaseContent()}
	<Minus />
{/snippet}

{#snippet copyContent()}
	<Copy />
	Copy
{/snippet}

{#snippet deleteContent()}
	<Trash2 />
	Delete
{/snippet}

{#snippet smallContent()}
	Small
{/snippet}

{#snippet defaultContent()}
	Default
{/snippet}

{#snippet largeContent()}
	Large
{/snippet}

{#snippet nextContent()}
	<ArrowRight />
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">ButtonGroup</h1>
		<p class="text-kl-muted-content mt-2">
			A compact item-driven container for related action buttons and menus.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Pass items and keep the group visually attached."
			code={`{#snippet archiveContent()}Archive{/snippet}
{#snippet reportContent()}Report{/snippet}
{#snippet snoozeContent()}Snooze{/snippet}

<ButtonGroup
  ariaLabel="File actions"
  variant="outline"
  items={[
    { type: 'button', children: archiveContent },
    { type: 'button', children: reportContent },
    { type: 'button', children: snoozeContent }
  ]}
/>`}
		>
			<ButtonGroup
				ariaLabel="File actions"
				variant="outline"
				items={[
					{ type: 'button', children: archiveContent },
					{ type: 'button', children: reportContent },
					{ type: 'button', children: snoozeContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Menu item"
			description="Menu items use Trigger for the visible button."
			code={`{#snippet backContent()}<ArrowLeft />{/snippet}
{#snippet downloadContent()}<Download />{/snippet}
{#snippet moreContent()}<MoreHorizontal />{/snippet}

<ButtonGroup
  ariaLabel="Message actions"
  variant="outline"
  size="sm"
  items={[
    { type: 'button', content: 'icon', ariaLabel: 'Back', children: backContent },
    { type: 'button', content: 'icon', ariaLabel: 'Download', children: downloadContent },
    {
      type: 'menu',
      content: 'icon',
      ariaLabel: 'More',
      children: moreContent,
      params: moreActions
    }
  ]}
/>`}
		>
			<ButtonGroup
				ariaLabel="Message actions"
				variant="outline"
				size="sm"
				items={[
					{ type: 'button', content: 'icon', ariaLabel: 'Back', children: backContent },
					{
						type: 'button',
						content: 'icon',
						ariaLabel: 'Download',
						children: downloadContent
					},
					{
						type: 'menu',
						content: 'icon',
						ariaLabel: 'More',
						children: moreContent,
						params: moreActions
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Orientation"
			description="Use vertical orientation for compact steppers."
			code={`<ButtonGroup
  orientation="vertical"
  ariaLabel="Quantity controls"
  variant="outline"
  items={[
    { type: 'button', content: 'icon', ariaLabel: 'Increase', children: increaseContent },
    { type: 'button', content: 'icon', ariaLabel: 'Decrease', children: decreaseContent }
  ]}
/>`}
		>
			<ButtonGroup
				orientation="vertical"
				ariaLabel="Quantity controls"
				variant="outline"
				items={[
					{
						type: 'button',
						content: 'icon',
						ariaLabel: 'Increase',
						children: increaseContent
					},
					{
						type: 'button',
						content: 'icon',
						ariaLabel: 'Decrease',
						children: decreaseContent
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Shared style"
			description="Explicit non-base colors add separators by default."
			code={`<ButtonGroup
  ariaLabel="Clipboard actions"
  color="secondary"
  size="sm"
  items={[
    { type: 'button', children: copyContent },
    { type: 'button', children: deleteContent }
  ]}
/>`}
		>
			<ButtonGroup
				ariaLabel="Clipboard actions"
				color="secondary"
				size="sm"
				items={[
					{ type: 'button', children: copyContent },
					{ type: 'button', children: deleteContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Forced separators"
			description="Use separator to override the color-based default."
			code={`<ButtonGroup
  ariaLabel="Clipboard actions"
  separator
  variant="outline"
  items={[
    { type: 'button', children: copyContent },
    { type: 'button', children: deleteContent }
  ]}
/>`}
		>
			<ButtonGroup
				ariaLabel="Clipboard actions"
				separator
				variant="outline"
				items={[
					{ type: 'button', children: copyContent },
					{ type: 'button', children: deleteContent }
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Sizes"
			description="Render multiple groups with the same item shape."
			code={`<div class="flex flex-col items-start gap-4">
  <ButtonGroup size="sm" variant="outline" items={[...]} />
  <ButtonGroup variant="outline" items={[...]} />
  <ButtonGroup size="lg" variant="outline" items={[...]} />
</div>`}
		>
			<div class="flex flex-col items-start gap-4">
				<ButtonGroup
					ariaLabel="Small pagination"
					size="sm"
					variant="outline"
					items={[
						{ type: 'button', children: smallContent },
						{ type: 'button', content: 'icon', ariaLabel: 'Next', children: nextContent }
					]}
				/>
				<ButtonGroup
					ariaLabel="Default pagination"
					variant="outline"
					items={[
						{ type: 'button', children: defaultContent },
						{ type: 'button', content: 'icon', ariaLabel: 'Next', children: nextContent }
					]}
				/>
				<ButtonGroup
					ariaLabel="Large pagination"
					size="lg"
					variant="outline"
					items={[
						{ type: 'button', children: largeContent },
						{ type: 'button', content: 'icon', ariaLabel: 'Next', children: nextContent }
					]}
				/>
			</div>
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
