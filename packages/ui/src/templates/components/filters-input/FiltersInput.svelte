<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker } from '../date-range-picker';
	import { Popover } from '../popover';
	import { Select } from '../select';
	import { TimeField } from '../time-field';
	import { TimeRangeField } from '../time-range-field';
	import { Trigger } from '../trigger';
	import { parseDate, parseTime, type DateValue } from '@internationalized/date';
	import type { DateRange, TimeRange, TimeValue } from 'bits-ui';
	import { SlidersHorizontal, X } from 'lucide-svelte';
	import type { Snippet } from 'svelte';
	import {
		cleanFiltersInputValues,
		countActiveFiltersInputValues,
		isEmptyFiltersInputValue,
		isRangeObject
	} from './utils';
	import type {
		FiltersInputConfig,
		FiltersInputDateRangeValue,
		FiltersInputNumberRangeValue,
		FiltersInputTimeGranularity,
		FiltersInputTimeRangeValue,
		FiltersInputValue,
		FiltersInputValues
	} from './types';

	interface Props {
		filters: FiltersInputConfig[];
		value?: FiltersInputValues;
		onUpdate?: (value: FiltersInputValues) => void;
		name?: string;
		form?: string;
		title?: string;
		clearLabel?: string;
		activeCount?: number;
		side?: 'top' | 'right' | 'bottom' | 'left';
		align?: 'start' | 'center' | 'end';
		children?: Snippet<[{ activeCount: number }]>;
		class?: string;
	}

	let {
		filters,
		value = $bindable({}),
		onUpdate,
		name = 'filters',
		form,
		title = 'Filters',
		clearLabel = 'Clear filters',
		activeCount,
		side = 'bottom',
		align = 'start',
		children,
		class: className
	}: Props = $props();

	const resolvedActiveCount = $derived(activeCount ?? countActiveFiltersInputValues(value));
	const serializedValue = $derived(JSON.stringify(cleanFiltersInputValues(value)));

	function emitValue(nextValue: FiltersInputValues) {
		const cleanedValue = cleanFiltersInputValues(nextValue);
		value = cleanedValue;
		onUpdate?.(cleanedValue);
	}

	function updateFilter(id: string, nextValue: FiltersInputValue) {
		const nextValues = { ...value };
		if (isEmptyFiltersInputValue(nextValue)) {
			delete nextValues[id];
		} else {
			nextValues[id] = nextValue;
		}
		emitValue(nextValues);
	}

	function getStringFilterValue(id: string) {
		const filterValue = value[id];
		return typeof filterValue === 'string' ? filterValue : '';
	}

	function getStringArrayFilterValue(id: string) {
		const filterValue = value[id];
		return Array.isArray(filterValue) ? filterValue : [];
	}

	function getDateRangeFilterValue(id: string): FiltersInputDateRangeValue {
		const filterValue = value[id];
		if (!isRangeObject(filterValue)) return {};
		const range = filterValue as FiltersInputDateRangeValue;
		return {
			from: typeof range.from === 'string' ? range.from : undefined,
			to: typeof range.to === 'string' ? range.to : undefined
		};
	}

	function getDateFilterValue(id: string, key: keyof FiltersInputDateRangeValue) {
		const filterValue = getDateRangeFilterValue(id)[key];
		if (!filterValue) return undefined;

		try {
			return parseDate(filterValue);
		} catch {
			return undefined;
		}
	}

	function getDateRangePickerValue(id: string): DateRange {
		return {
			start: getDateFilterValue(id, 'from'),
			end: getDateFilterValue(id, 'to')
		};
	}

	function formatDateFilterValue(filterValue: DateValue | undefined) {
		if (!filterValue) return undefined;
		const month = String(filterValue.month).padStart(2, '0');
		const day = String(filterValue.day).padStart(2, '0');
		return `${filterValue.year}-${month}-${day}`;
	}

	function updateDateRangeFilter(id: string, nextValue: DateRange | undefined) {
		updateFilter(id, {
			from: formatDateFilterValue(nextValue?.start),
			to: formatDateFilterValue(nextValue?.end)
		});
	}

	function getNumberRangeFilterValue(id: string): FiltersInputNumberRangeValue {
		const filterValue = value[id];
		if (!isRangeObject(filterValue)) return {};
		const range = filterValue as FiltersInputNumberRangeValue;
		return {
			min: typeof range.min === 'number' ? range.min : undefined,
			max: typeof range.max === 'number' ? range.max : undefined
		};
	}

	function getBooleanFilterValue(id: string) {
		const filterValue = value[id];
		if (typeof filterValue !== 'boolean') return '';
		return filterValue ? 'true' : 'false';
	}

	function updateBooleanFilter(id: string, nextValue: string | string[]) {
		if (Array.isArray(nextValue) || nextValue === '') {
			updateFilter(id, null);
			return;
		}
		updateFilter(id, nextValue === 'true');
	}

	function getTimeFilterValue(id: string): TimeValue | undefined {
		const filterValue = value[id];
		if (typeof filterValue !== 'string' || !filterValue) return undefined;

		try {
			return parseTime(filterValue);
		} catch {
			return undefined;
		}
	}

	function formatTimeFilterValue(
		filterValue: TimeValue | undefined,
		granularity: FiltersInputTimeGranularity = 'minute'
	) {
		if (!filterValue) return undefined;
		const hour = String(filterValue.hour).padStart(2, '0');
		const minute = String(filterValue.minute).padStart(2, '0');
		if (granularity === 'second') {
			const second = String(filterValue.second).padStart(2, '0');
			return `${hour}:${minute}:${second}`;
		}
		return `${hour}:${minute}`;
	}

	function updateTimeFilter(
		id: string,
		nextValue: TimeValue | undefined,
		granularity: FiltersInputTimeGranularity = 'minute'
	) {
		updateFilter(id, formatTimeFilterValue(nextValue, granularity) ?? null);
	}

	function getTimeRangeFilterValue(id: string): FiltersInputTimeRangeValue {
		const filterValue = value[id];
		if (!isRangeObject(filterValue)) return {};
		const range = filterValue as FiltersInputTimeRangeValue;
		return {
			from: typeof range.from === 'string' ? range.from : undefined,
			to: typeof range.to === 'string' ? range.to : undefined
		};
	}

	function getTimeRangeFieldValue(id: string): TimeRange {
		const range = getTimeRangeFilterValue(id);
		return {
			start: parseTimeFilterValue(range.from),
			end: parseTimeFilterValue(range.to)
		};
	}

	function parseTimeFilterValue(filterValue: string | undefined) {
		if (!filterValue) return undefined;
		try {
			return parseTime(filterValue);
		} catch {
			return undefined;
		}
	}

	function updateTimeRangeFilter(
		id: string,
		nextValue: TimeRange | undefined,
		granularity: FiltersInputTimeGranularity = 'minute'
	) {
		updateFilter(id, {
			from: formatTimeFilterValue(nextValue?.start, granularity),
			to: formatTimeFilterValue(nextValue?.end, granularity)
		});
	}
</script>

<input type="hidden" {name} {form} value={serializedValue} />

<Popover {title} {side} {align} class={cn('w-[min(28rem,calc(100vw-2rem))]', className)}>
	{#if children}
		{@render children({ activeCount: resolvedActiveCount })}
	{:else}
		<Trigger variant="outline" class="relative">
			<SlidersHorizontal size={16} />
			<span>{title}</span>
			{#if resolvedActiveCount > 0}
				<span
					class="bg-kl-primary text-kl-primary-content rounded-kl-selector h-kl-selector-sm min-w-kl-selector-sm inline-flex items-center justify-center px-1.5 text-xs font-semibold"
				>
					{resolvedActiveCount}
				</span>
			{/if}
		</Trigger>
	{/if}

	{#snippet body()}
		<div class="space-y-4">
			<div class="grid gap-3">
				{#each filters as filter (filter.id)}
					<div class="space-y-1.5">
						<span class="text-kl-muted-content block text-xs font-medium">
							{filter.label}
						</span>

						{#if filter.type === 'select'}
							<Select
								items={[{ label: filter.placeholder ?? 'Any', value: '' }, ...filter.values]}
								value={getStringFilterValue(filter.id)}
								allowDeselect
								onValueChange={(nextValue) => updateFilter(filter.id, nextValue)}
							/>
						{:else if filter.type === 'multi-select'}
							<Select
								items={filter.values}
								multiple
								value={getStringArrayFilterValue(filter.id)}
								placeholder={filter.placeholder ?? 'Any'}
								onValueChange={(nextValue) => updateFilter(filter.id, nextValue)}
							/>
						{:else if filter.type === 'boolean'}
							<Select
								items={[
									{ label: filter.placeholder ?? 'Any', value: '' },
									{ label: filter.trueLabel ?? 'True', value: 'true' },
									{ label: filter.falseLabel ?? 'False', value: 'false' }
								]}
								value={getBooleanFilterValue(filter.id)}
								allowDeselect
								onValueChange={(nextValue) => updateBooleanFilter(filter.id, nextValue)}
							/>
						{:else if filter.type === 'text'}
							<input
								type="text"
								aria-label={filter.label}
								value={getStringFilterValue(filter.id)}
								placeholder={filter.placeholder ?? filter.label}
								oninput={(event) => updateFilter(filter.id, event.currentTarget.value)}
								class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md w-full border px-3 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
							/>
						{:else if filter.type === 'date-range'}
							<DateRangePicker
								ariaLabel={filter.label}
								value={getDateRangePickerValue(filter.id)}
								numberOfMonths={filter.numberOfMonths ?? 2}
								weekStartsOn={filter.weekStartsOn}
								locale={filter.locale ?? 'en'}
								onValueChange={(nextValue) => updateDateRangeFilter(filter.id, nextValue)}
							/>
						{:else if filter.type === 'number-range'}
							<div class="grid grid-cols-2 gap-2">
								<input
									type="number"
									aria-label="{filter.label} minimum"
									value={getNumberRangeFilterValue(filter.id).min ?? ''}
									placeholder="Min"
									oninput={(event) =>
										updateFilter(filter.id, {
											...getNumberRangeFilterValue(filter.id),
											min:
												event.currentTarget.value === ''
													? undefined
													: Number(event.currentTarget.value)
										})}
									class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md min-w-0 border px-2 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
								/>
								<input
									type="number"
									aria-label="{filter.label} maximum"
									value={getNumberRangeFilterValue(filter.id).max ?? ''}
									placeholder="Max"
									oninput={(event) =>
										updateFilter(filter.id, {
											...getNumberRangeFilterValue(filter.id),
											max:
												event.currentTarget.value === ''
													? undefined
													: Number(event.currentTarget.value)
										})}
									class="border-kl-base-300 bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content focus:border-kl-primary focus:outline-kl-primary rounded-kl-field h-kl-field-md min-w-0 border px-2 text-sm transition-colors duration-[var(--kl-transition-fast)] outline-none focus:outline"
								/>
							</div>
						{:else if filter.type === 'time'}
							<TimeField
								ariaLabel={filter.label}
								value={getTimeFilterValue(filter.id)}
								placeholder={filter.placeholder}
								hourCycle={filter.hourCycle}
								granularity={filter.granularity ?? 'minute'}
								locale={filter.locale ?? 'en'}
								onValueChange={(nextValue) =>
									updateTimeFilter(filter.id, nextValue, filter.granularity ?? 'minute')}
							/>
						{:else if filter.type === 'time-range'}
							<TimeRangeField
								value={getTimeRangeFieldValue(filter.id)}
								placeholder={filter.placeholder}
								hourCycle={filter.hourCycle}
								granularity={filter.granularity ?? 'minute'}
								locale={filter.locale ?? 'en'}
								onValueChange={(nextValue) =>
									updateTimeRangeFilter(filter.id, nextValue, filter.granularity ?? 'minute')}
							/>
						{/if}
					</div>
				{/each}
			</div>

			<div class="border-kl-base-300 flex justify-end border-t pt-3">
				<button
					type="button"
					disabled={resolvedActiveCount === 0}
					onclick={() => emitValue({})}
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-sm inline-flex cursor-pointer items-center gap-2 border px-3 text-sm font-medium transition-colors duration-[var(--kl-transition-fast)] disabled:cursor-not-allowed disabled:opacity-50"
				>
					<X size={16} />
					{clearLabel}
				</button>
			</div>
		</div>
	{/snippet}
</Popover>
