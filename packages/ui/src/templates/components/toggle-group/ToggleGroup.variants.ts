import { tv } from 'tailwind-variants';

export const toggleGroupVariants = tv({
	slots: {
		root: 'rounded-kl-field border-kl-base-300 bg-kl-base-100 inline-flex items-center gap-1 border p-1',
		item: 'rounded-kl-selector text-kl-base-content data-[state=on]:bg-kl-primary data-[state=on]:text-kl-primary-content hover:bg-kl-base-200 h-kl-field-sm cursor-pointer px-3 text-sm font-medium outline-none transition-colors data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50'
	},
	variants: {
		orientation: {
			horizontal: {},
			vertical: {
				root: 'flex-col'
			}
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});
