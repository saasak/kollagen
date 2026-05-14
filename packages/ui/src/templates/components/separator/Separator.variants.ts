import { tv } from 'tailwind-variants';

export const separatorVariants = tv({
	base: 'bg-kl-base-300 shrink-0',
	variants: {
		orientation: {
			horizontal: 'h-px w-full',
			vertical: 'h-full w-px'
		}
	},
	defaultVariants: {
		orientation: 'horizontal'
	}
});
