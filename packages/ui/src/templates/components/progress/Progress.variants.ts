import { tv, type VariantProps } from 'tailwind-variants';

export const progressIndicatorVariants = tv({
	base: 'rounded-kl-selector h-full transition-all duration-300',
	variants: {
		color: {
			primary: 'bg-kl-primary',
			secondary: 'bg-kl-secondary',
			accent: 'bg-kl-accent',
			info: 'bg-kl-info',
			success: 'bg-kl-success',
			warning: 'bg-kl-warning',
			error: 'bg-kl-error'
		},
		indeterminate: {
			true: 'w-1/3 animate-pulse'
		}
	},
	defaultVariants: {
		color: 'primary'
	}
});

export type ProgressIndicatorVariants = VariantProps<typeof progressIndicatorVariants>;
export type ProgressColor = NonNullable<ProgressIndicatorVariants['color']>;
