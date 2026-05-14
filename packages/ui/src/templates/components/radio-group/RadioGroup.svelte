<script lang="ts" generics="T">
	import { cn } from '$lib/utils/cn';
	import { radioGroupVariants } from './RadioGroup.variants';
	import { RadioGroup, Label, useId } from 'bits-ui';

	interface Props {
		items: T[];
		itemToLabel?: (item: T) => string;
		itemToValue?: (item: T) => string;
		value?: string;
		label?: string;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		orientation?: 'horizontal' | 'vertical';
		loop?: boolean;
		onValueChange?: (value: string) => void;
		class?: string;
	}

	let {
		items,
		itemToLabel = (item: T) => (item as any).label ?? String(item),
		itemToValue = (item: T) => (item as any).value ?? String(item),
		value = $bindable(''),
		label,
		name,
		disabled = false,
		required = false,
		readonly = false,
		orientation = 'vertical',
		loop = true,
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

	let classes = $derived(radioGroupVariants({ orientation }));
</script>

<div class={cn(classes.root(), className)}>
	{#if label}
		<span class="text-kl-base-content text-sm font-medium {disabled ? 'text-kl-muted-content' : ''}"
			>{label}</span
		>
	{/if}

	<RadioGroup.Root
		bind:value
		{name}
		{disabled}
		{required}
		{readonly}
		{orientation}
		{loop}
		{onValueChange}
		class={classes.root()}
	>
		{#each mappedItems as item (item.value)}
			{@const id = useId()}
			<div class="flex items-center gap-2">
				<RadioGroup.Item {id} value={item.value} disabled={item.disabled} class={classes.item()} />
				<Label.Root
					for={id}
					class="text-kl-base-content text-sm {item.disabled || disabled
						? 'text-kl-muted-content'
						: ''}"
				>
					{item.label}
				</Label.Root>
			</div>
		{/each}
	</RadioGroup.Root>
</div>
