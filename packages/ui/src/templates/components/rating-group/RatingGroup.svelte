<script lang="ts">
	import { RatingGroup } from 'bits-ui';
	import { Star } from 'lucide-svelte';

	interface Props {
		/** Controlled value. Supports bind:value */
		value?: number;
		/** Total number of stars @default 5 */
		count?: number;
		/** Display label */
		label?: string;
		/** Form field name for native submission */
		name?: string;
		/** Disable interaction */
		disabled?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Allow half-star ratings */
		allowHalf?: boolean;
		/** Callback when value changes */
		onValueChange?: (value: number) => void;
		/** Accessible label when the visible label prop is omitted */
		ariaLabel?: string;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		value = $bindable(0),
		count = 5,
		label,
		ariaLabel,
		name,
		disabled = false,
		readOnly = false,
		required = false,
		allowHalf = false,
		onValueChange,
		class: className
	}: Props = $props();
</script>

<RatingGroup.Root
	bind:value
	max={count}
	{name}
	{disabled}
	readonly={readOnly}
	{required}
	{allowHalf}
	{onValueChange}
	aria-label={ariaLabel}
	class="inline-flex flex-col gap-1.5{className ? ` ${className}` : ''}"
>
	{#snippet children({ items })}
		{#if label}
			<span
				class="text-kl-base-content text-sm font-medium{disabled ? ' text-kl-muted-content' : ''}"
			>
				{label}
			</span>
		{/if}
		<div class="flex items-center gap-0.5">
			{#each items as item (item.index)}
				<RatingGroup.Item
					index={item.index}
					class="rounded-kl-selector text-kl-base-300 focus-visible:outline-kl-primary cursor-pointer p-0.5 transition-colors duration-150 outline-none focus-visible:outline-2 focus-visible:outline-offset-1 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[readonly]:cursor-default data-[readonly]:opacity-75"
				>
					<span class="relative inline-block leading-none">
						{#if item.state === 'active'}
							<Star size={20} class="fill-kl-primary text-kl-primary" />
						{:else if item.state === 'partial'}
							<Star size={20} />
							<span class="pointer-events-none absolute inset-0 overflow-hidden" style="width: 50%">
								<Star size={20} class="fill-kl-primary text-kl-primary" />
							</span>
						{:else}
							<Star size={20} />
						{/if}
					</span>
				</RatingGroup.Item>
			{/each}
		</div>
	{/snippet}
</RatingGroup.Root>
