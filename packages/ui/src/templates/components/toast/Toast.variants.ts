import { tv, type VariantProps } from 'tailwind-variants';

export const toastVariants = tv({
	slots: {
		toast:
			'rounded-kl-box shadow-kl-lg flex w-[var(--width)] items-center gap-2 border p-4 text-sm outline-none [--kl-toast-bg:var(--kl-base-100)] [--kl-toast-border:var(--kl-base-300)] [--kl-toast-color:var(--kl-base-content)] [--kl-toast-content:var(--kl-base-100)] [--kl-toast-fg:var(--kl-base-content)] [--kl-toast-icon:var(--kl-muted-content)] [background-color:var(--kl-toast-bg)] [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [border-color:var(--kl-toast-border)] text-[var(--kl-toast-fg)] focus-visible:outline focus-visible:outline-[var(--kl-toast-color)]',
		content: 'grid min-w-0 flex-1 gap-0.5',
		icon: 'text-[var(--kl-toast-icon)] -ms-0.5 flex size-4 shrink-0 items-center justify-center [&_svg]:size-4',
		title: 'text-[var(--kl-toast-fg)] font-medium leading-snug',
		description: 'text-[var(--kl-toast-fg)] leading-relaxed opacity-75',
		actionButton:
			'rounded-kl-field bg-kl-primary text-kl-primary-content ms-auto inline-flex h-kl-field-sm shrink-0 items-center justify-center px-3 text-xs font-medium outline-none transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-[var(--kl-primary)]',
		cancelButton:
			'rounded-kl-field bg-kl-muted text-kl-muted-content ms-auto inline-flex h-kl-field-sm shrink-0 items-center justify-center px-3 text-xs font-medium outline-none transition-colors hover:bg-kl-base-200 focus-visible:outline focus-visible:outline-[var(--kl-primary)]',
		closeButton:
			'bg-kl-base-100 text-kl-muted-content absolute top-0 flex size-5 items-center justify-center rounded-full border transition-colors [border-color:var(--kl-toast-border)] [left:var(--toast-close-button-start)] [right:var(--toast-close-button-end)] [transform:var(--toast-close-button-transform)] hover:bg-kl-base-200 hover:text-[var(--kl-toast-icon)] focus-visible:outline focus-visible:outline-[var(--kl-toast-color)] data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50 [&_svg]:size-3',
		success: '',
		error: '',
		info: '',
		warning: ''
	},
	variants: {
		variant: {
			solid: {
				toast:
					'[--kl-toast-bg:var(--kl-toast-color)] [--kl-toast-border:color-mix(in_oklab,var(--kl-toast-color),#000_calc(var(--kl-depth)*5%))] [--kl-toast-fg:var(--kl-toast-content)] [--kl-toast-icon:var(--kl-toast-content)]'
			},
			outline: {
				toast:
					'[--kl-toast-bg:var(--kl-base-100)] [--kl-toast-border:var(--kl-toast-color)] [--kl-toast-fg:var(--kl-base-content)] [--kl-toast-icon:var(--kl-toast-color)]'
			},
			dash: {
				toast:
					'border-dashed [--kl-toast-bg:var(--kl-base-100)] [--kl-toast-border:var(--kl-toast-color)] [--kl-toast-fg:var(--kl-base-content)] [--kl-toast-icon:var(--kl-toast-color)]'
			},
			soft: {
				toast:
					'[--kl-toast-bg:color-mix(in_oklab,var(--kl-toast-color)_10%,var(--kl-base-100))] [--kl-toast-border:color-mix(in_oklab,var(--kl-toast-color)_24%,var(--kl-base-100))] [--kl-toast-fg:var(--kl-base-content)] [--kl-toast-icon:var(--kl-toast-color)]'
			},
			ghost: {
				toast:
					'[--kl-toast-bg:var(--kl-base-100)] [--kl-toast-border:#0000] [--kl-toast-fg:var(--kl-base-content)] [--kl-toast-icon:var(--kl-toast-color)]'
			}
		},
		richColors: {
			true: {
				success:
					'[--kl-toast-color:var(--kl-success)] [--kl-toast-content:var(--kl-success-content)]',
				error: '[--kl-toast-color:var(--kl-error)] [--kl-toast-content:var(--kl-error-content)]',
				info: '[--kl-toast-color:var(--kl-info)] [--kl-toast-content:var(--kl-info-content)]',
				warning:
					'[--kl-toast-color:var(--kl-warning)] [--kl-toast-content:var(--kl-warning-content)]'
			}
		}
	},
	defaultVariants: {
		variant: 'soft',
		richColors: true
	}
});

export type ToastVariants = VariantProps<typeof toastVariants>;
export type ToastVariant = NonNullable<ToastVariants['variant']>;
