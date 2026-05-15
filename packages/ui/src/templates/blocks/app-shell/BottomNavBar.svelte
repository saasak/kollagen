<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getAppShellContext } from './context.svelte';
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
	}

	let { label = 'Bottom navigation', brand, groups = [], action, userMenu }: Props = $props();

	const shell = getAppShellContext();
	const unregister = shell.register({
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

	onDestroy(unregister);
</script>
