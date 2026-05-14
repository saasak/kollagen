import { tv, type VariantProps } from 'tailwind-variants';

export const inputVariants = tv({
	base: 'rounded-kl-field bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content w-full border [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 outline-none [--kl-input-border:var(--kl-base-300)] focus:outline focus:outline-[var(--kl-input-border)] focus:[--kl-input-border:var(--kl-primary)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:[--kl-input-border:var(--kl-error)]',
	variants: {
		size: {
			sm: 'h-kl-field-sm px-2.5 text-sm',
			md: 'h-kl-field-md px-3 text-sm',
			lg: 'h-kl-field-lg px-4 text-base'
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

export type InputVariants = VariantProps<typeof inputVariants>;
export type InputSize = NonNullable<InputVariants['size']>;
