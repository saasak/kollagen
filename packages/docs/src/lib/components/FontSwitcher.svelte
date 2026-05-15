<script lang="ts">
	import { Type } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { fontPresets } from '$lib/font-presets';
	import { fontState } from '$lib/font-state.svelte';

	function select(event: Event) {
		fontState.select((event.target as HTMLSelectElement).value);
	}

	onMount(() => fontState.hydrate());
</script>

<div class="flex items-center gap-1.5">
	<Type size={16} class="text-kl-muted-content" />
	<select
		value={fontState.current}
		onchange={select}
		aria-label="Select font"
		class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:border-kl-base-content/30 max-w-40 cursor-pointer border px-2 py-1 text-sm transition-colors focus:outline-none"
	>
		{#each fontPresets as preset (preset.id)}
			<option value={preset.id}>{preset.label}</option>
		{/each}
	</select>
</div>
