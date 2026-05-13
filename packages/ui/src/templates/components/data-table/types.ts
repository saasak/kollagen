import type { Snippet } from 'svelte';

export type DataTableSortDirection = 'asc' | 'desc';

export type DataTableSort = {
	id: string;
	direction: DataTableSortDirection;
} | null;

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

export type DataTableDateRangeValue = {
	from?: string;
	to?: string;
};

export type DataTableNumberRangeValue = {
	min?: number;
	max?: number;
};

export type DataTableFilterValue =
	| string
	| string[]
	| boolean
	| DataTableDateRangeValue
	| DataTableNumberRangeValue
	| null;

export type DataTableQuery = {
	page: number;
	perPage: number;
	search: string;
	filters: Record<string, DataTableFilterValue>;
	sort: DataTableSort;
};

export type DataTableOption = {
	label: string;
	value: string;
};

export type DataTableFilter =
	| {
			id: string;
			label: string;
			type: 'text';
			placeholder?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'select';
			values: DataTableOption[];
			placeholder?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'multi-select';
			values: DataTableOption[];
			placeholder?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'boolean';
			trueLabel?: string;
			falseLabel?: string;
			placeholder?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'date-range';
	  }
	| {
			id: string;
			label: string;
			type: 'number-range';
	  };

export type DataTableCellSnippet<T> = Snippet<[row: T, value: unknown]>;

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

export type DataTableRowAction<T> = {
	id: string;
	label: string;
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
		sort: overrides.sort ?? null
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
