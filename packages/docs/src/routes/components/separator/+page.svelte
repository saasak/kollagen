<script lang="ts">
	import { Separator } from '$ui/separator';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'orientation',
			type: "'horizontal' | 'vertical'",
			default: "'horizontal'",
			description: 'Separator direction.'
		},
		{
			name: 'decorative',
			type: 'boolean',
			default: 'true',
			description: 'Hide from assistive technology.'
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
		<h1 class="text-3xl font-bold">Separator</h1>
		<p class="text-kl-muted-content mt-2">Visual or semantic content separation.</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard title="Section" description="Horizontal separator." code="<Separator />">
			<div class="max-w-sm space-y-3">
				<p class="text-sm">Account</p>
				<Separator />
				<p class="text-kl-muted-content text-sm">Billing and profile settings.</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Toolbar groups"
			description="Use vertical separators between command groups."
			code={`<div class="flex items-center gap-3">
  <button>Undo</button>
  <Separator orientation="vertical" class="h-6" />
  <button>Save</button>
</div>`}
		>
			<div class="flex items-center gap-3 text-sm">
				<button class="rounded-kl-field hover:bg-kl-base-200 px-2 py-1">Undo</button>
				<button class="rounded-kl-field hover:bg-kl-base-200 px-2 py-1">Redo</button>
				<Separator orientation="vertical" class="h-6" />
				<button class="rounded-kl-field hover:bg-kl-base-200 px-2 py-1">Save</button>
			</div>
		</DemoCard>

		<DemoCard
			title="Semantic separator"
			description="Set decorative false when the division matters structurally."
			code="<Separator decorative={false} />"
		>
			<div class="max-w-md space-y-3">
				<p class="text-sm font-medium">Primary billing contact</p>
				<Separator decorative={false} />
				<p class="text-sm font-medium">Invoice recipients</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Inset divider"
			description="Customize spacing and width with utility classes."
			code="<Separator class=&quot;ml-10 w-auto&quot; />"
		>
			<div class="max-w-md space-y-3">
				<div class="flex items-center gap-3">
					<div class="bg-kl-primary size-7 rounded-full"></div>
					<div>
						<p class="text-sm font-medium">Maya Chen</p>
						<p class="text-kl-muted-content text-xs">Assigned owner</p>
					</div>
				</div>
				<Separator class="ml-10 w-auto" />
				<div class="flex items-center gap-3">
					<div class="bg-kl-secondary size-7 rounded-full"></div>
					<div>
						<p class="text-sm font-medium">Noah Patel</p>
						<p class="text-kl-muted-content text-xs">Backup owner</p>
					</div>
				</div>
			</div>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
