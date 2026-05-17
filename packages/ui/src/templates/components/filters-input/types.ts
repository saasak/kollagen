import type { TimeValue } from 'bits-ui';

export type FiltersInputDateRangeValue = {
	from?: string;
	to?: string;
};

export type FiltersInputNumberRangeValue = {
	min?: number;
	max?: number;
};

export type FiltersInputTimeRangeValue = {
	from?: string;
	to?: string;
};

export type FiltersInputTimeGranularity = 'hour' | 'minute' | 'second';

export type FiltersInputValue =
	| string
	| string[]
	| boolean
	| FiltersInputDateRangeValue
	| FiltersInputNumberRangeValue
	| FiltersInputTimeRangeValue
	| null;

export type FiltersInputValues = Record<string, FiltersInputValue>;

export type FiltersInputOption = {
	label: string;
	value: string;
};

export type FiltersInputConfig =
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
			values: FiltersInputOption[];
			placeholder?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'multi-select';
			values: FiltersInputOption[];
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
			numberOfMonths?: number;
			weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
			locale?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'number-range';
	  }
	| {
			id: string;
			label: string;
			type: 'time';
			placeholder?: TimeValue;
			hourCycle?: 12 | 24;
			granularity?: FiltersInputTimeGranularity;
			locale?: string;
	  }
	| {
			id: string;
			label: string;
			type: 'time-range';
			placeholder?: TimeValue;
			hourCycle?: 12 | 24;
			granularity?: FiltersInputTimeGranularity;
			locale?: string;
	  };
