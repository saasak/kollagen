import { tv, type VariantProps } from 'tailwind-variants';

export const avatarVariants = tv({
	base: 'rounded-kl-selector bg-kl-base-200 text-kl-muted-content relative inline-flex shrink-0 items-center justify-center overflow-hidden',
	variants: {
		size: {
			xs: 'size-6 text-xs',
			sm: 'size-8 text-sm',
			md: 'size-10 text-sm',
			lg: 'size-14 text-base',
			xl: 'size-20 text-lg'
		},
		disabled: {
			true: 'opacity-50'
		}
	},
	defaultVariants: {
		size: 'md'
	}
});

export type AvatarVariants = VariantProps<typeof avatarVariants>;
export type AvatarSize = NonNullable<AvatarVariants['size']>;
