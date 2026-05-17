import type { FiltersInputValue, FiltersInputValues } from './types';

export function isRangeObject(value: FiltersInputValue): value is Record<string, string | number> {
	return !!value && typeof value === 'object' && !Array.isArray(value);
}

export function isEmptyFiltersInputValue(value: FiltersInputValue) {
	if (value === null || value === undefined) return true;
	if (typeof value === 'string') return value === '';
	if (Array.isArray(value)) return value.length === 0;
	if (typeof value === 'object') {
		return Object.values(value).every((entry) => entry === undefined || entry === '');
	}
	return false;
}

export function cleanFiltersInputValues(values: FiltersInputValues): FiltersInputValues {
	const nextValues: FiltersInputValues = {};

	for (const [id, value] of Object.entries(values)) {
		if (!isEmptyFiltersInputValue(value)) {
			nextValues[id] = value;
		}
	}

	return nextValues;
}

export function countActiveFiltersInputValues(values: FiltersInputValues) {
	return Object.values(values).filter((value) => !isEmptyFiltersInputValue(value)).length;
}
