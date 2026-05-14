<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	function getDefaultValue() {
		return defaultValue;
	}

	const initialDefaultValue = getDefaultValue();
	if (value === undefined && initialDefaultValue !== undefined) value = initialDefaultValue;

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

	const fieldShellClass =
		'rounded-kl-field bg-kl-base-100 flex h-kl-field-md items-center border transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]';
</script>

<div class={cn(`w-full`, className)}>
	{#if label}
		<span class="text-kl-base-content mb-1.5 block text-sm font-medium">
			{label}
		</span>
	{/if}

	<div class={fieldShellClass}>
		<input
			type="text"
			value={value ?? ''}
			oninput={handleInput}
			{disabled}
			readonly
			class="text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50"
		/>
		<button
			type="button"
			{disabled}
			onclick={handleCopy}
			aria-label={copied ? 'Copied' : 'Copy to clipboard'}
			class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex h-full cursor-pointer items-center justify-center gap-1.5 border-none bg-transparent px-3 text-sm transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
		>
			{#if copied}
				<Check size={16} class="text-kl-primary" />
			{:else}
				<ClipboardCopy size={16} />
			{/if}
		</button>
	</div>
</div>
