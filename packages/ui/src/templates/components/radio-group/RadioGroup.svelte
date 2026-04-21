<script lang="ts">
	import { RadioGroup, Label } from 'bits-ui';

	export interface Item {
		/** Value submitted with the form */
		value: string;
		/** Display label */
		label: string;
		/** Disable this option */
		disabled?: boolean;
	}

	interface Props {
		/** Radio options to render */
		items: Item[];
		/** Controlled selected value. Supports bind:value */
		value?: string;
		/** Display label for the group */
		label?: string;
		/** Form field name for native submission */
		name?: string;
		/** Disable all options */
		disabled?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Orientation of the group */
		orientation?: 'horizontal' | 'vertical';
		/** Loop keyboard navigation through items */
		loop?: boolean;
		/** Callback when value changes */
		onValueChange?: (value: string) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		items,
		value = $bindable(),
		label,
		name,
		disabled = false,
		required = false,
		readOnly = false,
		orientation = 'vertical',
		loop = true,
		onValueChange,
		class: className
	}: Props = $props();
</script>

<div
	class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'}{className
		? ` ${className}`
		: ''}"
>
	{#if label}
		<Label.Root
			class="text-kl-base-content text-sm font-medium{disabled ? ' text-kl-muted-content' : ''}"
		>
			{label}
		</Label.Root>
	{/if}

	<RadioGroup.Root
		bind:value
		{name}
		{disabled}
		{required}
		readonly={readOnly}
		{orientation}
		{loop}
		{onValueChange}
		class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'}"
	>
		{#each items as item (item.value)}
			<RadioGroup.Item
				value={item.value}
				disabled={item.disabled}
				class="flex cursor-pointer items-center gap-2 select-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
			>
				{#snippet children({ checked })}
					<span
						class="border-kl-base-300 bg-kl-base-100 flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-150{checked
							? ' border-kl-primary'
							: ''}"
						class:border-kl-primary={checked}
					>
						<span
							class="bg-kl-primary h-2.5 w-2.5 rounded-full transition-opacity duration-150{checked
								? ' opacity-100'
								: ' opacity-0'}"
						></span>
					</span>
					<span
						class="text-kl-base-content text-sm{item.disabled || disabled
							? ' text-kl-muted-content'
							: ''}"
					>
						{item.label}
					</span>
				{/snippet}
			</RadioGroup.Item>
		{/each}
	</RadioGroup.Root>
</div>
