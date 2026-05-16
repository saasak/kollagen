import { tv } from 'tailwind-variants';

export const toggleGroupVariants = tv({
	base: 'inline-flex w-fit items-stretch',
	variants: {
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col'
		}
	},
	compoundVariants: [
		{
			orientation: 'horizontal',
			class: '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none'
		},
		{
			orientation: 'vertical',
			class: '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none'
		}
	],
	defaultVariants: {
		orientation: 'horizontal'
	}
});
