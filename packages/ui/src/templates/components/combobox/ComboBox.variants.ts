import { tv } from 'tailwind-variants';

export const comboBoxVariants = tv({
	slots: {
		fieldShell:
			'rounded-kl-field bg-kl-base-100 flex items-center border transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 [--kl-input-border:var(--kl-base-300)] [border-color:var(--kl-input-border)] [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] focus-within:[--kl-input-border:var(--kl-primary)] focus-within:outline focus-within:outline-[var(--kl-input-border)]',
		input:
			'text-kl-base-content placeholder:text-kl-muted-content min-w-0 flex-1 border-none bg-transparent px-3 py-2 text-sm outline-none',
		iconButton:
			'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150',
		content:
			'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] max-h-60 w-[var(--bits-floating-anchor-width)] overflow-y-auto border p-1 [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)]',
		item: 'rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:text-kl-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150'
	}
});
