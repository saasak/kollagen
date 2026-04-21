<script lang="ts">
	import { page } from '$app/stores';
	import { componentNav, blockNav } from '$lib/nav';
	import { sidebarState } from '$lib/sidebar-state.svelte';
	import { X } from 'lucide-svelte';

	function close() {
		sidebarState.open = false;
	}
</script>

<!-- Desktop sidebar -->
<aside class="border-kl-base-300 bg-kl-base-200 hidden w-64 shrink-0 flex-col border-r p-4 lg:flex">
	<h2 class="text-kl-muted-content mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
		Components
	</h2>
	<nav class="flex flex-col gap-0.5">
		{#each componentNav as item}
			<a
				href={item.href}
				class="rounded-kl-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname ===
				item.href
					? 'bg-kl-primary text-kl-primary-content'
					: 'text-kl-base-content hover:bg-kl-muted'}"
			>
				{item.label}
			</a>
		{/each}
	</nav>
	<h2 class="text-kl-muted-content mt-6 mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
		Blocks
	</h2>
	<nav class="flex flex-col gap-0.5">
		{#each blockNav as item}
			<a
				href={item.href}
				class="rounded-kl-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname ===
				item.href
					? 'bg-kl-primary text-kl-primary-content'
					: 'text-kl-base-content hover:bg-kl-muted'}"
			>
				{item.label}
			</a>
		{/each}
	</nav>
</aside>

<!-- Mobile overlay -->
{#if sidebarState.open}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-40 lg:hidden"
		onclick={close}
		onkeydown={(e) => e.key === 'Escape' && close()}
	>
		<div class="bg-kl-base-100/80 absolute inset-0"></div>
		<aside
			class="bg-kl-base-200 shadow-kl-lg absolute top-0 left-0 flex h-full w-64 flex-col p-4"
			onclick={(e) => e.stopPropagation()}
		>
			<div class="mb-4 flex items-center justify-between">
				<h2 class="text-kl-muted-content text-xs font-semibold tracking-wider uppercase">
					Components
				</h2>
				<button
					onclick={close}
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex items-center justify-center p-1"
				>
					<X size={18} />
				</button>
			</div>
			<nav class="flex flex-col gap-0.5">
				{#each componentNav as item}
					<a
						href={item.href}
						onclick={close}
						class="rounded-kl-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname ===
						item.href
							? 'bg-kl-primary text-kl-primary-content'
							: 'text-kl-base-content hover:bg-kl-muted'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>
			<h2
				class="text-kl-muted-content mt-6 mb-2 px-2 text-xs font-semibold tracking-wider uppercase"
			>
				Blocks
			</h2>
			<nav class="flex flex-col gap-0.5">
				{#each blockNav as item}
					<a
						href={item.href}
						onclick={close}
						class="rounded-kl-field px-3 py-1.5 text-sm transition-colors {$page.url.pathname ===
						item.href
							? 'bg-kl-primary text-kl-primary-content'
							: 'text-kl-base-content hover:bg-kl-muted'}"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</aside>
	</div>
{/if}
