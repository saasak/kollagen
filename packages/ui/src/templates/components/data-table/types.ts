import type { Snippet } from 'svelte';
import type {
	FiltersInputConfig,
	FiltersInputDateRangeValue,
	FiltersInputNumberRangeValue,
	FiltersInputOption,
	FiltersInputTimeGranularity,
	FiltersInputTimeRangeValue,
	FiltersInputValue
} from '../filters-input';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableSortRule = {
	id: string;
	direction: DataTableSortDirection;
};

export type DataTableSort = DataTableSortRule[];

export type DataTableUrlStateHistory = 'auto' | 'replace' | 'push';

export type DataTableUrlState = {
	prefix: string;
	defaults?: Partial<DataTableQuery>;
	history?: DataTableUrlStateHistory;
};

export type DataTableRowKey = string | number;

export type DataTableSelection =
	| {
			mode: 'keys';
			keys: DataTableRowKey[];
	  }
	| {
			mode: 'all';
			excludedKeys: DataTableRowKey[];
	  };

export type DataTableDateRangeValue = FiltersInputDateRangeValue;

export type DataTableNumberRangeValue = FiltersInputNumberRangeValue;

export type DataTableTimeValue = string;

export type DataTableTimeRangeValue = FiltersInputTimeRangeValue;

export type DataTableTimeGranularity = FiltersInputTimeGranularity;

export type DataTableFilterValue = FiltersInputValue;

export type DataTableQuery = {
	page: number;
	perPage: number;
	search: string;
	filters: Record<string, DataTableFilterValue>;
	sort: DataTableSort;
};

export type DataTableOption = FiltersInputOption;

export type DataTableFilter = FiltersInputConfig;

export type DataTableRowActionsVariant = 'menu' | 'bar' | 'floating-bar';

export type DataTableRowActionsSize = 'xs' | 'sm';

export type DataTableColumn<T> = {
	id: string;
	label: string;
	accessor?: keyof T | ((row: T) => unknown);
	sortable?: boolean;
	align?: 'left' | 'center' | 'right';
	width?: string;
	format?: (value: unknown, row: T) => string | number;
	cell?: DataTableCellSnippet<T>;
};

export type DataTableCellContext<T> = {
	column: DataTableColumn<T>;
	rowKey: DataTableRowKey;
	updateRow: (patch: Partial<T>) => void | Promise<void>;
};

export type DataTableCellSnippet<T> = Snippet<
	[row: T, value: unknown, context: DataTableCellContext<T>]
>;

export type DataTableRowUpdatePayload<T> = {
	row: T;
	rowKey: DataTableRowKey;
	column: DataTableColumn<T>;
	columnId: string;
	value: unknown;
	patch: Partial<T>;
};

export type DataTableRowAction<T> = {
	id: string;
	label: string;
	icon?: Snippet<[row: T]>;
	disabled?: boolean | ((row: T) => boolean);
	onSelect: (row: T) => void;
};

export type DataTableBatchActionPayload<T> =
	| {
			mode: 'rows';
			rows: T[];
			rowKeys: DataTableRowKey[];
			query: DataTableQuery;
			totalCount: number;
	  }
	| {
			mode: 'all';
			excludedRowKeys: DataTableRowKey[];
			query: DataTableQuery;
			totalCount: number;
	  };

export type DataTableBatchAction<T> = {
	id: string;
	label: string;
	disabled?: boolean | ((payload: DataTableBatchActionPayload<T>) => boolean);
	onSelect: (payload: DataTableBatchActionPayload<T>) => void;
};

export function createDataTableQuery(overrides: Partial<DataTableQuery> = {}): DataTableQuery {
	return {
		page: overrides.page ?? 1,
		perPage: overrides.perPage ?? 10,
		search: overrides.search ?? '',
		filters: overrides.filters ?? {},
		sort: overrides.sort ?? []
	};
}

export function createDataTableSelection(
	overrides: {
		mode?: DataTableSelection['mode'];
		keys?: DataTableRowKey[];
		excludedKeys?: DataTableRowKey[];
	} = {}
): DataTableSelection {
	if (overrides.mode === 'all') {
		return {
			mode: 'all',
			excludedKeys: overrides.excludedKeys ?? []
		};
	}

	return {
		mode: 'keys',
		keys: overrides.keys ?? []
	};
}
