import { tv } from 'tailwind-variants';

export const switchVariants = tv({
	slots: {
		root: 'inline-flex cursor-pointer items-center gap-2 select-none',
		control:
			'bg-kl-base-300 data-[state=checked]:bg-kl-primary inline-flex h-kl-selector-md w-[var(--kl-switch-track)] shrink-0 items-center rounded-[var(--kl-switch-radius)] border p-[var(--kl-switch-padding)] transition-[color,background-color,border-color,box-shadow] duration-150 outline-none [--kl-switch-padding:calc(var(--kl-size-selector)*0.5)] [--kl-switch-radius:min(9999px,calc(var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)))] [--kl-switch-thumb:calc(var(--kl-size-selector)*5)] [--kl-switch-track:calc(var(--kl-size-selector)*11)] [border-color:color-mix(in_oklab,var(--kl-base-content)_calc(var(--kl-depth)*12%),#0000)] [box-shadow:inset_0_1px_1px_color-mix(in_oklab,#000_calc(var(--kl-depth)*12%),#0000)] data-[state=checked]:[border-color:color-mix(in_oklab,var(--kl-primary),#000_calc(var(--kl-depth)*5%))]',
		thumb:
			'bg-kl-base-100 pointer-events-none block size-[var(--kl-switch-thumb)] rounded-[var(--kl-switch-radius)] transition-transform duration-150 [box-shadow:0_1px_2px_0_color-mix(in_oklab,#000_calc(var(--kl-depth)*22%),#0000),0_0_0_1px_oklch(100%_0_0/calc(var(--kl-depth)*35%))_inset] data-[state=checked]:translate-x-[calc(var(--kl-switch-track)-var(--kl-switch-thumb)-var(--kl-switch-padding)*2-var(--kl-border-width)*2)] data-[state=unchecked]:translate-x-0',
		label: 'text-kl-base-content text-sm'
	},
	variants: {
		disabled: {
			true: {
				root: 'cursor-not-allowed opacity-50',
				label: 'text-kl-muted-content'
			}
		}
	}
});
