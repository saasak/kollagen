<script lang="ts" generics="T extends Record<string, any>">
	import { cn } from '$lib/utils/cn';
	import { GripVertical } from 'lucide-svelte';
	import type { TableColumn, TableReorderDetails, TableRowKey, TableSize } from './types';

	const sizeClasses: Record<
		TableSize,
		{ head: string; cell: string; empty: string; handle: string; icon: number }
	> = {
		xs: {
			head: 'px-3 py-1.5 text-[0.625rem]',
			cell: 'px-3 py-1.5 text-xs',
			empty: 'px-3 py-8 text-xs',
			handle: 'size-7',
			icon: 14
		},
		sm: {
			head: 'px-3 py-2 text-[0.6875rem]',
			cell: 'px-3 py-2 text-sm',
			empty: 'px-3 py-10 text-sm',
			handle: 'size-8',
			icon: 15
		},
		md: {
			head: 'px-4 py-3 text-xs',
			cell: 'px-4 py-3 text-sm',
			empty: 'px-4 py-12 text-sm',
			handle: 'size-8',
			icon: 16
		},
		lg: {
			head: 'px-5 py-4 text-xs',
			cell: 'px-5 py-4 text-base',
			empty: 'px-5 py-14 text-base',
			handle: 'size-9',
			icon: 17
		},
		xl: {
			head: 'px-6 py-5 text-sm',
			cell: 'px-6 py-5 text-base',
			empty: 'px-6 py-16 text-base',
			handle: 'size-10',
			icon: 18
		}
	};

	interface Props {
		data: T[];
		columns: TableColumn<T>[];
		caption?: string;
		emptyText?: string;
		rowKey?: keyof T | ((row: T) => string | number);
		size?: TableSize;
		reorderable?: boolean;
		onReorder?: (nextData: T[], details: TableReorderDetails<T>) => void;
		class?: string;
	}

	let {
		data,
		columns,
		caption,
		emptyText = 'No results found',
		rowKey,
		size = 'md',
		reorderable = false,
		onReorder,
		class: className
	}: Props = $props();

	const colSpan = $derived(Math.max(columns.length + (reorderable ? 1 : 0), 1));
	const currentSize = $derived(sizeClasses[size] ?? sizeClasses.md);

	let draggingIndex = $state<number | null>(null);
	let dragOverIndex = $state<number | null>(null);

	function getCellValue(row: T, column: TableColumn<T>) {
		if (typeof column.accessor === 'function') return column.accessor(row);
		if (column.accessor) return row[column.accessor];
		return row[column.id];
	}

	function getRowKey(row: T, index: number) {
		if (typeof rowKey === 'function') return rowKey(row);
		if (rowKey) return row[rowKey];
		return index;
	}

	function getSelectionKey(row: T, index: number): TableRowKey {
		const key = getRowKey(row, index);
		return typeof key === 'number' || typeof key === 'string' ? key : String(key);
	}

	function getAlignClass(align: TableColumn<T>['align']) {
		if (align === 'center') return 'text-center';
		if (align === 'right') return 'text-right tabular-nums';
		return 'text-left';
	}

	function formatValue(value: unknown, row: T, column: TableColumn<T>) {
		if (column.format) return column.format(value, row);
		if (value === null || value === undefined) return '';
		if (typeof value === 'string' || typeof value === 'number') return value;
		return String(value);
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

<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 overflow-hidden border">
	<div class="w-full overflow-x-auto">
		<table class={cn('w-full min-w-full caption-bottom border-collapse text-left', className)}>
			{#if caption}
				<caption class="text-kl-muted-content px-4 pt-3 pb-4 text-sm">{caption}</caption>
			{/if}

			<thead class="bg-kl-base-200 text-kl-base-content">
				<tr>
					{#if reorderable}
						<th
							scope="col"
							aria-label="Reorder rows"
							class={cn(
								'border-kl-base-300 w-0 border-b font-semibold tracking-normal whitespace-nowrap uppercase',
								currentSize.head
							)}
						></th>
					{/if}

					{#each columns as column (column.id)}
						<th
							scope="col"
							style:width={column.width}
							class={cn(
								'border-kl-base-300 border-b font-semibold tracking-normal whitespace-nowrap uppercase',
								currentSize.head,
								getAlignClass(column.align)
							)}
						>
							{column.label}
						</th>
					{/each}
				</tr>
			</thead>

			<tbody>
				{#each data as row, index (getRowKey(row, index))}
					{@const selectionKey = getSelectionKey(row, index)}
					<tr
						class={cn(
							'border-kl-base-300 hover:bg-kl-base-200/60 border-b transition-colors duration-[var(--kl-transition-fast)] last:border-b-0',
							reorderable ? 'select-none' : '',
							draggingIndex === index ? 'opacity-60' : '',
							dragOverIndex === index && draggingIndex !== index
								? 'bg-kl-primary/5 shadow-[inset_0_2px_0_var(--kl-primary)]'
								: ''
						)}
						ondragover={(event) => handleDragOver(event, index)}
						ondrop={(event) => handleDrop(event, index)}
					>
						{#if reorderable}
							<td class={cn('text-kl-muted-content w-0 align-middle', currentSize.cell)}>
								<button
									type="button"
									draggable="true"
									aria-label="Reorder row"
									title="Reorder row"
									class={cn(
										'hover:bg-kl-base-200 hover:text-kl-base-content rounded-kl-field inline-flex cursor-grab items-center justify-center transition-colors duration-[var(--kl-transition-fast)] active:cursor-grabbing',
										currentSize.handle
									)}
									ondragstart={(event) => handleDragStart(event, index)}
									ondragend={handleDragEnd}
									onkeydown={(event) => handleHandleKeydown(event, index)}
								>
									<GripVertical size={currentSize.icon} />
								</button>
							</td>
						{/if}

						{#each columns as column (column.id)}
							{@const value = getCellValue(row, column)}
							{@const cell = column.cell}
							<td
								class={cn(
									'text-kl-base-content align-middle',
									currentSize.cell,
									getAlignClass(column.align)
								)}
							>
								{#if cell}
									{@render cell(row, value, {
										column,
										rowKey: selectionKey,
										updateRow: () => undefined
									})}
								{:else}
									{formatValue(value, row, column)}
								{/if}
							</td>
						{/each}
					</tr>
				{:else}
					<tr>
						<td
							colspan={colSpan}
							class={cn('text-kl-muted-content text-center', currentSize.empty)}
						>
							{emptyText}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
