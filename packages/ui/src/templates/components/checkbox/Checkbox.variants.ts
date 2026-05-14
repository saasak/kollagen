import { tv } from 'tailwind-variants';

export const checkboxVariants = tv({
	slots: {
		root: 'relative inline-flex cursor-pointer items-center gap-2 select-none',
		control:
			'rounded-kl-selector bg-kl-base-100 data-[state=checked]:bg-kl-primary data-[state=indeterminate]:bg-kl-primary data-[state=checked]:[--kl-check-border:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))] data-[state=indeterminate]:[--kl-check-border:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))] data-[focus]:[--kl-check-border:var(--kl-primary)] data-[focus]:outline-kl-primary flex size-kl-selector-md shrink-0 items-center justify-center border p-0 text-[0] leading-none transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-check-border:var(--kl-base-300)] [border-color:var(--kl-check-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-check-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] data-[focus]:outline [&_svg]:block',
		icon: 'text-kl-primary-content absolute inset-0 transition-opacity duration-100',
		label: 'text-kl-base-content text-sm'
	},
	variants: {
		disabled: {
			true: {
				root: 'cursor-not-allowed opacity-50',
				label: 'text-kl-muted-content'
			}
		},
		visible: {
			true: {
				icon: 'opacity-100'
			},
			false: {
				icon: 'opacity-0'
			}
		}
	}
});
