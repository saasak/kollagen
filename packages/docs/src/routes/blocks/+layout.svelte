<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-1">
	<Sidebar />
	<main class="flex-1 overflow-y-auto p-6 lg:p-10">
		{@render children()}
	</main>
</div>
