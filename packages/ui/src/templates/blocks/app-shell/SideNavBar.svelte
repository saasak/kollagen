<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getAppShellContext } from './context.svelte';
	import type { NavBrand, NavGroup, NavUserMenu } from './types';

	interface Props {
		/** Sidebar side */
		side?: 'left' | 'right';
		/** Accessible label used for desktop and mobile navigation */
		label?: string;
		/** Brand rendered in the sidebar header */
		brand?: NavBrand;
		/** Sidebar navigation groups */
		groups?: NavGroup[];
		/** Optional footer user menu */
		userMenu?: NavUserMenu;
		/** Whether the sidebar can collapse on desktop */
		collapsible?: boolean;
		/** Current collapsed state */
		collapsed?: boolean;
		/** Called when collapsed changes */
		onCollapsedChange?: (collapsed: boolean) => void;
	}

	let {
		side = 'left',
		label = 'Sidebar navigation',
		brand,
		groups = [],
		userMenu,
		collapsible = true,
		collapsed = $bindable(false),
		onCollapsedChange
	}: Props = $props();

	const shell = getAppShellContext();
	const unregister = shell.register({
		get position() {
			return side;
		},
		get label() {
			return label;
		},
		get brand() {
			return brand;
		},
		get groups() {
			return groups;
		},
		get userMenu() {
			return userMenu;
		},
		get collapsible() {
			return collapsible;
		},
		get collapsed() {
			return collapsed;
		},
		setCollapsed(next) {
			collapsed = next;
			onCollapsedChange?.(next);
		}
	});

	onDestroy(unregister);
</script>
