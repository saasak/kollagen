<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Menu, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';

	interface Props {
		/** Accessible label for the mobile menu button */
		menuLabel?: string;
		/** CSS width for the desktop sidebar */
		sidebarWidth?: string;
		/** Container width, in pixels, where the sidebar becomes inline */
		sidebarBreakpoint?: number;
		/** Optional sidebar content. Receives the close function for mobile navigation. */
		sidebar?: Snippet<[() => void]>;
		/** Top bar content. Receives the sidebar toggle, availability, and inline state. */
		topbar?: Snippet<[() => void, boolean, boolean]>;
		/** Main content */
		children: Snippet;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		menuLabel = 'Toggle navigation',
		sidebarWidth = '16rem',
		sidebarBreakpoint = 1024,
		sidebar,
		topbar,
		children,
		class: className
	}: Props = $props();

	let mobileOpen = $state(false);
	let shellWidth = $state(0);
	let hasSidebar = $derived(!!sidebar);
	let isSidebarInline = $derived(hasSidebar && shellWidth >= sidebarBreakpoint);

	function openSidebar() {
		if (!hasSidebar || isSidebarInline) return;
		mobileOpen = true;
	}

	function closeSidebar() {
		mobileOpen = false;
	}

	function toggleSidebar() {
		if (!hasSidebar || isSidebarInline) return;
		mobileOpen = !mobileOpen;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeSidebar();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<div
	bind:clientWidth={shellWidth}
	class={cn(
		`bg-kl-base-200 text-kl-base-content flex min-h-screen w-full overflow-hidden`,
		className
	)}
	style:--kl-app-shell-sidebar-width={sidebarWidth}
>
	{#if sidebar && isSidebarInline}
		<div class="min-h-0 w-[var(--kl-app-shell-sidebar-width)] shrink-0 self-stretch [&>*]:h-full">
			{@render sidebar(closeSidebar)}
		</div>
	{/if}

	<div class="flex min-w-0 flex-1 flex-col">
		<header
			class="border-kl-base-300 bg-kl-base-100 sticky top-0 z-[var(--kl-z-sticky)] flex h-14 shrink-0 items-center border-b px-3 lg:px-5"
		>
			{#if topbar}
				{@render topbar(toggleSidebar, hasSidebar, isSidebarInline)}
			{:else if hasSidebar && !isSidebarInline}
				<button
					type="button"
					aria-label={menuLabel}
					onclick={openSidebar}
					class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex size-9 items-center justify-center transition-colors"
				>
					<Menu size={18} aria-hidden="true" />
				</button>
			{/if}
		</header>

		<main class="min-h-0 flex-1 overflow-y-auto p-4 lg:p-6">
			{@render children()}
		</main>
	</div>

	{#if sidebar && !isSidebarInline && mobileOpen}
		<div
			class="bg-kl-base-100 fixed inset-0 z-[var(--kl-z-modal)]"
			transition:fly={{ x: '-100%', duration: 180 }}
		>
			<div class="h-full w-full [&>*]:!h-full [&>*]:!w-full [&>*]:!max-w-none">
				{@render sidebar(closeSidebar)}
				<button
					type="button"
					aria-label="Close navigation"
					onclick={closeSidebar}
					class="rounded-kl-selector bg-kl-base-100 text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content border-kl-base-300 absolute top-3 right-3 flex size-8 items-center justify-center border transition-colors"
				>
					<X size={16} aria-hidden="true" />
				</button>
			</div>
		</div>
	{/if}
</div>
