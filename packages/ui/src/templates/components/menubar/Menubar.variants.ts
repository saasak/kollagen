import { tv } from 'tailwind-variants';

export const menubarVariants = tv({
	slots: {
		root: 'rounded-kl-field border-kl-base-300 bg-kl-base-100 h-kl-field-md inline-flex items-center gap-1 border p-1',
		trigger:
			'rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[state=open]:bg-kl-base-200 h-full cursor-pointer px-3 text-sm font-medium transition-colors outline-none',
		content:
			'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-40 border p-1 outline-none',
		item: 'flex cursor-pointer items-center rounded-kl-selector px-3 py-2 text-sm text-kl-base-content transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-kl-base-200'
	}
});
