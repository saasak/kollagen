import { tv, type VariantProps } from 'tailwind-variants';

export const toolbarVariants = tv({
	base: 'inline-flex w-fit items-stretch gap-1',
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

export type ToolbarVariants = VariantProps<typeof toolbarVariants>;
export type ToolbarOrientation = NonNullable<ToolbarVariants['orientation']>;
