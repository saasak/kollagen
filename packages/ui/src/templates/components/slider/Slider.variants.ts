import { tv, type VariantProps } from 'tailwind-variants';

export const sliderVariants = tv({
	slots: {
		outer: 'flex gap-2',
		root: '[--kl-slider-radius:min(9999px,calc(var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)+var(--kl-radius-selector)))]',
		markerContainer: '',
		track:
			'relative overflow-hidden rounded-[var(--kl-slider-radius)] bg-kl-base-300 [box-shadow:inset_0_1px_2px_color-mix(in_oklab,#000_calc(var(--kl-depth)*14%),#0000),0_1px_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))]',
		range:
			'absolute bg-[var(--kl-slider-fill)] [background-image:none,var(--kl-fx-noise)] [background-size:auto,calc(var(--kl-noise)*100%)] [border-color:color-mix(in_oklab,var(--kl-slider-fill),#000_calc(var(--kl-depth)*5%))] [box-shadow:0_1px_0_0_oklch(100%_0_0/calc(var(--kl-depth)*8%))_inset]',
		thumb:
			'box-border size-kl-selector-md rounded-[var(--kl-slider-radius)] border-[calc(var(--kl-size-selector)*1.25)] bg-kl-base-100 transition-[border-color,box-shadow,transform] outline-none [border-color:color-mix(in_oklab,var(--kl-slider-fill),#000_calc(var(--kl-depth)*5%))] [box-shadow:0_1px_2px_0_color-mix(in_oklab,#000_calc(var(--kl-depth)*20%),#0000),0_0_0_1px_oklch(100%_0_0/calc(var(--kl-depth)*35%))_inset] hover:[box-shadow:0_4px_8px_-4px_color-mix(in_oklab,#000_calc(var(--kl-depth)*32%),#0000),0_0_0_1px_oklch(100%_0_0/calc(var(--kl-depth)*35%))_inset] active:scale-95 focus-visible:outline focus-visible:outline-[var(--kl-slider-fill)]',
		markerTick: 'rounded-[var(--kl-slider-radius)] bg-kl-base-300',
		activeMarkerTick: 'bg-[var(--kl-slider-fill)]'
	},
	variants: {
		color: {
			neutral: {
				root: '[--kl-slider-fill:var(--kl-neutral)]',
				markerContainer: '[--kl-slider-fill:var(--kl-neutral)]'
			},
			primary: {
				root: '[--kl-slider-fill:var(--kl-primary)]',
				markerContainer: '[--kl-slider-fill:var(--kl-primary)]'
			},
			secondary: {
				root: '[--kl-slider-fill:var(--kl-secondary)]',
				markerContainer: '[--kl-slider-fill:var(--kl-secondary)]'
			},
			accent: {
				root: '[--kl-slider-fill:var(--kl-accent)]',
				markerContainer: '[--kl-slider-fill:var(--kl-accent)]'
			},
			info: {
				root: '[--kl-slider-fill:var(--kl-info)]',
				markerContainer: '[--kl-slider-fill:var(--kl-info)]'
			},
			success: {
				root: '[--kl-slider-fill:var(--kl-success)]',
				markerContainer: '[--kl-slider-fill:var(--kl-success)]'
			},
			warning: {
				root: '[--kl-slider-fill:var(--kl-warning)]',
				markerContainer: '[--kl-slider-fill:var(--kl-warning)]'
			},
			error: {
				root: '[--kl-slider-fill:var(--kl-error)]',
				markerContainer: '[--kl-slider-fill:var(--kl-error)]'
			}
		},
		orientation: {
			horizontal: {
				outer: 'w-full flex-col',
				root: 'relative flex w-full items-center py-1'
			},
			vertical: {
				outer: 'flex-col items-center',
				root: 'w-kl-selector-md relative flex h-full items-center justify-center'
			}
		},
		invalid: {
			true: {
				root: '[--kl-slider-fill:var(--kl-error)]',
				markerContainer: '[--kl-slider-fill:var(--kl-error)]'
			}
		},
		disabled: {
			true: {
				root: '[--kl-slider-fill:var(--kl-muted-content)]',
				track: 'opacity-50',
				thumb: 'cursor-not-allowed opacity-80'
			}
		}
	},
	defaultVariants: {
		color: 'neutral',
		orientation: 'horizontal'
	}
});

export type SliderVariants = VariantProps<typeof sliderVariants>;
export type SliderColor = NonNullable<SliderVariants['color']>;
