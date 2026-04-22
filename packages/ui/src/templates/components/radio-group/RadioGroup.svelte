<script lang="ts">
	import { RadioGroup, Label, useId } from 'bits-ui';

	export interface Item {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		items: Item[];
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
</script>

<div
	class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'} {className ??
		''}"
>
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
		class="flex {orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'}"
	>
		{#each items as item}
			{@const id = useId()}
			<div class="flex items-center gap-2">
				<RadioGroup.Item
					{id}
					value={item.value}
					disabled={item.disabled}
					class="border-kl-base-300 bg-kl-base-100 hover:border-kl-muted-content data-[state=checked]:border-kl-primary data-[state=checked]:border-[5px] h-5 w-5 shrink-0 cursor-default rounded-full border-2 transition-all duration-100 ease-in-out data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
				/>
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
