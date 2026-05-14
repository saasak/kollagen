import { tv } from 'tailwind-variants';

export const contextMenuVariants = tv({
	slots: {
		item: 'flex cursor-pointer items-center rounded-kl-selector px-3 py-2 text-sm text-kl-base-content transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[highlighted]:bg-kl-base-200',
		content:
			'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-40 border p-1 outline-none'
	}
});
