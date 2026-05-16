<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-1">
	<Sidebar />
	<main class="flex-1 overflow-y-auto p-6 lg:p-10">
		<div class="space-y-8">
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4 text-sm">
				<p class="text-kl-base-content font-medium">Component APIs</p>
				<p class="text-kl-muted-content mt-1">
					Use the named component for the ready-to-use version. Bits UI-based components also expose
					their primitives as short exports like <code>Root</code>, <code>Item</code>,
					<code>Trigger</code>, and <code>Content</code> for custom composition.
				</p>
			</div>
			{@render children()}
		</div>
	</main>
</div>
