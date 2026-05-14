<script lang="ts" generics="T">
	import { cn } from '$lib/utils/cn';
	import { checkboxGroupVariants } from './CheckboxGroup.variants';
	import { Checkbox } from 'bits-ui';
	import { Check } from 'lucide-svelte';

	interface Props {
		items: T[];
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		value?: string[];
		label?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		orientation?: 'horizontal' | 'vertical';
		onValueChange?: (value: string[]) => void;
		class?: string;
	}

	let {
		items,
		itemToLabel = (item: T) => (item as any).label ?? String(item),
		itemToValue = (item: T) => (item as any).value ?? String(item),
		value = $bindable([]),
		label,
		name,
		disabled = false,
		required = false,
		readonly = false,
		orientation = 'vertical',
		onValueChange,
		class: className
	}: Props = $props();

	const mappedItems = $derived(
		items.map((item) => ({
			value: itemToValue(item),
			label: itemToLabel(item),
			disabled: (item as any).disabled ?? false
		}))
	);

	let classes = $derived(checkboxGroupVariants({ orientation, disabled }));
</script>

<div class={cn('space-y-2', className)}>
	<Checkbox.Group bind:value {name} {disabled} {required} {readonly} {onValueChange}>
		{#if label}
			<Checkbox.GroupLabel class={classes.label()}>{label}</Checkbox.GroupLabel>
		{/if}

		<div class={classes.root()}>
			{#each mappedItems as item (item.value)}
				<label class={classes.item({ disabled: disabled || item.disabled })}>
					<Checkbox.Root value={item.value} disabled={item.disabled} class={classes.control()}>
						{#snippet children({ checked })}
							<span class="relative block size-3.5 shrink-0">
								<Check
									size={14}
									strokeWidth={3}
									aria-hidden="true"
									class={classes.icon({ visible: checked })}
								/>
							</span>
						{/snippet}
					</Checkbox.Root>
					<span class={classes.itemLabel({ disabled: disabled || item.disabled })}
						>{item.label}</span
					>
				</label>
			{/each}
		</div>
	</Checkbox.Group>
</div>
