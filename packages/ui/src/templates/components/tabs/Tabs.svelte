<script lang="ts">
	import { Tabs } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface TabItem {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		items: TabItem[];
		value?: string;
		orientation?: 'horizontal' | 'vertical';
		activationMode?: 'manual' | 'automatic';
		loop?: boolean;
		disabled?: boolean;
		onValueChange?: (value: string) => void;
		content?: Snippet<[string]>;
		name?: string;
		class?: string;
	}

	let {
		items,
		value = $bindable(),
		orientation = 'horizontal',
		activationMode = 'automatic',
		loop = true,
		disabled = false,
		onValueChange,
		content,
		name,
		class: className
	}: Props = $props();
</script>

<Tabs.Root
	bind:value
	{orientation}
	{activationMode}
	{loop}
	{disabled}
	{onValueChange}
	class="w-full {className ?? ''}"
>
	<Tabs.List
		class="border-kl-base-300 flex border-b {orientation === 'vertical'
			? 'flex-col border-r border-b-0'
			: ''}"
	>
		{#each items as tab (tab.value)}
			<Tabs.Trigger
				value={tab.value}
				disabled={disabled || tab.disabled}
				class="text-kl-muted-content hover:text-kl-base-content data-[state=active]:text-kl-primary data-[state=active]:after:bg-kl-primary relative cursor-pointer px-4 py-2 text-sm font-medium transition-colors duration-150 after:absolute after:transition-all after:duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 {orientation ===
				'vertical'
					? 'after:top-0 after:right-0 after:h-full after:w-0.5 after:opacity-0 data-[state=active]:after:opacity-100'
					: 'after:bottom-0 after:left-0 after:h-0.5 after:w-full after:opacity-0 data-[state=active]:after:opacity-100'}"
			>
				{tab.label}
			</Tabs.Trigger>
		{/each}
	</Tabs.List>

	{#each items as tab (tab.value)}
		<Tabs.Content value={tab.value} class="pt-4">
			{#if content}
				{@render content(tab.value)}
			{/if}
		</Tabs.Content>
	{/each}

	{#if name}
		<input type="hidden" {name} value={value ?? ''} />
	{/if}
</Tabs.Root>
