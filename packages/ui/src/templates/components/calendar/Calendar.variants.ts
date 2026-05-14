import { tv } from 'tailwind-variants';

export const calendarVariants = tv({
	slots: {
		root: 'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm inline-block border p-3',
		navButton:
			'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150',
		day: 'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[disabled]:text-kl-muted-content inline-flex size-10 items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:pointer-events-none data-[today]:font-semibold data-[unavailable]:line-through'
	}
});
