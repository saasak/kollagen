import { tv } from 'tailwind-variants';

export const buttonGroupSeparatorVariants = tv({
	base: 'bg-kl-base-300 relative self-stretch',
	variants: {
		orientation: {
			horizontal: 'mx-1 h-px w-auto',
			vertical: 'my-1 w-px'
		}
	},
	defaultVariants: {
		orientation: 'vertical'
	}
});
