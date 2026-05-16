<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		title,
		description,
		code,
		children
	}: {
		title: string;
		description?: string;
		code?: unknown;
		children: Snippet;
	} = $props();

	let showCode = $state(false);
	let codeText = $derived(formatCode(code));

	function formatCode(value: unknown) {
		if (typeof value === 'string') return value;
		if (value == null) return '';

		return JSON.stringify(value, null, 2) ?? String(value);
	}
</script>

<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border">
	<div class="border-kl-base-300 border-b px-4 py-3">
		<div class="flex items-center justify-between">
			<div>
				<h3 class="text-kl-base-content font-semibold">{title}</h3>
				{#if description}
					<p class="text-kl-muted-content mt-1 text-sm">{description}</p>
				{/if}
			</div>
			{#if codeText}
				<button
					onclick={() => (showCode = !showCode)}
					class="rounded-kl-field text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content px-3 py-1.5 text-xs font-medium transition-colors"
				>
					{showCode ? 'Hide code' : 'Show code'}
				</button>
			{/if}
		</div>
	</div>

	<div class="p-4">
		{@render children()}
	</div>

	{#if codeText && showCode}
		<div class="border-kl-base-300 border-t">
			<pre class="bg-kl-base-200 overflow-x-auto p-4 font-mono text-sm">{codeText}</pre>
		</div>
	{/if}
</div>
