<script lang="ts">
	import { PinInput, REGEXP_ONLY_DIGITS, REGEXP_ONLY_CHARS } from 'bits-ui';

	interface Props {
		/** Label text displayed above the input */
		label?: string;
		/** Number of input fields */
		count?: number;
		/** Controlled value as a string. Supports bind:value */
		value?: string;
		/** Form field name for native submission */
		name?: string;
		/** Placeholder character for each input */
		placeholder?: string;
		/** Allowed input type */
		type?: 'alphanumeric' | 'numeric' | 'alphabetic';
		/** Mask input like a password field */
		mask?: boolean;
		/** Disable all inputs */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Text alignment within cells */
		textalign?: 'left' | 'center' | 'right';
		/** Callback when value changes */
		onValueChange?: (value: string) => void;
		/** Callback when all inputs are filled */
		onComplete?: (value: string) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		count = 4,
		value = $bindable(''),
		name,
		placeholder = '○',
		type = 'numeric',
		mask = false,
		disabled = false,
		invalid = false,
		textalign = 'center',
		onValueChange,
		onComplete,
		class: className
	}: Props = $props();

	const pattern = $derived(
		type === 'numeric' ? REGEXP_ONLY_DIGITS : type === 'alphabetic' ? REGEXP_ONLY_CHARS : undefined
	);
</script>

<div class="flex flex-col gap-1.5 {className ?? ''}">
	{#if label}
		<span
			class="text-kl-base-content text-sm font-medium{disabled ? ' text-kl-muted-content' : ''}"
		>
			{label}
		</span>
	{/if}

	<PinInput.Root
		bind:value
		maxlength={count}
		{name}
		{disabled}
		{textalign}
		{pattern}
		{onValueChange}
		{onComplete}
	>
		{#snippet children({ cells })}
			<div class="flex gap-2">
				{#each cells as cell, i (i)}
					<PinInput.Cell
						{cell}
						class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content data-[active]:border-kl-primary data-[active]:outline-kl-primary h-11 w-11 border text-center text-base font-medium transition-colors duration-150 outline-none data-[active]:outline-2 data-[active]:-outline-offset-1{disabled
							? ' cursor-not-allowed opacity-50'
							: ''}{invalid
							? ' border-kl-error data-[active]:border-kl-error data-[active]:outline-kl-error'
							: ''} flex items-center justify-center"
					>
						{#if cell.char}
							{#if mask}
								<span class="text-kl-base-content">•</span>
							{:else}
								<span class="text-kl-base-content">{cell.char}</span>
							{/if}
						{:else if !cell.isActive}
							<span class="text-kl-muted-content">{placeholder}</span>
						{:else if cell.hasFakeCaret}
							<span class="text-kl-base-content animate-pulse">|</span>
						{/if}
					</PinInput.Cell>
				{/each}
			</div>
		{/snippet}
	</PinInput.Root>
</div>
