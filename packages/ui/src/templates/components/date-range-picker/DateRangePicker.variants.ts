import { tv } from 'tailwind-variants';

export const dateRangePickerVariants = tv({
	slots: {
		fieldShell:
			'rounded-kl-field bg-kl-base-100 flex h-kl-field-md items-center border px-3 transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]',
		content:
			'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] border p-3',
		iconButton:
			'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150',
		trigger:
			'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md ml-auto flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150',
		segment:
			'text-kl-base-content hover:bg-kl-base-200 focus:bg-kl-primary focus:text-kl-primary-content rounded-kl-selector px-0.5 text-sm outline-none',
		day: 'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selection-start]:bg-kl-primary data-[selection-start]:text-kl-primary-content data-[selection-end]:bg-kl-primary data-[selection-end]:text-kl-primary-content data-[highlighted]:bg-kl-primary/15 data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[disabled]:text-kl-muted-content inline-flex size-10 items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:pointer-events-none data-[today]:font-semibold data-[unavailable]:line-through'
	},
	variants: {
		disabled: {
			true: {
				fieldShell: 'cursor-not-allowed opacity-50'
			}
		}
	}
});
