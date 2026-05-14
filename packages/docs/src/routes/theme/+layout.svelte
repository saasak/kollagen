<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex flex-1">
	<Sidebar />
	<main class="min-w-0 flex-1 p-6 lg:p-10">
		{@render children()}
	</main>
</div>
