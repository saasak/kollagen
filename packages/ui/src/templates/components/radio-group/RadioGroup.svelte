<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const radioItemClass =
		'bg-kl-base-100 hover:[--kl-radio-border:var(--kl-muted-content)] data-[state=checked]:[--kl-radio-border:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))] size-kl-selector-md shrink-0 cursor-default rounded-full border-[calc(var(--kl-size-selector)*0.5)] transition-[color,background-color,border-color,box-shadow] duration-100 ease-in-out [--kl-radio-border:var(--kl-base-300)] [border-color:var(--kl-radio-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-radio-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:border-[calc(var(--kl-size-selector)*1.25)]';
</script>

<div
	class={cn(
		`flex ${orientation === 'horizontal' ? 'flex-row gap-4' : 'flex-col gap-2'}`,
		className
	)}
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
		{#each items as item (item.value)}
			{@const id = useId()}
			<div class="flex items-center gap-2">
				<RadioGroup.Item {id} value={item.value} disabled={item.disabled} class={radioItemClass} />
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
