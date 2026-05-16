<script lang="ts">
	import { Toolbar, Button as ToolbarButton, Link as ToolbarLink } from '$ui/toolbar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';
	import { Bold, Italic, List, Save, Underline } from 'lucide-svelte';

	const propsData = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Toolbar direction.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Toolbar controls.'
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
		<h1 class="text-3xl font-bold">Toolbar</h1>
		<p class="text-kl-muted-content mt-2">Keyboard-aware toolbar primitive.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Formatting"
			description="Use exported internals for commands."
			code="<Toolbar><ToolbarButton /></Toolbar>"
		>
			<Toolbar>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Bold size={16} />
				</ToolbarButton>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Italic size={16} />
				</ToolbarButton>
			</Toolbar>
		</DemoCard>

		<DemoCard
			title="Full editor toolbar"
			description="Group common editor actions in one keyboard-aware row."
			code={`<Toolbar>
  <ToolbarButton><Bold /></ToolbarButton>
  <ToolbarButton><Italic /></ToolbarButton>
  <ToolbarButton><Underline /></ToolbarButton>
</Toolbar>`}
		>
			<Toolbar>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Bold size={16} />
				</ToolbarButton>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Italic size={16} />
				</ToolbarButton>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Underline size={16} />
				</ToolbarButton>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<List size={16} />
				</ToolbarButton>
			</Toolbar>
		</DemoCard>

		<DemoCard
			title="Vertical tools"
			description="Switch orientation for side tool palettes."
			code={`<Toolbar orientation="vertical">
  <ToolbarButton><Bold /></ToolbarButton>
</Toolbar>`}
		>
			<Toolbar orientation="vertical">
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Bold size={16} />
				</ToolbarButton>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Italic size={16} />
				</ToolbarButton>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 p-2">
					<Save size={16} />
				</ToolbarButton>
			</Toolbar>
		</DemoCard>

		<DemoCard
			title="Links and buttons"
			description="Mix toolbar links with command buttons when both share focus behavior."
			code={`<Toolbar>
  <ToolbarLink href="/components/toolbar">Docs</ToolbarLink>
  <ToolbarButton>Save</ToolbarButton>
</Toolbar>`}
		>
			<Toolbar>
				<ToolbarLink
					href="/components/toolbar"
					class="rounded-kl-selector hover:bg-kl-base-200 px-3 py-2 text-sm"
				>
					Docs
				</ToolbarLink>
				<ToolbarButton class="rounded-kl-selector hover:bg-kl-base-200 px-3 py-2 text-sm">
					Save
				</ToolbarButton>
			</Toolbar>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
