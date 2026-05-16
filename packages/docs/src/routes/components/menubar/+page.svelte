<script lang="ts">
	import { Menubar } from '$ui/menubar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import {
		CreditCard,
		FilePlus2,
		FolderOpen,
		HelpCircle,
		PanelLeft,
		Redo2,
		Undo2,
		Users
	} from 'lucide-svelte';

	let lastSelected = $state('No menu item selected');

	const propsData = [
		{
			name: 'menus',
			type: 'MenubarMenu[]',
			default: 'required',
			description: 'Top-level menu definitions.'
		},
		{
			name: 'variant',
			type: "'solid' | 'outline' | 'dash' | 'soft' | 'ghost' | 'link'",
			default: "'solid'",
			description: 'Visual style passed to every trigger.'
		},
		{
			name: 'color',
			type: "'base' | 'neutral' | 'primary' | status color",
			default: "'base'",
			description: 'Semantic color passed to every trigger.'
		},
		{
			name: 'size',
			type: "'xs' | 'sm' | 'md' | 'lg'",
			default: "'md'",
			description: 'Trigger size.'
		},
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: "'normal'",
			description: 'Default trigger content layout.'
		},
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Visual layout direction.'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: 'none',
			description: 'Called when an item is selected.'
		},
		{
			name: 'class',
			type: 'string',
			default: 'none',
			description: 'Additional root classes.'
		}
	];

	const itemPropsData = [
		{ name: 'children', type: 'Snippet', default: 'required', description: 'Visible content.' },
		{ name: 'items', type: 'MenubarItem[]', default: 'required', description: 'Menu items.' },
		{ name: 'value', type: 'string', default: 'index for menus', description: 'Selection value.' },
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the entry.' },
		{
			name: 'content',
			type: "'normal' | 'icon'",
			default: 'group content',
			description: 'Per-trigger content layout.'
		}
	];
</script>

{#snippet fileMenu()}
	File
{/snippet}

{#snippet editMenu()}
	Edit
{/snippet}

{#snippet viewMenu()}
	View
{/snippet}

{#snippet accountMenu()}
	Account
{/snippet}

{#snippet billingMenu()}
	Billing
{/snippet}

{#snippet projectMenu()}
	<FolderOpen />
{/snippet}

{#snippet helpMenu()}
	<HelpCircle />
{/snippet}

{#snippet newItem()}
	<FilePlus2 />
	New
{/snippet}

{#snippet exportItem()}
	Export
{/snippet}

{#snippet undoItem()}
	<Undo2 />
	Undo
{/snippet}

{#snippet redoItem()}
	<Redo2 />
	Redo
{/snippet}

{#snippet sidebarItem()}
	<PanelLeft />
	Show sidebar
{/snippet}

{#snippet activityItem()}
	Show activity
{/snippet}

{#snippet zenItem()}
	Zen mode
{/snippet}

{#snippet docsItem()}
	Documentation
{/snippet}

{#snippet supportItem()}
	Contact support
{/snippet}

{#snippet workspaceItem()}
	<FolderOpen />
	Switch workspace
{/snippet}

{#snippet membersItem()}
	<Users />
	Manage members
{/snippet}

{#snippet invoicesItem()}
	<CreditCard />
	Open invoices
{/snippet}

{#snippet paymentItem()}
	Update payment method
{/snippet}

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Menubar</h1>
		<p class="text-kl-muted-content mt-2">Persistent app menus built with Bits UI.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Application menu"
			description="Top-level triggers render through the shared Trigger component."
			code={`{#snippet fileMenu()}File{/snippet}
{#snippet newItem()}<FilePlus2 /> New{/snippet}

<Menubar
  variant="outline"
  menus={[
    {
      children: fileMenu,
      items: [
        { value: "new", children: newItem },
        { value: "export", children: exportItem }
      ]
    }
  ]}
/>`}
		>
			<Menubar
				variant="outline"
				menus={[
					{
						children: fileMenu,
						items: [
							{ value: 'new', children: newItem },
							{ value: 'export', children: exportItem }
						]
					},
					{
						children: editMenu,
						items: [
							{ value: 'undo', children: undoItem },
							{ value: 'redo', children: redoItem }
						]
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Selection callback"
			description="Handle selected values from any menu."
			code={`<Menubar
  menus={[
    {
      children: viewMenu,
      items: [
        { value: "view.sidebar", children: sidebarItem },
        { value: "view.zen", children: zenItem, disabled: true }
      ]
    }
  ]}
  onSelect={(value) => (lastSelected = "Selected " + value)}
/>`}
		>
			<div class="space-y-3">
				<Menubar
					menus={[
						{
							children: fileMenu,
							items: [
								{ value: 'project.open', children: workspaceItem },
								{ value: 'project.export', children: exportItem }
							]
						},
						{
							children: viewMenu,
							items: [
								{ value: 'view.sidebar', children: sidebarItem },
								{ value: 'view.activity', children: activityItem },
								{ value: 'view.zen', children: zenItem, disabled: true }
							]
						},
						{
							children: helpMenu,
							content: 'icon',
							ariaLabel: 'Help',
							items: [
								{ value: 'help.docs', children: docsItem },
								{ value: 'help.support', children: supportItem }
							]
						}
					]}
					onSelect={(value) => (lastSelected = `Selected ${value}`)}
				/>
				<p class="text-kl-muted-content text-sm">{lastSelected}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Vertical"
			description="Vertical orientation changes visual layout while preserving Bits UI behavior."
			code={`<Menubar
  orientation="vertical"
  size="sm"
  variant="outline"
  menus={[
    { children: projectMenu, content: "icon", ariaLabel: "Project", items: [...] },
    { children: helpMenu, content: "icon", ariaLabel: "Help", items: [...] }
  ]}
/>`}
		>
			<Menubar
				orientation="vertical"
				size="sm"
				variant="outline"
				menus={[
					{
						children: projectMenu,
						content: 'icon',
						ariaLabel: 'Project',
						items: [
							{ value: 'project.open', children: workspaceItem },
							{ value: 'project.members', children: membersItem }
						]
					},
					{
						children: helpMenu,
						content: 'icon',
						ariaLabel: 'Help',
						items: [
							{ value: 'help.docs', children: docsItem },
							{ value: 'help.support', children: supportItem }
						]
					}
				]}
			/>
		</DemoCard>

		<DemoCard
			title="Embedded bar"
			description="Use shared color and size props in panel headers."
			code={`<Menubar
  color="secondary"
  size="sm"
  menus={[
    { children: accountMenu, items: [...] },
    { children: billingMenu, items: [...] }
  ]}
/>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-xl border">
				<div class="border-kl-base-300 flex items-center justify-between border-b p-2">
					<Menubar
						color="secondary"
						size="sm"
						menus={[
							{
								children: accountMenu,
								items: [
									{ value: 'workspace.switch', children: workspaceItem },
									{ value: 'workspace.members', children: membersItem }
								]
							},
							{
								children: billingMenu,
								items: [
									{ value: 'billing.invoices', children: invoicesItem },
									{ value: 'billing.payment', children: paymentItem }
								]
							}
						]}
					/>
					<span class="text-kl-muted-content px-2 text-sm">Workspace</span>
				</div>
				<div class="p-4 text-sm">Billing overview content</div>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Menu and item props</h2>
		<PropsTable items={itemPropsData} />
	</section>
</div>
