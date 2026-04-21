<script lang="ts">
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import type { Snippet } from 'svelte';
	import { GripVertical, GripHorizontal } from 'lucide-svelte';

	interface PanelConfig {
		id: string;
		collapsible?: boolean;
		collapsedSize?: number;
		minSize?: number;
		maxSize?: number;
	}

	interface Props {
		panels: PanelConfig[];
		defaultSize?: number[];
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		onResize?: (sizes: number[]) => void;
		panel: Snippet<[{ id: string; index: number }]>;
		class?: string;
	}

	let {
		panels,
		defaultSize,
		orientation = 'horizontal',
		disabled = false,
		onResize,
		panel,
		class: className
	}: Props = $props();

	const direction = $derived(orientation === 'vertical' ? 'vertical' : 'horizontal');
	const isVertical = $derived(orientation === 'vertical');
</script>

<PaneGroup
	{direction}
	{disabled}
	onLayout={onResize}
	class="flex h-full w-full {isVertical ? 'flex-col' : ''} {disabled
		? 'pointer-events-none opacity-50'
		: ''} {className ?? ''}"
>
	{#each panels as panelConfig, i}
		<Pane
			defaultSize={defaultSize?.[i]}
			minSize={panelConfig.minSize}
			maxSize={panelConfig.maxSize}
			collapsible={panelConfig.collapsible}
			collapsedSize={panelConfig.collapsedSize}
			class="overflow-auto"
		>
			{@render panel({ id: panelConfig.id, index: i })}
		</Pane>
		{#if i < panels.length - 1}
			<PaneResizer
				class="bg-kl-base-200 hover:bg-kl-base-300 focus-visible:outline-kl-primary flex shrink-0 items-center justify-center border-none transition-colors duration-150 focus-visible:outline-2 {isVertical
					? 'h-3 cursor-row-resize'
					: 'w-3 cursor-col-resize'}"
			>
				<span class="text-kl-muted-content">
					{#if isVertical}
						<GripHorizontal size={12} />
					{:else}
						<GripVertical size={12} />
					{/if}
				</span>
			</PaneResizer>
		{/if}
	{/each}
</PaneGroup>
