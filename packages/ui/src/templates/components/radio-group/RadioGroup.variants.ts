import { tv } from 'tailwind-variants';

export const radioGroupVariants = tv({
	slots: {
		root: 'flex',
		item: 'bg-kl-base-100 hover:[--kl-radio-border:var(--kl-muted-content)] data-[state=checked]:[--kl-radio-border:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))] size-kl-selector-md shrink-0 cursor-default rounded-full border-[calc(var(--kl-size-selector)*0.5)] transition-[color,background-color,border-color,box-shadow] duration-100 ease-in-out [--kl-radio-border:var(--kl-base-300)] [border-color:var(--kl-radio-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-radio-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:border-[calc(var(--kl-size-selector)*1.25)]'
	},
	variants: {
		orientation: {
			horizontal: {
				root: 'flex-row gap-4'
			},
			vertical: {
				root: 'flex-col gap-2'
			}
		}
	},
	defaultVariants: {
		orientation: 'vertical'
	}
});
