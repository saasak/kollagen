<script lang="ts">
	import type { Snippet } from 'svelte';
	import { AppShellState, setAppShellContext } from './context.svelte';
	import type { MobileBarPosition } from './types';

	interface Props {
		/** Current URL pathname used to resolve active navigation entries */
		currentPath?: string;
		/** Which bar remains visible on mobile when both top and bottom exist */
		mobileBar?: MobileBarPosition;
		children: Snippet;
	}

	let { currentPath = '', mobileBar = 'top', children }: Props = $props();

	const shell = new AppShellState();

	function syncShell() {
		shell.currentPath = currentPath;
		shell.mobileBar = mobileBar;
	}

	syncShell();
	$effect(syncShell);

	setAppShellContext(shell);
</script>

{@render children()}
