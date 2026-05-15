<script lang="ts">
	import { onDestroy } from 'svelte';
	import { tryGetAppShellContext } from './context.svelte';
	import HorizontalNavBar from './HorizontalNavBar.svelte';
	import type { NavAction, NavBrand, NavGroup, NavUserMenu } from './types';

	interface Props {
		/** Accessible label used in mobile navigation sections */
		label?: string;
		/** Brand rendered at the left edge */
		brand?: NavBrand;
		/** Navigation groups rendered in the center */
		groups?: NavGroup[];
		/** Optional right-side action */
		action?: NavAction;
		/** Optional right-side user menu */
		userMenu?: NavUserMenu;
		/** Current URL pathname used in standalone mode */
		currentPath?: string;
		/** Accessible label for the standalone mobile menu button */
		menuLabel?: string;
		/** Additional CSS classes in standalone mode */
		class?: string;
	}

	let {
		label = 'Bottom navigation',
		brand,
		groups = [],
		action,
		userMenu,
		currentPath = '',
		menuLabel = 'Open navigation',
		class: className
	}: Props = $props();

	const shell = tryGetAppShellContext();
	const unregister = shell?.register({
		position: 'bottom',
		get label() {
			return label;
		},
		get brand() {
			return brand;
		},
		get groups() {
			return groups;
		},
		get action() {
			return action;
		},
		get userMenu() {
			return userMenu;
		}
	});

	onDestroy(() => unregister?.());
</script>

{#if !shell}
	<HorizontalNavBar
		position="bottom"
		{label}
		{brand}
		{groups}
		{action}
		{userMenu}
		{currentPath}
		{menuLabel}
		class={className}
	/>
{/if}
