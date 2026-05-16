<script lang="ts">
	import { Multibar } from '$ui/multibar';
	import type { MenuEntry } from '$ui/menu';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		AlignCenter,
		AlignLeft,
		AlignRight,
		Bold,
		Copy,
		FilePlus2,
		FolderOpen,
		Italic,
		MoreHorizontal,
		Redo2,
		Save,
		Undo2
	} from 'lucide-svelte';

	const moreActions = [
		{ label: 'Duplicate', value: 'duplicate' },
		{ label: 'Move to folder', value: 'move' },
		{ type: 'separator' },
		{ label: 'Archive', value: 'archive' }
	] satisfies MenuEntry[];

	const propsData = [
		{
			name: 'items',
			type: 'MultibarItem[]',
			default: 'required',
			description: 'Groups to render inside the toolbar.'
		},
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style passed to every group.'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | 'secondary' | 'accent' | status color",
			default: "'base'",
			description: 'Semantic color passed to every group.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Control size passed to every group.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Shared layout direction.'
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
			type: "'buttonGroup' | 'menubar' | 'toggleGroup' | 'toolbar'",
			default: 'required',
			description: 'Rendered group.'
		},
		{
			name: 'variant/color/size',
			type: 'Button variants',
			default: 'Multibar value',
			description: 'Per-group visual overrides.'
		},
		{
			name: 'items',
			type: 'ButtonGroupItem[] | ToggleGroupItem[] | ToolbarItem[]',
			default: 'required',
			description: 'Items for button, toggle, and toolbar groups.'
		},
		{
			name: 'menus',
			type: 'MenubarMenu[]',
			default: 'required for menubar',
			description: 'Menus for menubar groups.'
		}
	];
</script>

{#snippet undoContent()}
	<Undo2 />
{/snippet}

{#snippet redoContent()}
	<Redo2 />
{/snippet}

{#snippet saveContent()}
	<Save />
	Save
{/snippet}

{#snippet moreContent()}
	<MoreHorizontal />
{/snippet}

{#snippet fileMenu()}
	File
{/snippet}

{#snippet projectMenu()}
	Project
{/snippet}

{#snippet newFileItem()}
	<FilePlus2 />
	New file
{/snippet}

{#snippet openItem()}
	<FolderOpen />
	Open
{/snippet}

{#snippet alignLeftContent()}
	<AlignLeft />
{/snippet}

{#snippet alignCenterContent()}
	<AlignCenter />
{/snippet}

{#snippet alignRightContent()}
	<AlignRight />
{/snippet}

{#snippet boldContent()}
	<Bold />
{/snippet}

{#snippet italicContent()}
	<Italic />
{/snippet}

{#snippet copyContent()}
	<Copy />
	Copy
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Multibar</h1>
		<p class="text-kl-muted-content mt-2">
			A composite toolbar for button groups, menubars, toggle groups, and toolbars.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Editor"
			description="Compose multiple action groups with uniform sizing."
			code={`<Multibar
  ariaLabel="Editor toolbar"
  variant="outline"
  size="sm"
  items={[
    { type: 'buttonGroup', items: [...] },
    { type: 'menubar', menus: [...] },
    { type: 'toggleGroup', groupType: 'single', items: [...] },
    { type: 'toolbar', items: [...] }
  ]}
/>`}
		>
			<Multibar
				ariaLabel="Editor toolbar"
				variant="outline"
				size="sm"
				items={[
					{
						type: 'buttonGroup',
						items: [
							{ type: 'button', content: 'icon', ariaLabel: 'Undo', children: undoContent },
							{ type: 'button', content: 'icon', ariaLabel: 'Redo', children: redoContent },
							{ type: 'button', children: saveContent },
							{
								type: 'menu',
								content: 'icon',
								ariaLabel: 'More actions',
								children: moreContent,
								params: moreActions
							}
						]
					},
					{
						type: 'menubar',
						menus: [
							{
								children: fileMenu,
								items: [
									{ value: 'file.new', children: newFileItem },
									{ value: 'file.open', children: openItem }
								]
							},
							{
								children: projectMenu,
								items: [
									{ value: 'project.copy', children: copyContent },
									{ value: 'project.save', children: saveContent }
								]
							}
						]
					},
					{
						type: 'toggleGroup',
						groupType: 'single',
						value: 'left',
						items: [
							{
								value: 'left',
								content: 'icon',
								ariaLabel: 'Align left',
								children: alignLeftContent
							},
							{
								value: 'center',
								content: 'icon',
								ariaLabel: 'Align center',
								children: alignCenterContent
							},
							{
								value: 'right',
								content: 'icon',
								ariaLabel: 'Align right',
								children: alignRightContent
							}
						]
					},
					{
						type: 'toolbar',
						variant: 'ghost',
						items: [
							{ type: 'button', content: 'icon', ariaLabel: 'Bold', children: boldContent },
							{ type: 'button', content: 'icon', ariaLabel: 'Italic', children: italicContent }
						]
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Vertical"
			description="Every group inherits the same orientation."
			code={`<Multibar
  orientation="vertical"
  variant="outline"
  items={[
    { type: 'buttonGroup', items: [...] },
    { type: 'toggleGroup', items: [...] }
  ]}
/>`}
		>
			<Multibar
				orientation="vertical"
				variant="outline"
				items={[
					{
						type: 'buttonGroup',
						items: [
							{ type: 'button', content: 'icon', ariaLabel: 'Undo', children: undoContent },
							{ type: 'button', content: 'icon', ariaLabel: 'Redo', children: redoContent }
						]
					},
					{
						type: 'toggleGroup',
						groupType: 'single',
						value: 'left',
						items: [
							{
								value: 'left',
								content: 'icon',
								ariaLabel: 'Align left',
								children: alignLeftContent
							},
							{
								value: 'center',
								content: 'icon',
								ariaLabel: 'Align center',
								children: alignCenterContent
							},
							{
								value: 'right',
								content: 'icon',
								ariaLabel: 'Align right',
								children: alignRightContent
							}
						]
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Field size token"
			description="Control height through --kl-size-field."
			code={`<div style="--kl-size-field: 0.21875rem">
  <Multibar size="md" items={[...]} />
</div>`}
		>
			<div style="--kl-size-field: 0.21875rem">
				<Multibar
					ariaLabel="Compact toolbar"
					size="md"
					items={[
						{
							type: 'buttonGroup',
							items: [
								{ type: 'button', content: 'icon', ariaLabel: 'Undo', children: undoContent },
								{ type: 'button', content: 'icon', ariaLabel: 'Redo', children: redoContent }
							]
						},
						{
							type: 'toolbar',
							variant: 'ghost',
							items: [
								{ type: 'button', content: 'icon', ariaLabel: 'Bold', children: boldContent },
								{ type: 'button', content: 'icon', ariaLabel: 'Italic', children: italicContent }
							]
						}
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
