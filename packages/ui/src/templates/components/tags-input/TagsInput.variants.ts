import { tv } from 'tailwind-variants';

export const tagsInputVariants = tv({
	slots: {
		fieldShell:
			'rounded-kl-field bg-kl-base-100 flex min-h-kl-field-md flex-wrap items-center gap-1.5 border px-3 py-1.5 transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]',
		tag: 'rounded-kl-selector bg-kl-base-200 text-kl-base-content inline-flex items-center gap-1 px-2 py-0.5 text-sm',
		tagButton:
			'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content inline-flex cursor-pointer items-center justify-center p-0.5 transition-colors duration-150',
		input:
			'text-kl-base-content placeholder:text-kl-muted-content min-w-[4rem] flex-1 border-none bg-transparent text-sm outline-none',
		clear:
			'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center p-1 transition-colors duration-150'
	},
	variants: {
		disabled: {
			true: {
				fieldShell: 'cursor-not-allowed opacity-50'
			}
		},
		highlighted: {
			true: {
				tag: 'ring-kl-primary ring-2'
			}
		}
	}
});
