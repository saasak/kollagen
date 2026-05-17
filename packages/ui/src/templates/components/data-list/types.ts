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

export type DataListSortDirection = 'asc' | 'desc';

export type DataListSortRule = {
	id: string;
	direction: DataListSortDirection;
};

export type DataListSort = DataListSortRule[];

export type DataListUrlStateHistory = 'auto' | 'replace' | 'push';

export type DataListUrlState = {
	prefix: string;
	defaults?: Partial<DataListQuery>;
	history?: DataListUrlStateHistory;
};

export type DataListRowKey = string | number;

export type DataListSelection =
	| {
			mode: 'keys';
			keys: DataListRowKey[];
	  }
	| {
			mode: 'all';
			excludedKeys: DataListRowKey[];
	  };

export type DataListDateRangeValue = FiltersInputDateRangeValue;

export type DataListNumberRangeValue = FiltersInputNumberRangeValue;

export type DataListTimeValue = string;

export type DataListTimeRangeValue = FiltersInputTimeRangeValue;

export type DataListTimeGranularity = FiltersInputTimeGranularity;

export type DataListFilterValue = FiltersInputValue;

export type DataListQuery = {
	page: number;
	perPage: number;
	search: string;
	filters: Record<string, DataListFilterValue>;
	sort: DataListSort;
};

export type DataListOption = FiltersInputOption;

export type DataListFilter = FiltersInputConfig;

export type DataListRowActionsVariant = 'menu' | 'bar' | 'floating-bar';

export type DataListRowActionsSize = 'xs' | 'sm';

export type DataListColumn<T> = {
	id: string;
	label: string;
	accessor?: keyof T | ((row: T) => unknown);
	sortable?: boolean;
	grow?: boolean;
	wrap?: boolean;
	align?: 'left' | 'center' | 'right';
	width?: string;
	format?: (value: unknown, row: T) => string | number;
	cell?: DataListCellSnippet<T>;
	media?: DataListCellSnippet<T>;
	class?: string;
	valueClass?: string;
};

export type DataListCellContext<T> = {
	column: DataListColumn<T>;
	rowKey: DataListRowKey;
	updateRow: (patch: Partial<T>) => void | Promise<void>;
};

export type DataListCellSnippet<T> = Snippet<
	[row: T, value: unknown, context: DataListCellContext<T>]
>;

export type DataListRowUpdatePayload<T> = {
	row: T;
	rowKey: DataListRowKey;
	column: DataListColumn<T>;
	columnId: string;
	value: unknown;
	patch: Partial<T>;
};

export type DataListRowActionMenuEntry<T> =
	| {
			label: string;
			value: string;
			disabled?: boolean | ((row: T) => boolean);
			onSelect?: (row: T) => void;
	  }
	| { type: 'separator' }
	| {
			type: 'group';
			label: string;
			items?: DataListRowActionMenuEntry<T>[];
	  }
	| {
			type: 'submenu';
			label: string;
			disabled?: boolean | ((row: T) => boolean);
			items: DataListRowActionMenuEntry<T>[];
	  };

type DataListRowActionBase<T> = {
	id: string;
	label: string;
	icon?: Snippet<[row: T]>;
	disabled?: boolean | ((row: T) => boolean);
};

export type DataListRowActionButton<T> = DataListRowActionBase<T> & {
	type?: 'button';
	onSelect: (row: T) => void;
};

export type DataListRowActionMenu<T> = DataListRowActionBase<T> & {
	type: 'menu';
	items: DataListRowActionMenuEntry<T>[];
	onSelect?: (row: T, value: string) => void;
};

export type DataListRowAction<T> = DataListRowActionButton<T> | DataListRowActionMenu<T>;

export type DataListBatchActionPayload<T> =
	| {
			mode: 'rows';
			rows: T[];
			rowKeys: DataListRowKey[];
			query: DataListQuery;
			totalCount: number;
	  }
	| {
			mode: 'all';
			excludedRowKeys: DataListRowKey[];
			query: DataListQuery;
			totalCount: number;
	  };

export type DataListBatchAction<T> = {
	id: string;
	label: string;
	disabled?: boolean | ((payload: DataListBatchActionPayload<T>) => boolean);
	onSelect: (payload: DataListBatchActionPayload<T>) => void;
};

export function createDataListQuery(overrides: Partial<DataListQuery> = {}): DataListQuery {
	return {
		page: overrides.page ?? 1,
		perPage: overrides.perPage ?? 10,
		search: overrides.search ?? '',
		filters: overrides.filters ?? {},
		sort: overrides.sort ?? []
	};
}

export function createDataListSelection(
	overrides: {
		mode?: DataListSelection['mode'];
		keys?: DataListRowKey[];
		excludedKeys?: DataListRowKey[];
	} = {}
): DataListSelection {
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
