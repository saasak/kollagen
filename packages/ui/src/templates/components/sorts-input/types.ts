export type SortsInputDirection = 'asc' | 'desc';

export type SortsInputRule = {
	id: string;
	direction: SortsInputDirection;
};

export type SortsInputValue = SortsInputRule[];

export type SortsInputColumn = {
	id: string;
	label: string;
	sortable?: boolean;
	disabled?: boolean;
};
