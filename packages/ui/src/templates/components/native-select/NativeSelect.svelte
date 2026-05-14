<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import { ChevronDown } from 'lucide-svelte';

	interface Props {
		items: T[];
		value?: string;
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		placeholder?: string;
		id?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		onValueChange?: (value: string) => void;
		class?: string;
	}

	let {
		items,
		value = $bindable(''),
		itemToLabel = (item: T) => (item as any).label ?? String(item),
		itemToValue = (item: T) => (item as any).value ?? String(item),
		placeholder,
		id,
		name,
		disabled = false,
		required = false,
		onValueChange,
		class: className
	}: Props = $props();

	function handleChange(event: Event) {
		value = (event.currentTarget as HTMLSelectElement).value;
		onValueChange?.(value);
	}
</script>

<div class={cn('relative w-full', className)}>
	<select
		bind:value
		{id}
		{name}
		{disabled}
		{required}
		onchange={handleChange}
		class="rounded-kl-field bg-kl-base-100 text-kl-base-content h-kl-field-md w-full appearance-none border [border-color:var(--kl-input-border)] px-3 pr-9 text-sm [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 outline-none [--kl-input-border:var(--kl-base-300)] focus:outline focus:outline-[var(--kl-input-border)] focus:[--kl-input-border:var(--kl-primary)] disabled:cursor-not-allowed disabled:opacity-50"
	>
		{#if placeholder}
			<option value="" disabled={required}>{placeholder}</option>
		{/if}
		{#each items as item (itemToValue(item))}
			<option value={itemToValue(item)} disabled={(item as any).disabled}>
				{itemToLabel(item)}
			</option>
		{/each}
	</select>
	<ChevronDown
		size={16}
		class="text-kl-muted-content pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
	/>
</div>
