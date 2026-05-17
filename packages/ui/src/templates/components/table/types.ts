import type { Snippet } from 'svelte';

export type TableRowKey = string | number;
export type TableSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type TableColumn<T> = {
	id: string;
	label: string;
	accessor?: keyof T | ((row: T) => unknown);
	sortable?: boolean;
	align?: 'left' | 'center' | 'right';
	width?: string;
	format?: (value: unknown, row: T) => string | number;
	cell?: TableCellSnippet<T>;
};

export type TableCellContext<T> = {
	column: TableColumn<T>;
	rowKey: TableRowKey;
	updateRow: (patch: Partial<T>) => void | Promise<void>;
};

export type TableReorderDetails<T> = {
	fromIndex: number;
	toIndex: number;
	row: T;
	rowKey: TableRowKey;
};

export type TableCellSnippet<T> = Snippet<[row: T, value: unknown, context: TableCellContext<T>]>;
