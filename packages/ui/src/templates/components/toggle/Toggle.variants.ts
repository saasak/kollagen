import { tv } from 'tailwind-variants';

export const toggleVariants = tv({
	base: 'rounded-kl-selector border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 data-[state=on]:border-kl-primary data-[state=on]:bg-kl-primary data-[state=on]:text-kl-primary-content data-[focus]:outline-kl-primary h-kl-selector-md inline-flex cursor-pointer items-center gap-1.5 border px-3 text-sm font-medium transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus]:outline'
});
