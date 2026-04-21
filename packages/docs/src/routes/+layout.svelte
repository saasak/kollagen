<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { Menu } from 'lucide-svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { sidebarState } from '$lib/sidebar-state.svelte';
	import type { Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	const isComponentPage = $derived(
		$page.url.pathname.startsWith('/components') || $page.url.pathname.startsWith('/blocks')
	);
</script>

<div class="bg-kl-base-100 text-kl-base-content flex min-h-screen flex-col">
	<!-- Top bar -->
	<header
		class="border-kl-base-300 bg-kl-base-100 flex h-14 items-center justify-between border-b px-4"
	>
		<div class="flex items-center gap-4">
			{#if isComponentPage}
				<button
					onclick={() => sidebarState.toggle()}
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex items-center justify-center p-2 lg:hidden"
					aria-label="Toggle sidebar"
				>
					<Menu size={18} />
				</button>
			{/if}
			<a href="/" class="text-kl-base-content text-lg font-bold no-underline">Kollagen</a>
		</div>
		<div class="flex items-center gap-2">
			<a
				href="/getting-started"
				class="rounded-kl-field text-kl-base-content hover:bg-kl-muted px-3 py-1.5 text-sm no-underline transition-colors"
			>
				Getting Started
			</a>
			<a
				href="/components/combobox"
				class="rounded-kl-field text-kl-base-content hover:bg-kl-muted px-3 py-1.5 text-sm no-underline transition-colors"
			>
				Components
			</a>
			<a
				href="/blocks/chat-panel"
				class="rounded-kl-field text-kl-base-content hover:bg-kl-muted px-3 py-1.5 text-sm no-underline transition-colors"
			>
				Blocks
			</a>
			<ThemeSwitcher />
			<ThemeToggle />
		</div>
	</header>

	{@render children()}
</div>
