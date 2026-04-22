<script lang="ts">
	import { RadioGroup } from 'bits-ui';

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
		orientation?: 'horizontal' | 'vertical';
		loop?: boolean;
		onValueChange?: (value: string) => void;
		class?: string;
	}

	let {
		items,
		value = $bindable(),
		label,
		name,
		disabled = false,
		required = false,
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
						class="border-kl-base-300 bg-kl-base-100 flex h-5 w-5 items-center justify-center rounded-full border transition-colors duration-150 {checked
							? 'border-kl-primary'
							: ''}"
					>
						<span
							class="bg-kl-primary h-2.5 w-2.5 rounded-full transition-opacity duration-150 {checked
								? 'opacity-100'
								: 'opacity-0'}"
						></span>
					</span>
					<span class="text-kl-base-content text-sm">{item.label}</span>
				{/snippet}
			</RadioGroup.Item>
		{/each}
	</RadioGroup.Root>
</div>
