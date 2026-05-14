<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { tagsInputVariants } from './TagsInput.variants';
	import { X } from 'lucide-svelte';

	interface Props {
		value?: string[];
		placeholder?: string;
		name?: string;
		disabled?: boolean;
		max?: number;
		delimiter?: string | RegExp;
		addOnPaste?: boolean;
		blurBehavior?: 'clear' | 'add';
		validate?: (details: { inputValue: string; value: string[] }) => boolean;
		onValueChange?: (details: { value: string[] }) => void;
		class?: string;
	}

	let {
		value = $bindable<string[]>([]),
		placeholder = '',
		name,
		disabled = false,
		max,
		delimiter = ',',
		addOnPaste = false,
		blurBehavior,
		validate,
		onValueChange,
		class: className
	}: Props = $props();

	let inputValue = $state('');
	let highlightedIndex = $state(-1);
	let inputEl: HTMLInputElement | undefined = $state();

	function addTag(tag: string) {
		const trimmed = tag.trim();
		if (!trimmed) return;
		if (value.includes(trimmed)) return;
		if (max != null && value.length >= max) return;
		if (validate && !validate({ inputValue: trimmed, value })) return;
		value = [...value, trimmed];
		onValueChange?.({ value });
	}

	function removeTag(index: number) {
		value = value.filter((_, i) => i !== index);
		onValueChange?.({ value });
		highlightedIndex = -1;
	}

	function clearAll() {
		value = [];
		onValueChange?.({ value });
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			addTag(inputValue);
			inputValue = '';
		} else if (event.key === 'Backspace' && inputValue === '' && value.length > 0) {
			if (highlightedIndex >= 0) {
				removeTag(highlightedIndex);
			} else {
				highlightedIndex = value.length - 1;
			}
		} else if (event.key === 'Escape') {
			highlightedIndex = -1;
		} else {
			highlightedIndex = -1;
		}
	}

	function handleInput() {
		if (delimiter && inputValue.length > 0) {
			const regex = delimiter instanceof RegExp ? delimiter : new RegExp(delimiter);
			const parts = inputValue.split(regex);
			if (parts.length > 1) {
				for (const part of parts) addTag(part);
				inputValue = '';
			}
		}
	}

	function handlePaste(event: ClipboardEvent) {
		if (!addOnPaste) return;
		event.preventDefault();
		const text = event.clipboardData?.getData('text') ?? '';
		const regex = delimiter instanceof RegExp ? delimiter : new RegExp(delimiter);
		const parts = text.split(regex);
		for (const part of parts) addTag(part);
	}

	function handleBlur() {
		if (blurBehavior === 'add' && inputValue.trim()) {
			addTag(inputValue);
			inputValue = '';
		} else if (blurBehavior === 'clear') {
			inputValue = '';
		}
		highlightedIndex = -1;
	}

	let classes = $derived(tagsInputVariants({ disabled }));
</script>

<div class={cn(`w-full`, className)}>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div onclick={() => inputEl?.focus()} class={classes.fieldShell()}>
		{#each value as tag, index (tag + index)}
			<span class={tagsInputVariants({ highlighted: highlightedIndex === index }).tag()}>
				<span>{tag}</span>
				<button
					onclick={() => removeTag(index)}
					{disabled}
					class={classes.tagButton()}
					aria-label="Remove {tag}"
				>
					<X size={12} />
				</button>
			</span>
		{/each}

		<input
			bind:this={inputEl}
			bind:value={inputValue}
			{placeholder}
			{disabled}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onpaste={handlePaste}
			onblur={handleBlur}
			class={classes.input()}
		/>

		{#if value.length > 0}
			<button onclick={clearAll} {disabled} class={classes.clear()} aria-label="Clear all tags">
				<X size={14} />
			</button>
		{/if}
	</div>

	{#if name}
		{#each value as tag}
			<input type="hidden" {name} value={tag} />
		{/each}
	{/if}
</div>
