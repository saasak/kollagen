import { tv, type VariantProps } from 'tailwind-variants';

export const drawerContentVariants = tv({
	base: 'border-kl-base-300 bg-kl-base-100 shadow-kl-lg z-[var(--kl-z-modal)]',
	variants: {
		direction: {
			bottom:
				'fixed inset-x-0 bottom-0 flex h-full w-full max-h-[85dvh] flex-col rounded-t-kl-box border-t border-x',
			top: 'fixed inset-x-0 top-0 flex h-full w-full max-h-[85dvh] flex-col rounded-b-kl-box border-b border-x',
			left: 'fixed inset-y-0 left-0 h-full w-full max-w-sm rounded-r-kl-box border-r border-y',
			right: 'fixed inset-y-0 right-0 h-full w-full max-w-sm rounded-l-kl-box border-l border-y'
		}
	},
	defaultVariants: {
		direction: 'bottom'
	}
});

export type DrawerContentVariants = VariantProps<typeof drawerContentVariants>;
export type DrawerDirection = NonNullable<DrawerContentVariants['direction']>;
