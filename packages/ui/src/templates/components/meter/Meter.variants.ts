import { tv, type VariantProps } from 'tailwind-variants';

export const meterIndicatorVariants = tv({
	base: 'rounded-kl-selector h-full transition-all duration-300',
	variants: {
		tone: {
			error: 'bg-kl-error',
			warning: 'bg-kl-warning',
			success: 'bg-kl-success'
		}
	},
	defaultVariants: {
		tone: 'success'
	}
});

export type MeterIndicatorVariants = VariantProps<typeof meterIndicatorVariants>;
export type MeterTone = NonNullable<MeterIndicatorVariants['tone']>;
