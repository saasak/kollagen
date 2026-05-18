<script module lang="ts">
	export interface TreeNode {
		value: string;
		label: string;
		children?: TreeNode[];
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ChevronRight } from 'lucide-svelte';
	import { untrack } from 'svelte';

	interface Props {
		nodes: TreeNode[];
		label?: string;
		selectedValue?: string[];
		selected?: TreeNode[];
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
		selected = $bindable(),
		expandedValue = $bindable<string[]>([]),
		selectionMode = 'single',
		onSelectionChange,
		onExpandedChange,
		class: className
	}: Props = $props();

	const selectedControlsValue = untrack(() => selected) !== undefined;
	const selectedNodes = $derived(selected ?? []);
	const nodeLookup = $derived.by(() => {
		const lookup: Record<string, TreeNode> = {};
		function collect(nodeList: TreeNode[]) {
			for (const node of nodeList) {
				lookup[node.value] = node;
				if (node.children?.length) collect(node.children);
			}
		}
		collect(nodes);
		for (const node of selectedNodes) lookup[node.value] = node;
		return lookup;
	});

	if (untrack(() => selected) !== undefined) {
		selectedValue = selectedToValue(untrack(() => selected));
	} else {
		selected = valueToSelected(untrack(() => selectedValue));
	}

	function selectedToValue(selection: TreeNode[] | undefined): string[] {
		return selection?.map((node) => node.value) ?? [];
	}

	function valueToSelected(value: string[] | undefined): TreeNode[] {
		return (value ?? [])
			.map((nodeValue) => nodeLookup[nodeValue])
			.filter((node): node is TreeNode => node !== undefined);
	}

	function valuesMatch(first: string[], second: string[]) {
		return (
			first.length === second.length &&
			first.every((nodeValue, index) => nodeValue === second[index])
		);
	}

	function updateSelection(nextValue: string[]) {
		selectedValue = nextValue;
		selected = valueToSelected(nextValue);
		onSelectionChange?.({ value: nextValue });
	}

	const selectedNodeValues = $derived(selectedToValue(selected));
	const selectedMatchesValue = $derived(valuesMatch(selectedValue, selectedNodeValues));
	const nextSelected = $derived(valueToSelected(selectedValue));

	$effect(() => {
		if (selected === undefined) return;
		if (!selectedMatchesValue) selectedValue = selectedNodeValues;
	});

	$effect(() => {
		if (selectedControlsValue) return;
		if (!selectedMatchesValue) selected = nextSelected;
	});

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
			updateSelection(isSelected(value) ? [] : [value]);
		} else {
			if (isSelected(value)) {
				updateSelection(selectedValue.filter((v) => v !== value));
			} else {
				updateSelection([...selectedValue, value]);
			}
		}
	}

	export function removeSelected(node: TreeNode) {
		updateSelection(selectedValue.filter((value) => value !== node.value));
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
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-sm flex shrink-0 items-center justify-center transition-colors duration-150"
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

<div class={cn(`w-full`, className)}>
	{#if label}
		<span class="text-kl-base-content mb-1 block text-sm font-medium">{label}</span>
	{/if}
	<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-1" role="tree">
		{@render renderNodes(nodes)}
	</div>
</div>
