<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import { GripVertical } from 'lucide-svelte';
	import type { ListColumn, ListReorderDetails, ListRowKey } from './types';

	interface Props {
		data: T[];
		columns: ListColumn<T>[];
		caption?: string;
		emptyText?: string;
		rowKey?: keyof T | ((row: T) => string | number);
		reorderable?: boolean;
		onReorder?: (nextData: T[], details: ListReorderDetails<T>) => void;
		class?: string;
	}

	let {
		data,
		columns,
		caption,
		emptyText = 'No results found',
		rowKey,
		reorderable = false,
		onReorder,
		class: className
	}: Props = $props();

	let draggingIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	function getCellValue(row: T, column: ListColumn<T>) {
		if (typeof column.accessor === 'function') return column.accessor(row);
		if (column.accessor) return row[column.accessor];
		return row[column.id];
	}

	function getRowKey(row: T, index: number) {
		if (typeof rowKey === 'function') return rowKey(row);
		if (rowKey) return row[rowKey];
		return index;
	}

	function getSelectionKey(row: T, index: number): ListRowKey {
		const key = getRowKey(row, index);
		return typeof key === 'number' || typeof key === 'string' ? key : String(key);
	}

	function getAlignClass(align: ListColumn<T>['align']) {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right tabular-nums';
		return 'text-left';
	}

	function formatValue(value: unknown, row: T, column: ListColumn<T>) {
		if (column.format) return column.format(value, row);
		if (value === null || value === undefined) return '';
		if (typeof value === 'string' || typeof value === 'number') return value;
		return String(value);
	}

	function getRowGridTemplate() {
		if (columns.length === 0) return undefined;
		const columnTemplate = columns.map((column) => column.width ?? 'minmax(0,1fr)').join(' ');
		return reorderable ? `2rem ${columnTemplate}` : columnTemplate;
	}

	function reorderRows(fromIndex: number, toIndex: number) {
		if (!reorderable || fromIndex === toIndex) return;
		if (fromIndex < 0 || toIndex < 0 || fromIndex >= data.length || toIndex >= data.length) return;

		const row = data[fromIndex];
		const movedRowKey = getSelectionKey(row, fromIndex);
		const nextData = [...data];
		const [movedRow] = nextData.splice(fromIndex, 1);
		nextData.splice(toIndex, 0, movedRow);

		onReorder?.(nextData, {
			fromIndex,
			toIndex,
			row,
			rowKey: movedRowKey
		});
	}

	function handleDragStart(event: DragEvent, index: number) {
		if (!reorderable) return;
		draggingIndex = index;
		dragOverIndex = index;
		event.dataTransfer?.setData('text/plain', String(index));
		if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
	}

	function handleDragOver(event: DragEvent, index: number) {
		if (!reorderable || draggingIndex === null) return;
		event.preventDefault();
		dragOverIndex = index;
		if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
	}

	function handleDrop(event: DragEvent, toIndex: number) {
		if (!reorderable) return;
		event.preventDefault();

		const fromIndex =
			draggingIndex ?? Number.parseInt(event.dataTransfer?.getData('text/plain') ?? '', 10);

		if (Number.isFinite(fromIndex)) reorderRows(fromIndex, toIndex);
		draggingIndex = null;
		dragOverIndex = null;
	}

	function handleDragEnd() {
		draggingIndex = null;
		dragOverIndex = null;
	}

	function handleHandleKeydown(event: KeyboardEvent, index: number) {
		if (!reorderable) return;

		if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
			event.preventDefault();
			reorderRows(index, Math.max(0, index - 1));
		}

		if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
			event.preventDefault();
			reorderRows(index, Math.min(data.length - 1, index + 1));
		}
	}
</script>

<section class={cn('space-y-2', className)} aria-label={caption}>
	{#if caption}
		<div class="text-kl-muted-content px-1 text-sm">{caption}</div>
	{/if}

	<svelte:element
		this={reorderable ? 'ol' : 'ul'}
		role="list"
		class="divide-kl-base-300 rounded-kl-box border-kl-base-300 bg-kl-base-100 list-none divide-y border"
	>
		{#each data as row, index (getRowKey(row, index))}
			{@const selectionKey = getSelectionKey(row, index)}
			<li
				class={cn(
					'hover:bg-kl-base-200/60 px-4 py-3 transition-colors duration-[var(--kl-transition-fast)]',
					reorderable ? 'select-none' : '',
					draggingIndex === index ? 'opacity-60' : '',
					dragOverIndex === index && draggingIndex !== index
						? 'bg-kl-primary/5 shadow-[inset_0_2px_0_var(--kl-primary)]'
						: ''
				)}
				ondragover={(event) => handleDragOver(event, index)}
				ondrop={(event) => handleDrop(event, index)}
			>
				<div
					class="grid min-w-full items-center gap-x-4 gap-y-2"
					style:grid-template-columns={getRowGridTemplate()}
				>
					{#if reorderable}
						<button
							type="button"
							draggable="true"
							aria-label="Reorder row"
							title="Reorder row"
							class="text-kl-muted-content hover:bg-kl-base-200 hover:text-kl-base-content rounded-kl-field inline-flex size-8 cursor-grab items-center justify-center transition-colors duration-[var(--kl-transition-fast)] active:cursor-grabbing"
							ondragstart={(event) => handleDragStart(event, index)}
							ondragend={handleDragEnd}
							onkeydown={(event) => handleHandleKeydown(event, index)}
						>
							<GripVertical size={16} />
						</button>
					{/if}

					{#each columns as column (column.id)}
						{@const value = getCellValue(row, column)}
						{@const cell = column.cell}
						<div class={cn('min-w-0', getAlignClass(column.align))}>
							{#if cell}
								{@render cell(row, value, {
									column,
									rowKey: selectionKey,
									updateRow: () => undefined
								})}
							{:else}
								<span class="text-kl-base-content text-sm">{formatValue(value, row, column)}</span>
							{/if}
						</div>
					{/each}
				</div>
			</li>
		{:else}
			<li class="text-kl-muted-content px-4 py-12 text-center text-sm">{emptyText}</li>
		{/each}
	</svelte:element>
</section>
