import { tv } from 'tailwind-variants';

export const toolbarVariants = tv({
	base: 'rounded-kl-field border-kl-base-300 bg-kl-base-100 inline-flex items-center gap-1 border p-1',
	variants: {
		orientation: {
			horizontal: '',
			vertical: 'flex-col'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});
