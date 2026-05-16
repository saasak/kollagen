<script lang="ts">
	import { Menubar } from '$ui/menubar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const menus = [
		{
			label: 'File',
			items: [
				{ label: 'New', value: 'new' },
				{ label: 'Export', value: 'export' }
			]
		},
		{
			label: 'Edit',
			items: [
				{ label: 'Undo', value: 'undo' },
				{ label: 'Redo', value: 'redo' }
			]
		}
	];
	const projectMenus = [
		{
			label: 'Project',
			items: [
				{ label: 'Open project', value: 'project.open' },
				{ label: 'Duplicate project', value: 'project.duplicate' },
				{ label: 'Archive project', value: 'project.archive' }
			]
		},
		{
			label: 'View',
			items: [
				{ label: 'Show sidebar', value: 'view.sidebar' },
				{ label: 'Show activity', value: 'view.activity' },
				{ label: 'Zen mode', value: 'view.zen', disabled: true }
			]
		},
		{
			label: 'Help',
			items: [
				{ label: 'Documentation', value: 'help.docs' },
				{ label: 'Contact support', value: 'help.support' }
			]
		}
	];
	const billingMenus = [
		{
			label: 'Account',
			items: [
				{ label: 'Switch workspace', value: 'workspace.switch' },
				{ label: 'Manage members', value: 'workspace.members' }
			]
		},
		{
			label: 'Billing',
			items: [
				{ label: 'Open invoices', value: 'billing.invoices' },
				{ label: 'Update payment method', value: 'billing.payment' }
			]
		}
	];

	let lastSelected = $state('No menu item selected');

	const propsData = [
		{
			name: 'menus',
			type: 'MenubarMenu[]',
			default: '-',
			description: 'Top-level menu definitions.'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: '-',
			description: 'Called when an item is selected.'
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
		<h1 class="text-3xl font-bold">Menubar</h1>
		<p class="text-kl-muted-content mt-2">Persistent app menus built with Bits UI.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Application menu"
			description="Keyboard accessible menu bar."
			code={`<Menubar
  menus={[
    {
      label: "File",
      items: [
        { label: "New", value: "new" },
        { label: "Export", value: "export" }
      ]
    },
    {
      label: "Edit",
      items: [
        { label: "Undo", value: "undo" },
        { label: "Redo", value: "redo" }
      ]
    }
  ]}
/>`}
		>
			<Menubar {menus} />
		</DemoCard>

		<DemoCard
			title="Selection callback"
			description="Handle selected values from any menu."
			code={`const projectMenus = [
  {
    label: "Project",
    items: [
      { label: "Open project", value: "project.open" },
      { label: "Archive project", value: "project.archive" }
    ]
  },
  {
    label: "View",
    items: [
      { label: "Show sidebar", value: "view.sidebar" },
      { label: "Zen mode", value: "view.zen", disabled: true }
    ]
  }
];

<Menubar
  menus={projectMenus}
  onSelect={(value) => (lastSelected = "Selected " + value)}
/>`}
		>
			<div class="space-y-3">
				<Menubar menus={projectMenus} onSelect={(value) => (lastSelected = `Selected ${value}`)} />
				<p class="text-kl-muted-content text-sm">{lastSelected}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled actions"
			description="Mark unavailable menu items without removing discoverability."
			code={`const menus = [{
  label: "View",
  items: [{ label: "Zen mode", value: "view.zen", disabled: true }]
}];

<Menubar menus={menus} />`}
		>
			<Menubar menus={projectMenus} />
		</DemoCard>

		<DemoCard
			title="Embedded bar"
			description="Place a menubar inside a panel header for app-like workflows."
			code={`const billingMenus = [
  {
    label: "Account",
    items: [
      { label: "Switch workspace", value: "workspace.switch" },
      { label: "Manage members", value: "workspace.members" }
    ]
  },
  {
    label: "Billing",
    items: [
      { label: "Open invoices", value: "billing.invoices" },
      { label: "Update payment method", value: "billing.payment" }
    ]
  }
];

<div class="panel-header">
  <Menubar menus={billingMenus} />
</div>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-xl border">
				<div class="border-kl-base-300 flex items-center justify-between border-b p-2">
					<Menubar menus={billingMenus} />
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
</div>
