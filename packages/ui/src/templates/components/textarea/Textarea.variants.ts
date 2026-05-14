import { tv } from 'tailwind-variants';

export const textareaVariants = tv({
	base: 'rounded-kl-field bg-kl-base-100 text-kl-base-content placeholder:text-kl-muted-content min-h-24 w-full resize-y border [border-color:var(--kl-input-border)] px-3 py-2 text-sm [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-input-border)_calc(var(--kl-depth)*35%),#0000)_inset,0_-1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset] transition-[color,background-color,border-color,box-shadow,outline-color] duration-150 outline-none [--kl-input-border:var(--kl-base-300)] focus:outline focus:outline-[var(--kl-input-border)] focus:[--kl-input-border:var(--kl-primary)] disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:[--kl-input-border:var(--kl-error)]'
});
