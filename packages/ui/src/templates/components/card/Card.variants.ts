import { tv } from 'tailwind-variants';

export const cardVariants = tv({
	slots: {
		root: 'rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content overflow-hidden border [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [box-shadow:0_1px_2px_0_color-mix(in_oklab,#000_calc(var(--kl-depth)*8%),#0000),0_1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset]',
		footer:
			'border-kl-base-300 bg-kl-base-300 border-t px-4 py-3 [box-shadow:0_1px_0_0_color-mix(in_oklab,var(--kl-base-content)_calc(var(--kl-depth)*6%),#0000)_inset]'
	}
});
