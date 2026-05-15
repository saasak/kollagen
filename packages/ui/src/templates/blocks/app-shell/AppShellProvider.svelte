<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AppShellState, setAppShellContext } from './context.svelte';
	import type { MobileBarPosition } from './types';

	interface Props {
		/** Current URL pathname used to resolve active navigation entries */
		currentPath?: string;
		/** Which bar remains visible on mobile when both top and bottom exist */
		mobileBar?: MobileBarPosition;
		/** Container width, in pixels, where sidebars become inline */
		sidebarBreakpoint?: number;
		children: Snippet;
	}

	let { currentPath = '', mobileBar = 'top', sidebarBreakpoint = 1024, children }: Props = $props();

	const shell = new AppShellState();

	function syncShell() {
		shell.currentPath = currentPath;
		shell.mobileBar = mobileBar;
		shell.sidebarBreakpoint = sidebarBreakpoint;
	}

	syncShell();
	$effect(syncShell);

	setAppShellContext(shell);
</script>

{@render children()}
