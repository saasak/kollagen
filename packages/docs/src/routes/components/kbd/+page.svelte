<script lang="ts">
	import { Kbd } from '$ui/kbd';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'Key label.'
		},
		{
			name: 'class',
			type: 'string',
			default: '-',
			description: 'Additional classes.'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Kbd</h1>
		<p class="text-kl-muted-content mt-2">Keyboard input tokens.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Shortcut" description="Use inside help text and menus." code="<Kbd>⌘</Kbd>">
			<div class="flex items-center gap-1"><Kbd>⌘</Kbd><Kbd>K</Kbd></div>
		</DemoCard>

		<DemoCard
			title="Menu shortcut"
			description="Align key tokens on the right side of command rows."
			code={`<button>
  Open command menu <Kbd>Ctrl</Kbd><Kbd>K</Kbd>
</button>`}
		>
			<div class="rounded-kl-box border-kl-base-300 max-w-sm border p-1">
				<button
					class="rounded-kl-field hover:bg-kl-base-200 flex w-full items-center justify-between px-3 py-2 text-sm"
				>
					<span>Open command menu</span>
					<span class="flex items-center gap-1"><Kbd>Ctrl</Kbd><Kbd>K</Kbd></span>
				</button>
			</div>
		</DemoCard>

		<DemoCard
			title="Text hint"
			description="Inline tokens keep shortcut help readable in prose."
			code="Press <Kbd>Esc</Kbd> to close the dialog."
		>
			<p class="text-sm">
				Press <Kbd>Esc</Kbd> to close the dialog, or <Kbd>Enter</Kbd> to confirm.
			</p>
		</DemoCard>

		<DemoCard
			title="Navigation cluster"
			description="Use consistent sizing for directional or paging controls."
			code="<Kbd>J</Kbd><Kbd>K</Kbd>"
		>
			<div class="flex flex-wrap items-center gap-2 text-sm">
				<span class="text-kl-muted-content">Move selection</span>
				<Kbd>J</Kbd>
				<Kbd>K</Kbd>
				<span class="text-kl-muted-content">then</span>
				<Kbd>Enter</Kbd>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
