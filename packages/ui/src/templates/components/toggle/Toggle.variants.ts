import { tv, type VariantProps } from 'tailwind-variants';

export const toggleVariants = tv({
	base: 'data-[state=on]:[--kl-btn-bg:var(--kl-toggle-bg)] data-[state=on]:[--kl-btn-border:color-mix(in_oklab,var(--kl-toggle-bg),#000_calc(var(--kl-depth)*5%))] data-[state=on]:[--kl-btn-fg:var(--kl-toggle-fg)] data-[state=on]:[--kl-btn-noise:var(--kl-fx-noise)] data-[state=on]:hover:[--kl-btn-bg:color-mix(in_oklab,var(--kl-toggle-bg),#000_7%)] data-[state=on]:active:[--kl-btn-bg:color-mix(in_oklab,var(--kl-toggle-bg),#000_5%)] data-[focus]:outline data-[focus]:outline-[var(--kl-btn-color,var(--kl-primary))]',
	variants: {
		color: {
			base: '[--kl-toggle-bg:var(--kl-primary)] [--kl-toggle-fg:var(--kl-primary-content)]',
			neutral: '[--kl-toggle-bg:var(--kl-neutral)] [--kl-toggle-fg:var(--kl-neutral-content)]',
			primary: '[--kl-toggle-bg:var(--kl-primary)] [--kl-toggle-fg:var(--kl-primary-content)]',
			secondary:
				'[--kl-toggle-bg:var(--kl-secondary)] [--kl-toggle-fg:var(--kl-secondary-content)]',
			accent: '[--kl-toggle-bg:var(--kl-accent)] [--kl-toggle-fg:var(--kl-accent-content)]',
			info: '[--kl-toggle-bg:var(--kl-info)] [--kl-toggle-fg:var(--kl-info-content)]',
			success: '[--kl-toggle-bg:var(--kl-success)] [--kl-toggle-fg:var(--kl-success-content)]',
			warning: '[--kl-toggle-bg:var(--kl-warning)] [--kl-toggle-fg:var(--kl-warning-content)]',
			error: '[--kl-toggle-bg:var(--kl-error)] [--kl-toggle-fg:var(--kl-error-content)]'
		}
	},
	defaultVariants: {
		color: 'base'
	}
});

export type ToggleVariants = VariantProps<typeof toggleVariants>;
