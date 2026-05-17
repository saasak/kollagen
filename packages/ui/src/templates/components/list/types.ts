import type { Snippet } from 'svelte';

export type ListRowKey = string | number;

export type ListColumn<T> = {
	id: string;
	label: string;
	accessor?: keyof T | ((row: T) => unknown);
	sortable?: boolean;
	align?: 'left' | 'center' | 'right';
	width?: string;
	format?: (value: unknown, row: T) => string | number;
	cell?: ListCellSnippet<T>;
};

export type ListCellContext<T> = {
	column: ListColumn<T>;
	rowKey: ListRowKey;
	updateRow: (patch: Partial<T>) => void | Promise<void>;
};

export type ListReorderDetails<T> = {
	fromIndex: number;
	toIndex: number;
	row: T;
	rowKey: ListRowKey;
};

export type ListCellSnippet<T> = Snippet<[row: T, value: unknown, context: ListCellContext<T>]>;
