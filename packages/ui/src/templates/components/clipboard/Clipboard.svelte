<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { clipboardVariants } from './Clipboard.variants';
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

	const classes = clipboardVariants();
</script>

<div class={cn(`w-full`, className)}>
	{#if label}
		<span class="text-kl-base-content mb-1.5 block text-sm font-medium">
			{label}
		</span>
	{/if}

	<div class={classes.fieldShell()}>
		<input
			type="text"
			value={value ?? ''}
			oninput={handleInput}
			{disabled}
			readonly
			class={classes.input()}
		/>
		<button
			type="button"
			{disabled}
			onclick={handleCopy}
			aria-label={copied ? 'Copied' : 'Copy to clipboard'}
			class={classes.button()}
		>
			{#if copied}
				<Check size={16} class="text-kl-primary" />
			{:else}
				<ClipboardCopy size={16} />
			{/if}
		</button>
	</div>
</div>
