import { tv } from 'tailwind-variants';

export const listBoxVariants = tv({
	slots: {
		root: 'space-y-1.5',
		label: 'text-kl-base-content block text-sm font-medium',
		content:
			'rounded-kl-box border-kl-base-300 bg-kl-base-100 max-h-72 w-full overflow-y-auto border p-1 outline-none [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)]',
		item: 'rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:text-kl-primary flex cursor-pointer items-center justify-between px-3 py-2 text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		check: 'text-kl-primary flex items-center'
	},
	variants: {
		disabled: {
			true: {
				label: 'text-kl-muted-content',
				content: 'opacity-50'
			}
		}
	}
});
