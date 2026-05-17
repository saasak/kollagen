<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Search, X } from 'lucide-svelte';
	import { onDestroy } from 'svelte';

	interface Props {
		value?: string;
		placeholder?: string;
		debounceMs?: number;
		id?: string;
		name?: string;
		disabled?: boolean;
		ariaLabel?: string;
		onUpdate?: (value: string) => void;
		class?: string;
	}

	let {
		value = $bindable(''),
		placeholder = 'Search...',
		debounceMs = 300,
		id,
		name,
		disabled = false,
		ariaLabel,
		onUpdate,
		class: className
	}: Props = $props();

	const uid = $props.id();
	let updateTimer: ReturnType<typeof setTimeout> | undefined;
	let inputId = $derived(id ?? `${uid}-search`);
	let label = $derived(ariaLabel ?? placeholder);

	onDestroy(() => {
		if (updateTimer) clearTimeout(updateTimer);
	});

	function emitUpdate(nextValue: string) {
		onUpdate?.(nextValue);
	}

	function updateInput(nextValue: string) {
		value = nextValue;
		if (updateTimer) clearTimeout(updateTimer);
		updateTimer = setTimeout(() => {
			emitUpdate(nextValue);
		}, debounceMs);
	}

	function clearInput() {
		if (updateTimer) clearTimeout(updateTimer);
		value = '';
		emitUpdate('');
	}
</script>

<div class={cn('relative w-full max-w-md', className)}>
	<label for={inputId} class="sr-only">{label}</label>
	<Search
		size={16}
		class="text-kl-muted-content pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
	/>
	<input
		id={inputId}
		{name}
		type="search"
		{value}
		{placeholder}
		{disabled}
		aria-label={label}
		oninput={(event) => updateInput(event.currentTarget.value)}
		class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md w-full border pr-10 pl-9 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline disabled:cursor-not-allowed disabled:opacity-50"
	/>
	{#if value}
		<button
			type="button"
			{disabled}
			onclick={clearInput}
			aria-label="Clear search"
			class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content absolute top-1/2 right-2 flex -translate-y-1/2 cursor-pointer items-center justify-center p-1 transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
		>
			<X size={16} />
		</button>
	{/if}
</div>
