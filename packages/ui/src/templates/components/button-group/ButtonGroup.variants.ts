import { tv, type VariantProps } from 'tailwind-variants';

export const buttonGroupVariants = tv({
	base: 'inline-flex w-fit items-stretch',
	variants: {
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col'
		},
		attached: {
			true: '',
			false: 'gap-2'
		}
	},
	compoundVariants: [
		{
			orientation: 'horizontal',
			attached: true,
			class:
				'[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none'
		},
		{
			orientation: 'vertical',
			attached: true,
			class:
				'[&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none'
		}
	],
	defaultVariants: {
		orientation: 'horizontal',
		attached: true
	}
});

export type ButtonGroupVariants = VariantProps<typeof buttonGroupVariants>;
export type ButtonGroupOrientation = NonNullable<ButtonGroupVariants['orientation']>;
