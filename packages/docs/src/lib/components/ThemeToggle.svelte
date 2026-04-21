<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { browser } from '$app/environment';

	let dark = $state(browser && document.documentElement.dataset.mode === 'dark');

	function toggle() {
		dark = !dark;
		document.documentElement.dataset.mode = dark ? 'dark' : '';
		localStorage.setItem('kl-mode', dark ? 'dark' : '');
	}
</script>

<button
	onclick={toggle}
	class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-2 transition-colors"
	aria-label="Toggle theme"
>
	{#if dark}
		<Sun size={18} />
	{:else}
		<Moon size={18} />
	{/if}
</button>
