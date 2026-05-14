import { tv } from 'tailwind-variants';

export const numberInputVariants = tv({
	slots: {
		fieldShell:
			'rounded-kl-field bg-kl-base-100 flex h-kl-field-md border transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset]',
		input:
			'text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 bg-transparent px-3 text-sm outline-none',
		stepperButton:
			'text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex h-1/2 items-center justify-center px-2 transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50'
	},
	variants: {
		disabled: {
			true: {
				fieldShell: 'cursor-not-allowed opacity-50'
			}
		},
		invalid: {
			true: {
				fieldShell: '[--kl-input-border:var(--kl-error)]'
			}
		},
		focused: {
			valid: {
				fieldShell: 'outline outline-[var(--kl-input-border)] [--kl-input-border:var(--kl-primary)]'
			},
			invalid: {
				fieldShell: 'outline outline-[var(--kl-input-border)] [--kl-input-border:var(--kl-error)]'
			}
		}
	}
});
