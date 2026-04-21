<script lang="ts">
	import { ScrollArea } from '$ui/scroll-area';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'children',
			type: 'Snippet',
			default: '—',
			description: 'Content to render inside the scroll area (required)'
		},
		{ name: 'dir', type: '"ltr" | "rtl"', default: '—', description: 'Text direction' },
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element (use to set height/width)'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">ScrollArea</h1>
		<p class="text-kl-muted-content mt-2">
			A scrollable container with custom-styled scrollbars. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Vertical scroll"
			description="Content taller than the container scrolls vertically."
			code={`<ScrollArea class="h-48 rounded-kl-box border border-kl-base-300">
  <div class="space-y-2 p-4">
    {#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
      <p class="text-sm">Line {n}</p>
    {/each}
  </div>
</ScrollArea>`}
		>
			<ScrollArea class="rounded-kl-box border-kl-base-300 h-48 border">
				<div class="space-y-2 p-4">
					{#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
						<p class="text-sm">Line {n}</p>
					{/each}
				</div>
			</ScrollArea>
		</DemoCard>

		<DemoCard
			title="Horizontal scroll"
			description="Content wider than the container scrolls horizontally."
			code={`<ScrollArea class="w-full rounded-kl-box border border-kl-base-300">
  <div class="flex gap-3 p-4" style="width: max-content">
    {#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
      <div class="w-24 shrink-0 rounded-kl-field bg-kl-base-200 p-3 text-center text-sm">
        Card {n}
      </div>
    {/each}
  </div>
</ScrollArea>`}
		>
			<ScrollArea class="rounded-kl-box border-kl-base-300 w-full border">
				<div class="flex gap-3 p-4" style="width: max-content">
					{#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
						<div class="rounded-kl-field bg-kl-base-200 w-24 shrink-0 p-3 text-center text-sm">
							Card {n}
						</div>
					{/each}
				</div>
			</ScrollArea>
		</DemoCard>

		<DemoCard
			title="Both axes"
			description="Content overflowing in both directions shows vertical and horizontal scrollbars."
			code={`<ScrollArea class="h-48 w-full rounded-kl-box border border-kl-base-300">
  <div class="p-4" style="width: 800px">
    {#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
      <p class="text-sm whitespace-nowrap">Row {n} — This line is intentionally wide to trigger horizontal overflow</p>
    {/each}
  </div>
</ScrollArea>`}
		>
			<ScrollArea class="rounded-kl-box border-kl-base-300 h-48 w-full border">
				<div class="p-4" style="width: 800px">
					{#each Array.from({ length: 20 }, (_, i) => i + 1) as n}
						<p class="text-sm whitespace-nowrap">
							Row {n} — This line is intentionally wide to trigger horizontal overflow
						</p>
					{/each}
				</div>
			</ScrollArea>
		</DemoCard>

		<DemoCard
			title="Rich content"
			description="Scroll area wrapping a list of items with different heights."
			code={`<ScrollArea class="h-64 rounded-kl-box border border-kl-base-300">
  <div class="divide-y divide-kl-base-300">
    {#each [
      { initials: "AL", name: "Alice Larsson", email: "alice@example.com" },
      { initials: "BM", name: "Bob Martin", email: "bob@example.com" },
      { initials: "CR", name: "Clara Rossi", email: "clara@example.com" },
      { initials: "DK", name: "David Kim", email: "david@example.com" },
      { initials: "EV", name: "Eva Virtanen", email: "eva@example.com" },
      { initials: "FN", name: "Frank Novak", email: "frank@example.com" },
      { initials: "GH", name: "Grace Huang", email: "grace@example.com" },
      { initials: "HB", name: "Hugo Bernard", email: "hugo@example.com" },
    ] as item}
      <div class="flex items-start gap-3 p-4">
        <div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-kl-primary text-xs font-semibold text-kl-primary-content">
          {item.initials}
        </div>
        <div>
          <p class="text-sm font-medium">{item.name}</p>
          <p class="mt-0.5 text-xs text-kl-muted-content">{item.email}</p>
        </div>
      </div>
    {/each}
  </div>
</ScrollArea>`}
		>
			<ScrollArea class="rounded-kl-box border-kl-base-300 h-64 border">
				<div class="divide-kl-base-300 divide-y">
					{#each [{ initials: 'AL', name: 'Alice Larsson', email: 'alice@example.com' }, { initials: 'BM', name: 'Bob Martin', email: 'bob@example.com' }, { initials: 'CR', name: 'Clara Rossi', email: 'clara@example.com' }, { initials: 'DK', name: 'David Kim', email: 'david@example.com' }, { initials: 'EV', name: 'Eva Virtanen', email: 'eva@example.com' }, { initials: 'FN', name: 'Frank Novak', email: 'frank@example.com' }, { initials: 'GH', name: 'Grace Huang', email: 'grace@example.com' }, { initials: 'HB', name: 'Hugo Bernard', email: 'hugo@example.com' }] as item}
						<div class="flex items-start gap-3 p-4">
							<div
								class="bg-kl-primary text-kl-primary-content flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
							>
								{item.initials}
							</div>
							<div>
								<p class="text-sm font-medium">{item.name}</p>
								<p class="text-kl-muted-content mt-0.5 text-xs">{item.email}</p>
							</div>
						</div>
					{/each}
				</div>
			</ScrollArea>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
