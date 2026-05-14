<script lang="ts">
	import { Button } from '$ui/button';
	import { ButtonGroup, ButtonGroupSeparator } from '$ui/button-group';
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

	const propsData = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Layout direction'
		},
		{
			name: 'attached',
			type: 'boolean',
			default: 'true',
			description: 'Visually attach direct children'
		},
		{
			name: 'role',
			type: "'group' | 'toolbar'",
			default: "'group'",
			description: 'Accessible role for the group'
		},
		{
			name: 'ariaLabel',
			type: 'string',
			default: '—',
			description: 'Accessible label for the group'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Group content' }
	];

	const separatorPropsData = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'vertical'",
			description: 'Separator direction'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the separator'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">ButtonGroup</h1>
		<p class="text-kl-muted-content mt-2">A compact container for related action buttons.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Group related actions with shared edges."
			code={`<ButtonGroup ariaLabel="File actions">
  <Button variant="outline">Archive</Button>
  <Button variant="outline">Report</Button>
  <Button variant="outline">Snooze</Button>
</ButtonGroup>`}
		>
			<ButtonGroup ariaLabel="File actions">
				<Button variant="outline">Archive</Button>
				<Button variant="outline">Report</Button>
				<Button variant="outline">Snooze</Button>
			</ButtonGroup>
		</DemoCard>

		<DemoCard
			title="Toolbar"
			description="Nested groups create compact action bars."
			code={`<ButtonGroup role="toolbar" ariaLabel="Message toolbar" attached={false}>
  <ButtonGroup>
    <Button variant="outline" size="icon-sm" ariaLabel="Back"><ArrowLeft /></Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="sm">Archive</Button>
    <Button variant="outline" size="sm">Report</Button>
    <Button variant="outline" size="sm">Snooze</Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="icon-sm" ariaLabel="Download"><Download /></Button>
    <Button variant="outline" size="icon-sm" ariaLabel="More"><MoreHorizontal /></Button>
  </ButtonGroup>
</ButtonGroup>`}
		>
			<ButtonGroup role="toolbar" ariaLabel="Message toolbar" attached={false}>
				<ButtonGroup>
					<Button variant="outline" size="icon-sm" ariaLabel="Back"><ArrowLeft /></Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button variant="outline" size="sm">Archive</Button>
					<Button variant="outline" size="sm">Report</Button>
					<Button variant="outline" size="sm">Snooze</Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button variant="outline" size="icon-sm" ariaLabel="Download"><Download /></Button>
					<Button variant="outline" size="icon-sm" ariaLabel="More"><MoreHorizontal /></Button>
				</ButtonGroup>
			</ButtonGroup>
		</DemoCard>

		<DemoCard
			title="Orientation"
			description="Use vertical orientation for compact steppers."
			code={`<ButtonGroup orientation="vertical" ariaLabel="Quantity controls">
  <Button variant="outline" size="icon" ariaLabel="Increase"><Plus /></Button>
  <Button variant="outline" size="icon" ariaLabel="Decrease"><Minus /></Button>
</ButtonGroup>`}
		>
			<ButtonGroup orientation="vertical" ariaLabel="Quantity controls">
				<Button variant="outline" size="icon" ariaLabel="Increase"><Plus /></Button>
				<Button variant="outline" size="icon" ariaLabel="Decrease"><Minus /></Button>
			</ButtonGroup>
		</DemoCard>

		<DemoCard
			title="Sizes"
			description="Button sizes are controlled by each child button."
			code={`<div class="flex flex-col items-start gap-4">
  <ButtonGroup>
    <Button variant="outline" size="sm">Small</Button>
    <Button variant="outline" size="sm">Group</Button>
    <Button variant="outline" size="icon-sm" ariaLabel="Next"><ArrowRight /></Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline">Default</Button>
    <Button variant="outline">Group</Button>
    <Button variant="outline" size="icon" ariaLabel="Next"><ArrowRight /></Button>
  </ButtonGroup>
  <ButtonGroup>
    <Button variant="outline" size="lg">Large</Button>
    <Button variant="outline" size="lg">Group</Button>
    <Button variant="outline" size="icon-lg" ariaLabel="Next"><ArrowRight /></Button>
  </ButtonGroup>
</div>`}
		>
			<div class="flex flex-col items-start gap-4">
				<ButtonGroup>
					<Button variant="outline" size="sm">Small</Button>
					<Button variant="outline" size="sm">Group</Button>
					<Button variant="outline" size="icon-sm" ariaLabel="Next"><ArrowRight /></Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button variant="outline">Default</Button>
					<Button variant="outline">Group</Button>
					<Button variant="outline" size="icon" ariaLabel="Next"><ArrowRight /></Button>
				</ButtonGroup>
				<ButtonGroup>
					<Button variant="outline" size="lg">Large</Button>
					<Button variant="outline" size="lg">Group</Button>
					<Button variant="outline" size="icon-lg" ariaLabel="Next"><ArrowRight /></Button>
				</ButtonGroup>
			</div>
		</DemoCard>

		<DemoCard
			title="Separator"
			description="Use separators with filled variants to keep actions distinct."
			code={`<ButtonGroup ariaLabel="Clipboard actions">
  <Button color="secondary" size="sm"><Copy /> Copy</Button>
  <ButtonGroupSeparator />
  <Button color="secondary" size="sm"><Trash2 /> Delete</Button>
</ButtonGroup>`}
		>
			<ButtonGroup ariaLabel="Clipboard actions">
				<Button color="secondary" size="sm"><Copy /> Copy</Button>
				<ButtonGroupSeparator />
				<Button color="secondary" size="sm"><Trash2 /> Delete</Button>
			</ButtonGroup>
		</DemoCard>

		<DemoCard
			title="Detached"
			description="Turn off attached edges when the group is only semantic."
			code={`<ButtonGroup attached={false} ariaLabel="Detached actions">
  <Button variant="outline">Cancel</Button>
  <Button>Confirm</Button>
</ButtonGroup>`}
		>
			<ButtonGroup attached={false} ariaLabel="Detached actions">
				<Button variant="outline">Cancel</Button>
				<Button>Confirm</Button>
			</ButtonGroup>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Separator props</h2>
		<PropsTable items={separatorPropsData} />
	</section>
</div>
