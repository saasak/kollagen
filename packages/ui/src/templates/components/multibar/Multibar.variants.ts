import { tv, type VariantProps } from 'tailwind-variants';

export const multibarVariants = tv({
	base: 'inline-flex w-fit items-start gap-2',
	variants: {
		orientation: {
			horizontal: 'flex-row',
			vertical: 'flex-col'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export type MultibarVariants = VariantProps<typeof multibarVariants>;
export type MultibarOrientation = NonNullable<MultibarVariants['orientation']>;
