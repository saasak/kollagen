<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';
	import SidebarNavigation from './SidebarNavigation.svelte';
	import type { NavGroup, NavMatch } from './types';

	interface Props {
		/** Navigation groups */
		groups?: NavGroup[];
		/** Current URL pathname used to resolve the active entry */
		currentPath?: string;
		/** Default matching strategy for active entries */
		match?: NavMatch;
		/** Header content */
		header?: Snippet;
		/** Footer content */
		footer?: Snippet;
		/** Hide labels and render top-level icons only */
		collapsed?: boolean;
		/** Called when a navigation link is clicked */
		onNavigate?: () => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		groups = [],
		currentPath = '',
		match = 'exact',
		header,
		footer,
		collapsed = false,
		onNavigate,
		class: className
	}: Props = $props();

	const navPaddingX = 'clamp(0.5rem, calc(0.75rem * var(--kl-density, 1)), 1rem)';
	const navPaddingY = 'clamp(0.5rem, calc(1rem * var(--kl-density, 1)), 1.25rem)';
</script>

<aside
	class={cn(
		'border-kl-base-300 bg-kl-base-100 text-kl-base-content flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r',
		collapsed ? 'w-16' : 'w-64',
		className
	)}
	style:--kl-nav-px={navPaddingX}
	style:--kl-nav-py={navPaddingY}
>
	{#if header && !collapsed}
		<div class="border-kl-base-300 shrink-0 border-b px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]">
			{@render header()}
		</div>
	{/if}

	<SidebarNavigation
		{groups}
		{currentPath}
		{match}
		{collapsed}
		{onNavigate}
		label="Sidebar navigation"
	/>

	{#if footer && !collapsed}
		<div class="border-kl-base-300 shrink-0 border-t px-[var(--kl-nav-px)] py-[var(--kl-nav-py)]">
			{@render footer()}
		</div>
	{/if}
</aside>
