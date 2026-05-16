import { tv, type VariantProps } from 'tailwind-variants';

export const menubarVariants = tv({
	slots: {
		root: 'inline-flex w-fit items-stretch',
		content:
			'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-40 border p-1 outline-none',
		item: 'flex cursor-pointer items-center rounded-kl-selector px-3 py-2 text-sm text-kl-base-content transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-kl-base-200'
	},
	variants: {
		orientation: {
			horizontal: {
				root: 'flex-row'
			},
			vertical: {
				root: 'flex-col'
			}
		}
	},
	compoundVariants: [
		{
			orientation: 'horizontal',
			class: {
				root: '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none'
			}
		},
		{
			orientation: 'vertical',
			class: {
				root: '[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none'
			}
		}
	],
	defaultVariants: {
		orientation: 'horizontal'
	}
});

export type MenubarVariants = VariantProps<typeof menubarVariants>;
export type MenubarOrientation = NonNullable<MenubarVariants['orientation']>;
