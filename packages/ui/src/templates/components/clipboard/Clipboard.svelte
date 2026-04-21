<script lang="ts">
	import { ClipboardCopy, Check } from 'lucide-svelte';

	interface Props {
		value?: string;
		defaultValue?: string;
		timeout?: number;
		label?: string;
		disabled?: boolean;

		// Events
		onValueChange?: (details: { value: string }) => void;
		onStatusChange?: (details: { copied: boolean }) => void;

		class?: string;
	}

	let {
		value = $bindable(),
		defaultValue,
		timeout = 3000,
		label,
		disabled = false,
		onValueChange,
		onStatusChange,
		class: className
	}: Props = $props();

	if (value === undefined && defaultValue !== undefined) value = defaultValue;

	let copied = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | undefined;

	async function handleCopy() {
		if (disabled || !value) return;
		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			onStatusChange?.({ copied: true });

			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				copied = false;
				onStatusChange?.({ copied: false });
			}, timeout);
		} catch {
			// Clipboard API failed silently
		}
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;
		onValueChange?.({ value: target.value });
	}
</script>

<div class="w-full {className ?? ''}">
	{#if label}
		<span class="text-kl-base-content mb-1.5 block text-sm font-medium">
			{label}
		</span>
	{/if}

	<div
		class="border-kl-base-300 rounded-kl-field bg-kl-base-100 focus-within:border-kl-primary focus-within:outline-kl-primary flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1"
	>
		<input
			type="text"
			value={value ?? ''}
			oninput={handleInput}
			{disabled}
			readonly
			class="text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<button
			type="button"
			{disabled}
			onclick={handleCopy}
			aria-label={copied ? 'Copied' : 'Copy to clipboard'}
			class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center gap-1.5 border-none bg-transparent px-3 py-2 text-sm transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
		>
			{#if copied}
				<Check size={16} class="text-kl-primary" />
			{:else}
				<ClipboardCopy size={16} />
			{/if}
		</button>
	</div>
</div>
