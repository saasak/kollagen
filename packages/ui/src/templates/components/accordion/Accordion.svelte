<script lang="ts" generics="T extends { value: string; label: string; disabled?: boolean }">
	import { cn } from '$lib/utils/cn';
	import { Accordion } from 'bits-ui';
	import { ChevronDown } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Array of accordion items with value, label, and optional disabled */
		items: T[];
		/** Controlled expanded item value(s). Supports bind:value */
		value?: string[];
		/** Allow multiple items open at once */
		multiple?: boolean;
		/** Disable all accordion items */
		disabled?: boolean;
		/** Orientation of the accordion */
		orientation?: 'horizontal' | 'vertical';
		/** Callback when expanded items change */
		onValueChange?: (value: string[]) => void;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Content snippet — receives the current item */
		children: Snippet<[T]>;
	}

	let {
		items,
		value = $bindable(),
		multiple = false,
		disabled = false,
		orientation = 'vertical',
		onValueChange,
		class: className,
		children
	}: Props = $props();
</script>

{#snippet accordionItems()}
	{#each items as item (item.value)}
		<Accordion.Item value={item.value} disabled={item.disabled}>
			<Accordion.Header>
				<Accordion.Trigger
					class="text-kl-base-content hover:bg-kl-base-200 flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-4 py-3 text-sm font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
				>
					<span>{item.label}</span>
					<ChevronDown
						size={16}
						class="text-kl-muted-content transition-transform duration-150 group-data-[state=open]:rotate-180"
					/>
				</Accordion.Trigger>
			</Accordion.Header>
			<Accordion.Content class="overflow-hidden">
				<div class="text-kl-base-content px-4 py-3 text-sm">
					{@render children(item)}
				</div>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
{/snippet}

{#if multiple}
	<Accordion.Root
		type="multiple"
		{disabled}
		bind:value
		{orientation}
		{onValueChange}
		loop={false}
		class={cn(
			`divide-kl-base-300 rounded-kl-box border-kl-base-300 bg-kl-base-100 w-full divide-y overflow-hidden border`,
			className as string | undefined
		)}
	>
		{@render accordionItems()}
	</Accordion.Root>
{:else}
	<Accordion.Root
		type="single"
		{disabled}
		value={value?.[0] ?? ''}
		{orientation}
		onValueChange={(nextValue) => {
			value = nextValue ? [nextValue] : [];
			onValueChange?.(value);
		}}
		loop={false}
		class={cn(
			`divide-kl-base-300 rounded-kl-box border-kl-base-300 bg-kl-base-100 w-full divide-y overflow-hidden border`,
			className as string | undefined
		)}
	>
		{@render accordionItems()}
	</Accordion.Root>
{/if}
