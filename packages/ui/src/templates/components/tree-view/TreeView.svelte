<script lang="ts">
	import { ChevronRight } from 'lucide-svelte';

	interface TreeNode {
		value: string;
		label: string;
		children?: TreeNode[];
		disabled?: boolean;
	}

	interface Props {
		nodes: TreeNode[];
		label?: string;
		selectedValue?: string[];
		expandedValue?: string[];
		selectionMode?: 'single' | 'multiple';
		onSelectionChange?: (details: { value: string[] }) => void;
		onExpandedChange?: (details: { value: string[] }) => void;
		class?: string;
	}

	let {
		nodes,
		label,
		selectedValue = $bindable<string[]>([]),
		expandedValue = $bindable<string[]>([]),
		selectionMode = 'single',
		onSelectionChange,
		onExpandedChange,
		class: className
	}: Props = $props();

	function isExpanded(value: string): boolean {
		return expandedValue.includes(value);
	}

	function isSelected(value: string): boolean {
		return selectedValue.includes(value);
	}

	function toggleExpand(value: string) {
		if (isExpanded(value)) {
			expandedValue = expandedValue.filter((v) => v !== value);
		} else {
			expandedValue = [...expandedValue, value];
		}
		onExpandedChange?.({ value: expandedValue });
	}

	function select(value: string, nodeDisabled?: boolean) {
		if (nodeDisabled) return;
		if (selectionMode === 'single') {
			selectedValue = isSelected(value) ? [] : [value];
		} else {
			if (isSelected(value)) {
				selectedValue = selectedValue.filter((v) => v !== value);
			} else {
				selectedValue = [...selectedValue, value];
			}
		}
		onSelectionChange?.({ value: selectedValue });
	}

	function handleKeydown(event: KeyboardEvent, node: TreeNode) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			select(node.value, node.disabled);
		}
		if (node.children?.length) {
			if (event.key === 'ArrowRight' && !isExpanded(node.value)) {
				event.preventDefault();
				toggleExpand(node.value);
			}
			if (event.key === 'ArrowLeft' && isExpanded(node.value)) {
				event.preventDefault();
				toggleExpand(node.value);
			}
		}
	}
</script>

{#snippet renderNodes(nodeList: TreeNode[])}
	{#each nodeList as node (node.value)}
		{#if node.children?.length}
			<div
				role="treeitem"
				aria-expanded={isExpanded(node.value)}
				aria-selected={isSelected(node.value)}
			>
				<div
					role="button"
					tabindex={node.disabled ? -1 : 0}
					onclick={() => select(node.value, node.disabled)}
					onkeydown={(e) => handleKeydown(e, node)}
					class="rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 flex w-full cursor-pointer items-center gap-1 px-2 py-1 text-sm transition-colors duration-150 {isSelected(
						node.value
					)
						? 'bg-kl-base-200 text-kl-primary'
						: ''} {node.disabled ? 'cursor-not-allowed opacity-50' : ''}"
				>
					<button
						onclick={(e) => {
							e.stopPropagation();
							toggleExpand(node.value);
						}}
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex h-5 w-5 shrink-0 items-center justify-center transition-colors duration-150"
						aria-label="Toggle {node.label}"
					>
						<span
							class="transition-transform duration-150 {isExpanded(node.value) ? 'rotate-90' : ''}"
						>
							<ChevronRight size={14} />
						</span>
					</button>
					<span class="flex-1 select-none">{node.label}</span>
				</div>
				{#if isExpanded(node.value)}
					<div class="pl-4" role="group">
						{@render renderNodes(node.children)}
					</div>
				{/if}
			</div>
		{:else}
			<div
				role="treeitem"
				aria-selected={isSelected(node.value)}
				tabindex={node.disabled ? -1 : 0}
				onclick={() => select(node.value, node.disabled)}
				onkeydown={(e) => handleKeydown(e, node)}
				class="rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 flex w-full cursor-pointer items-center gap-1 px-2 py-1 text-sm transition-colors duration-150 {isSelected(
					node.value
				)
					? 'bg-kl-base-200 text-kl-primary'
					: ''} {node.disabled ? 'cursor-not-allowed opacity-50' : ''}"
			>
				<span class="flex-1 pl-6 select-none">{node.label}</span>
			</div>
		{/if}
	{/each}
{/snippet}

<div class="w-full {className ?? ''}">
	{#if label}
		<span class="text-kl-base-content mb-1 block text-sm font-medium">{label}</span>
	{/if}
	<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-1" role="tree">
		{@render renderNodes(nodes)}
	</div>
</div>
