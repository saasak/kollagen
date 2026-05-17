import {
	cleanFiltersInputValues,
	isEmptyFiltersInputValue,
	isRangeObject
} from '../filters-input/utils';
import {
	createDataTableQuery,
	type DataTableColumn,
	type DataTableFilter,
	type DataTableFilterValue,
	type DataTableQuery,
	type DataTableSort,
	type DataTableSortRule,
	type DataTableUrlState
} from './types';

export type DataTableUrlStateConfig<T extends Record<string, any> = Record<string, any>> =
	DataTableUrlState & {
		columns?: DataTableColumn<T>[];
		filters?: DataTableFilter[];
		pageSizeOptions?: number[];
	};

const SORT_SEPARATOR = '.';

export function parseDataTableQuerySearchParams<T extends Record<string, any>>(
	params: URLSearchParams,
	config: DataTableUrlStateConfig<T>
): DataTableQuery {
	const defaults = createDataTableQuery(config.defaults);
	const prefix = config.prefix;
	const nextQuery = createDataTableQuery(defaults);

	const page = parsePositiveInteger(params.get(`${prefix}_page`));
	if (page) nextQuery.page = page;

	const perPage = parsePositiveInteger(params.get(`${prefix}_perPage`));
	if (perPage) nextQuery.perPage = perPage;

	const search = params.get(`${prefix}_search`);
	if (search !== null) nextQuery.search = search;

	const sorts = params.getAll(`${prefix}_sort`);
	if (sorts.length > 0) {
		nextQuery.sort = parseSortParams(sorts, config.columns);
	}

	if (config.filters) {
		nextQuery.filters = {
			...defaults.filters,
			...parseFilterParams(params, config)
		};
	}

	return normalizeDataTableQuery(nextQuery, config);
}

export function createDataTableQueryFromUrl<T extends Record<string, any>>(
	urlOrParams: URL | URLSearchParams,
	config: DataTableUrlStateConfig<T>
): DataTableQuery {
	return parseDataTableQuerySearchParams(getSearchParams(urlOrParams), config);
}

export function writeDataTableQuerySearchParams<T extends Record<string, any>>(
	params: URLSearchParams,
	query: DataTableQuery,
	config: DataTableUrlStateConfig<T>
) {
	const nextParams = new URLSearchParams(params);
	const prefix = config.prefix;
	const defaults = normalizeDataTableQuery(createDataTableQuery(config.defaults), config);
	const normalizedQuery = normalizeDataTableQuery(query, config);

	deleteDataTableQuerySearchParams(nextParams, prefix);

	if (normalizedQuery.page !== defaults.page) {
		nextParams.set(`${prefix}_page`, String(normalizedQuery.page));
	}

	if (normalizedQuery.perPage !== defaults.perPage) {
		nextParams.set(`${prefix}_perPage`, String(normalizedQuery.perPage));
	}

	if (normalizedQuery.search !== defaults.search) {
		nextParams.set(`${prefix}_search`, normalizedQuery.search);
	}

	if (!areSortsEqual(normalizedQuery.sort, defaults.sort)) {
		for (const sort of normalizedQuery.sort) {
			nextParams.append(`${prefix}_sort`, `${sort.id}${SORT_SEPARATOR}${sort.direction}`);
		}
	}

	writeFilterParams(nextParams, normalizedQuery, defaults, config);

	return nextParams;
}

export function normalizeDataTableQuery<T extends Record<string, any>>(
	query: Partial<DataTableQuery>,
	config: Omit<DataTableUrlStateConfig<T>, 'prefix'>
): DataTableQuery {
	const defaults = createDataTableQuery(config.defaults);
	const normalizedPage = parsePositiveInteger(query.page) ?? defaults.page;
	const normalizedPerPage = normalizePerPage(
		parsePositiveInteger(query.perPage) ?? defaults.perPage,
		defaults.perPage,
		config.pageSizeOptions
	);

	return {
		page: normalizedPage,
		perPage: normalizedPerPage,
		search: typeof query.search === 'string' ? query.search : defaults.search,
		filters: normalizeFilters(query.filters ?? defaults.filters, config.filters),
		sort: normalizeSort(query.sort ?? defaults.sort, config.columns)
	};
}

export function areDataTableQueriesEqual(first: DataTableQuery, second: DataTableQuery) {
	return (
		first.page === second.page &&
		first.perPage === second.perPage &&
		first.search === second.search &&
		areSortsEqual(first.sort, second.sort) &&
		JSON.stringify(cleanFiltersInputValues(first.filters)) ===
			JSON.stringify(cleanFiltersInputValues(second.filters))
	);
}

function getSearchParams(urlOrParams: URL | URLSearchParams) {
	return urlOrParams instanceof URL ? urlOrParams.searchParams : urlOrParams;
}

function deleteDataTableQuerySearchParams(params: URLSearchParams, prefix: string) {
	for (const key of Array.from(params.keys())) {
		if (key.startsWith(`${prefix}_`)) {
			params.delete(key);
		}
	}
}

function parseFilterParams<T extends Record<string, any>>(
	params: URLSearchParams,
	config: DataTableUrlStateConfig<T>
) {
	const filters: Record<string, DataTableFilterValue> = {};
	const prefix = config.prefix;

	for (const filter of config.filters ?? []) {
		const baseKey = `${prefix}_filter_${filter.id}`;

		if (filter.type === 'multi-select') {
			const values = params
				.getAll(baseKey)
				.filter((value) => filter.values.some((option) => option.value === value));
			if (values.length > 0 || params.has(baseKey)) filters[filter.id] = values;
			continue;
		}

		if (filter.type === 'select') {
			const value = params.get(baseKey);
			if (value !== null) {
				filters[filter.id] = filter.values.some((option) => option.value === value) ? value : null;
			}
			continue;
		}

		if (filter.type === 'boolean') {
			const value = params.get(baseKey);
			if (value !== null) {
				filters[filter.id] = value === 'true' ? true : value === 'false' ? false : null;
			}
			continue;
		}

		if (filter.type === 'number-range') {
			if (params.has(`${baseKey}_min`) || params.has(`${baseKey}_max`)) {
				filters[filter.id] = {
					min: parseFiniteNumber(params.get(`${baseKey}_min`)),
					max: parseFiniteNumber(params.get(`${baseKey}_max`))
				};
			}
			continue;
		}

		if (filter.type === 'date-range' || filter.type === 'time-range') {
			if (params.has(`${baseKey}_from`) || params.has(`${baseKey}_to`)) {
				filters[filter.id] = {
					from: params.get(`${baseKey}_from`) || undefined,
					to: params.get(`${baseKey}_to`) || undefined
				};
			}
			continue;
		}

		const value = params.get(baseKey);
		if (value !== null) filters[filter.id] = value;
	}

	return filters;
}

function writeFilterParams<T extends Record<string, any>>(
	params: URLSearchParams,
	query: DataTableQuery,
	defaults: DataTableQuery,
	config: DataTableUrlStateConfig<T>
) {
	const prefix = config.prefix;

	for (const filter of config.filters ?? []) {
		const baseKey = `${prefix}_filter_${filter.id}`;
		const value = query.filters[filter.id];
		const defaultValue = defaults.filters[filter.id];
		if (areFilterValuesEqual(value, defaultValue)) continue;

		if (filter.type === 'multi-select') {
			const values = Array.isArray(value) ? value : [];
			for (const entry of values) params.append(baseKey, entry);
			if (values.length === 0 && !isEmptyFiltersInputValue(defaultValue)) params.set(baseKey, '');
			continue;
		}

		if (
			filter.type === 'number-range' ||
			filter.type === 'date-range' ||
			filter.type === 'time-range'
		) {
			if (isRangeObject(value)) {
				const range = value as Record<string, string | number | undefined>;
				for (const key of ['min', 'max', 'from', 'to'] as const) {
					const entry = range[key];
					if (entry !== undefined && entry !== '') params.set(`${baseKey}_${key}`, String(entry));
				}
			}
			if (isEmptyFiltersInputValue(value) && !isEmptyFiltersInputValue(defaultValue)) {
				params.set(`${baseKey}_${filter.type === 'number-range' ? 'min' : 'from'}`, '');
			}
			continue;
		}

		if (!isEmptyFiltersInputValue(value)) {
			params.set(baseKey, String(value));
		} else if (!isEmptyFiltersInputValue(defaultValue)) {
			params.set(baseKey, '');
		}
	}
}

function normalizeFilters(values: DataTableQuery['filters'], filters?: DataTableFilter[]) {
	if (!filters) return cleanFiltersInputValues(values);

	const knownFilters = new Map(filters.map((filter) => [filter.id, filter]));
	const nextValues: DataTableQuery['filters'] = {};

	for (const [id, value] of Object.entries(values)) {
		const filter = knownFilters.get(id);
		if (!filter) continue;

		if (filter.type === 'select') {
			if (typeof value === 'string' && filter.values.some((option) => option.value === value)) {
				nextValues[id] = value;
			}
			continue;
		}

		if (filter.type === 'multi-select') {
			if (Array.isArray(value)) {
				const values = value.filter((entry) =>
					filter.values.some((option) => option.value === entry)
				);
				if (values.length > 0) nextValues[id] = values;
			}
			continue;
		}

		if (filter.type === 'boolean') {
			if (typeof value === 'boolean') nextValues[id] = value;
			continue;
		}

		if (filter.type === 'number-range') {
			if (isRangeObject(value)) {
				const range = value as Record<'min' | 'max', unknown>;
				const min =
					typeof range.min === 'number' && Number.isFinite(range.min) ? range.min : undefined;
				const max =
					typeof range.max === 'number' && Number.isFinite(range.max) ? range.max : undefined;
				if (min !== undefined || max !== undefined) nextValues[id] = { min, max };
			}
			continue;
		}

		if (filter.type === 'date-range' || filter.type === 'time-range') {
			if (isRangeObject(value)) {
				const range = value as Record<'from' | 'to', unknown>;
				const from = typeof range.from === 'string' && range.from ? range.from : undefined;
				const to = typeof range.to === 'string' && range.to ? range.to : undefined;
				if (from || to) nextValues[id] = { from, to };
			}
			continue;
		}

		if (typeof value === 'string' && value) nextValues[id] = value;
	}

	return nextValues;
}

function parseSortParams<T extends Record<string, any>>(
	values: string[],
	columns: DataTableColumn<T>[] | undefined
) {
	const sorts: DataTableSort = [];

	for (const value of values) {
		const index = value.lastIndexOf(SORT_SEPARATOR);
		if (index === -1) continue;
		const id = value.slice(0, index);
		const direction = value.slice(index + 1);
		if (direction !== 'asc' && direction !== 'desc') continue;
		sorts.push({ id, direction });
	}

	return normalizeSort(sorts, columns);
}

function normalizeSort<T extends Record<string, any>>(
	value: DataTableQuery['sort'] | DataTableSortRule | null | undefined,
	columns: DataTableColumn<T>[] | undefined
) {
	const rules = Array.isArray(value) ? value : value ? [value] : [];
	const sortableColumns = columns
		? new Set(columns.filter((column) => column.sortable).map((column) => column.id))
		: null;
	const nextRules: DataTableSort = [];

	for (const rule of rules) {
		if (!rule || (rule.direction !== 'asc' && rule.direction !== 'desc')) continue;
		if (sortableColumns && !sortableColumns.has(rule.id)) continue;
		if (nextRules.some((nextRule) => nextRule.id === rule.id)) continue;
		nextRules.push({ id: rule.id, direction: rule.direction });
	}

	return nextRules;
}

function normalizePerPage(value: number, defaultValue: number, pageSizeOptions?: number[]) {
	if (!pageSizeOptions || pageSizeOptions.length === 0) return value;
	if (pageSizeOptions.includes(value)) return value;
	if (pageSizeOptions.includes(defaultValue)) return defaultValue;
	return pageSizeOptions[0] ?? value;
}

function parsePositiveInteger(value: unknown) {
	const number = typeof value === 'number' ? value : Number(value);
	if (!Number.isInteger(number) || number < 1) return undefined;
	return number;
}

function parseFiniteNumber(value: string | null) {
	if (!value) return undefined;
	const number = Number(value);
	return Number.isFinite(number) ? number : undefined;
}

function areSortsEqual(first: DataTableSort, second: DataTableSort) {
	if (first.length !== second.length) return false;
	return first.every((rule, index) => {
		const otherRule = second[index];
		return otherRule?.id === rule.id && otherRule.direction === rule.direction;
	});
}

function areFilterValuesEqual(first: DataTableFilterValue, second: DataTableFilterValue) {
	if (isEmptyFiltersInputValue(first) && isEmptyFiltersInputValue(second)) return true;
	return JSON.stringify(first) === JSON.stringify(second);
}
