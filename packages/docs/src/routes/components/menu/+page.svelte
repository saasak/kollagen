<script lang="ts">
	import {
		CheckboxGroup,
		CheckboxItem,
		Content as MenuContent,
		GroupHeading as MenuGroupHeading,
		Menu,
		Portal as MenuPortal,
		RadioGroup,
		RadioItem,
		Root as MenuRoot,
		Separator as MenuSeparator,
		Trigger as MenuTrigger
	} from '$ui/menu';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Check } from 'lucide-svelte';

	const fileItems = [
		{ label: 'New File', value: 'new-file' },
		{ label: 'Open...', value: 'open' },
		{ label: 'Save', value: 'save' },
		{ label: 'Export as PDF', value: 'export-pdf' }
	];

	const groupedItems = [
		{
			type: 'group' as const,
			label: 'Actions',
			items: [
				{ label: 'Edit', value: 'edit' },
				{ label: 'Duplicate', value: 'duplicate' }
			]
		},
		{ type: 'separator' as const },
		{
			type: 'group' as const,
			label: 'Danger',
			items: [
				{ label: 'Archive', value: 'archive' },
				{ label: 'Delete', value: 'delete' }
			]
		}
	];

	const nestedItems = [
		{ label: 'New File', value: 'new-file' },
		{
			type: 'submenu' as const,
			label: 'Open Recent',
			items: [
				{ label: 'Dashboard.svelte', value: 'recent-dashboard' },
				{ label: 'Settings.svelte', value: 'recent-settings' },
				{
					type: 'submenu' as const,
					label: 'Projects',
					items: [
						{ label: 'Kollagen', value: 'project-kollagen' },
						{ label: 'SaaS app', value: 'project-saas' }
					]
				}
			]
		},
		{ type: 'separator' as const },
		{ label: 'Settings', value: 'settings' }
	];

	const mixedItems = [
		{ label: 'Cut', value: 'cut' },
		{ label: 'Copy', value: 'copy' },
		{ label: 'Paste', value: 'paste' },
		{ type: 'separator' as const },
		{ label: 'Select All', value: 'select-all' }
	];

	const withDisabledItems = [
		{ label: 'Undo', value: 'undo' },
		{ label: 'Redo', value: 'redo', disabled: true },
		{ type: 'separator' as const },
		{ label: 'Cut', value: 'cut' },
		{ label: 'Copy', value: 'copy', disabled: true },
		{ label: 'Paste', value: 'paste' }
	];

	let lastAction = $state('');
	let menuDensity = $state('comfortable');
	let visiblePanels = $state(['sidebar', 'activity']);

	const menuItemClass =
		'rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 flex cursor-pointer items-center px-3 py-2 text-sm transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50';
	const indicatorClass = 'mr-2 flex size-4 items-center justify-center';

	const propsData = [
		{
			name: 'items',
			type: 'MenuEntry[]',
			default: '—',
			description: 'Array of menu items, groups, separators, and recursive submenus'
		},
		{
			name: 'open',
			type: 'boolean',
			default: '—',
			description: 'Controlled open state. Supports bind:open'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable the menu trigger'
		},
		{
			name: 'closeOnSelect',
			type: 'boolean',
			default: 'true',
			description: 'Close menu after an item is selected'
		},
		{
			name: 'loop',
			type: 'boolean',
			default: 'false',
			description: 'Loop keyboard navigation at list boundaries'
		},
		{
			name: 'onSelect',
			type: '(value: string) => void',
			default: '—',
			description: 'Callback when a menu item is selected'
		},
		{
			name: 'onOpenChange',
			type: '(open: boolean) => void',
			default: '—',
			description: 'Callback when the menu opens or closes'
		},
		{
			name: 'trigger',
			type: 'Snippet',
			default: '—',
			description: 'Content rendered inside the trigger button'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the menu content'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Menu</h1>
		<p class="text-kl-muted-content mt-2">
			Dropdown menu for actions and navigation. Supports grouping, separators, nested submenus, and
			disabled items. Built on bits-ui.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Simple dropdown menu with a list of actions."
			code={`<Menu
  items={[
    { label: "New File", value: "new-file" },
    { label: "Open...", value: "open" },
    { label: "Save", value: "save" },
    { label: "Export as PDF", value: "export-pdf" },
  ]}
  onSelect={(value) => console.log(value)}
>
  {#snippet trigger()}File{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu
					items={fileItems}
					onSelect={(value) => {
						lastAction = value;
					}}
				>
					{#snippet trigger()}File{/snippet}
				</Menu>
				{#if lastAction}
					<p class="text-kl-muted-content mt-2 text-sm">
						Selected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{lastAction}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="With separators"
			description="Use separator entries to visually divide groups of items."
			code={`<Menu
  items={[
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy" },
    { label: "Paste", value: "paste" },
    { type: "separator" },
    { label: "Select All", value: "select-all" },
  ]}
>
  {#snippet trigger()}Edit{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={mixedItems}>
					{#snippet trigger()}Edit{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Grouped items"
			description="Organize items into labeled groups with separators between them."
			code={`<Menu
  items={[
    {
      type: "group",
      label: "Actions",
      items: [
        { label: "Edit", value: "edit" },
        { label: "Duplicate", value: "duplicate" },
      ],
    },
    { type: "separator" },
    {
      type: "group",
      label: "Danger",
      items: [
        { label: "Archive", value: "archive" },
        { label: "Delete", value: "delete" },
      ],
    },
  ]}
>
  {#snippet trigger()}Options{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={groupedItems}>
					{#snippet trigger()}Options{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Nested submenus"
			description="Submenus can contain other submenus for deeper action trees."
			code={`<Menu
  items={[
    { label: "New File", value: "new-file" },
    {
      type: "submenu",
      label: "Open Recent",
      items: [
        { label: "Dashboard.svelte", value: "recent-dashboard" },
        { label: "Settings.svelte", value: "recent-settings" },
        {
          type: "submenu",
          label: "Projects",
          items: [
            { label: "Kollagen", value: "project-kollagen" },
            { label: "SaaS app", value: "project-saas" },
          ],
        },
      ],
    },
    { type: "separator" },
    { label: "Settings", value: "settings" },
  ]}
>
  {#snippet trigger()}File{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={nestedItems}>
					{#snippet trigger()}File{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled items"
			description="Individual menu items can be disabled while others remain interactive."
			code={`<Menu
  items={[
    { label: "Undo", value: "undo" },
    { label: "Redo", value: "redo", disabled: true },
    { type: "separator" },
    { label: "Cut", value: "cut" },
    { label: "Copy", value: "copy", disabled: true },
    { label: "Paste", value: "paste" },
  ]}
>
  {#snippet trigger()}Edit{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={withDisabledItems}>
					{#snippet trigger()}Edit{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled trigger"
			description="The entire menu can be disabled via the trigger."
			code={`<Menu items={fileItems} disabled={true}>
  {#snippet trigger()}Disabled{/snippet}
</Menu>`}
		>
			<div class="max-w-sm">
				<Menu items={fileItems} disabled={true}>
					{#snippet trigger()}Disabled{/snippet}
				</Menu>
			</div>
		</DemoCard>

		<DemoCard
			title="Radio and checkbox groups"
			description="Compose the exposed Bits UI primitives for stateful menu options."
			code={`<script lang="ts">
  import {
    CheckboxGroup,
    CheckboxItem,
    Content,
    GroupHeading,
    Portal,
    RadioGroup,
    RadioItem,
    Root,
    Separator,
    Trigger
  } from "$ui/menu";

  let density = $state("comfortable");
  let panels = $state(["sidebar", "activity"]);
</${'script'}>

<Root>
  <Trigger>View</Trigger>
  <Portal>
    <Content>
      <GroupHeading>Density</GroupHeading>
      <RadioGroup bind:value={density}>
        <RadioItem value="compact" closeOnSelect={false}>Compact</RadioItem>
        <RadioItem value="comfortable" closeOnSelect={false}>Comfortable</RadioItem>
        <RadioItem value="spacious" closeOnSelect={false}>Spacious</RadioItem>
      </RadioGroup>
      <Separator />
      <GroupHeading>Panels</GroupHeading>
      <CheckboxGroup bind:value={panels}>
        <CheckboxItem value="sidebar" closeOnSelect={false}>Sidebar</CheckboxItem>
        <CheckboxItem value="activity" closeOnSelect={false}>Activity</CheckboxItem>
        <CheckboxItem value="preview" closeOnSelect={false}>Preview</CheckboxItem>
      </CheckboxGroup>
    </Content>
  </Portal>
</Root>`}
		>
			<div class="space-y-3">
				<MenuRoot>
					<MenuTrigger
						class="rounded-kl-field border-kl-base-300 hover:bg-kl-base-200 border px-3 py-1.5 text-sm"
					>
						View
					</MenuTrigger>
					<MenuPortal>
						<MenuContent class="w-52">
							<MenuGroupHeading>Density</MenuGroupHeading>
							<RadioGroup bind:value={menuDensity}>
								<RadioItem value="compact" closeOnSelect={false} class={menuItemClass}>
									{#snippet children({ checked })}
										<span class={indicatorClass}>
											{#if checked}
												<Check size={14} strokeWidth={3} aria-hidden="true" />
											{/if}
										</span>
										<span>Compact</span>
									{/snippet}
								</RadioItem>
								<RadioItem value="comfortable" closeOnSelect={false} class={menuItemClass}>
									{#snippet children({ checked })}
										<span class={indicatorClass}>
											{#if checked}
												<Check size={14} strokeWidth={3} aria-hidden="true" />
											{/if}
										</span>
										<span>Comfortable</span>
									{/snippet}
								</RadioItem>
								<RadioItem value="spacious" closeOnSelect={false} class={menuItemClass}>
									{#snippet children({ checked })}
										<span class={indicatorClass}>
											{#if checked}
												<Check size={14} strokeWidth={3} aria-hidden="true" />
											{/if}
										</span>
										<span>Spacious</span>
									{/snippet}
								</RadioItem>
							</RadioGroup>

							<MenuSeparator />

							<MenuGroupHeading>Panels</MenuGroupHeading>
							<CheckboxGroup bind:value={visiblePanels}>
								<CheckboxItem value="sidebar" closeOnSelect={false} class={menuItemClass}>
									{#snippet children({ checked })}
										<span class={indicatorClass}>
											{#if checked}
												<Check size={14} strokeWidth={3} aria-hidden="true" />
											{/if}
										</span>
										<span>Sidebar</span>
									{/snippet}
								</CheckboxItem>
								<CheckboxItem value="activity" closeOnSelect={false} class={menuItemClass}>
									{#snippet children({ checked })}
										<span class={indicatorClass}>
											{#if checked}
												<Check size={14} strokeWidth={3} aria-hidden="true" />
											{/if}
										</span>
										<span>Activity</span>
									{/snippet}
								</CheckboxItem>
								<CheckboxItem value="preview" closeOnSelect={false} class={menuItemClass}>
									{#snippet children({ checked })}
										<span class={indicatorClass}>
											{#if checked}
												<Check size={14} strokeWidth={3} aria-hidden="true" />
											{/if}
										</span>
										<span>Preview</span>
									{/snippet}
								</CheckboxItem>
							</CheckboxGroup>
						</MenuContent>
					</MenuPortal>
				</MenuRoot>

				<p class="text-kl-muted-content text-sm">
					{menuDensity} / {visiblePanels.join(', ') || 'no panels'}
				</p>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
