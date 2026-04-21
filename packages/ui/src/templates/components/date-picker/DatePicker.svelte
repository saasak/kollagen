<script lang="ts">
	import { DatePicker, DateRangePicker } from 'bits-ui';
	import { type DateValue, type DateRange, getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	interface Props {
		/** Controlled selected date(s). Supports bind:value */
		value?: DateValue | DateValue[] | DateRange | undefined;
		/** Form field name for native submission */
		name?: string;
		/** Placeholder date for calendar navigation */
		placeholder?: DateValue;
		/** Selection mode: single date, multiple, or range */
		selectionMode?: 'single' | 'multiple' | 'range';
		/** Disable the date picker */
		disabled?: boolean;
		/** Mark as read-only */
		readOnly?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Close calendar after selection */
		closeOnSelect?: boolean;
		/** Minimum selectable date */
		minValue?: DateValue;
		/** Maximum selectable date */
		maxValue?: DateValue;
		/** Number of months to display */
		numberOfMonths?: number;
		/** First day of the week (0=Sun, 1=Mon, ..., 6=Sat) */
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		/** Function to check if a date is unavailable */
		isDateUnavailable?: (date: DateValue) => boolean;
		/** Function to check if a date is disabled */
		isDateDisabled?: (date: DateValue) => boolean;
		/** Locale for date formatting (BCP 47 tag) */
		locale?: string;
		/** Callback when selected value changes */
		onValueChange?: (value: DateValue | DateValue[] | DateRange | undefined) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		value = $bindable(),
		name,
		placeholder = today(getLocalTimeZone()),
		selectionMode = 'single',
		disabled = false,
		readOnly = false,
		required = false,
		closeOnSelect,
		minValue,
		maxValue,
		numberOfMonths,
		weekStartsOn,
		isDateUnavailable,
		isDateDisabled,
		locale = 'en',
		onValueChange,
		class: className
	}: Props = $props();

	let open = $state(false);

	function handleClear(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault();
		value = undefined;
		onValueChange?.(undefined);
	}

	const hasValue = $derived(
		selectionMode === 'range'
			? !!(value as DateRange | undefined)?.start
			: selectionMode === 'multiple'
				? Array.isArray(value) && value.length > 0
				: !!value
	);
</script>

{#if selectionMode === 'range'}
	<DateRangePicker.Root
		bind:value={value as DateRange | undefined}
		bind:open
		{name}
		{placeholder}
		{disabled}
		readonly={readOnly}
		{required}
		{minValue}
		{maxValue}
		{numberOfMonths}
		{weekStartsOn}
		{isDateUnavailable}
		{isDateDisabled}
		{locale}
		closeOnRangeSelect={closeOnSelect ?? true}
		onValueChange={onValueChange as ((value: DateRange | undefined) => void) | undefined}
	>
		<div class="relative w-full {className ?? ''}">
			<div
				class="border-kl-base-300 rounded-kl-field bg-kl-base-100 focus-within:border-kl-primary focus-within:outline-kl-primary data-[invalid]:border-kl-error flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1 {disabled
					? 'cursor-not-allowed opacity-50'
					: ''}"
			>
				<DateRangePicker.Input type="start">
					{#snippet children({ segments })}
						<div class="flex items-center px-3 py-2">
							{#each segments as { part, value: segValue } (part)}
								<DateRangePicker.Segment
									{part}
									class="text-kl-base-content data-[type=literal]:text-kl-muted-content focus:bg-kl-primary focus:text-kl-primary-content rounded-sm px-0.5 text-sm outline-none"
								>
									{segValue}
								</DateRangePicker.Segment>
							{/each}
						</div>
					{/snippet}
				</DateRangePicker.Input>
				<span class="text-kl-muted-content text-sm">–</span>
				<DateRangePicker.Input type="end">
					{#snippet children({ segments })}
						<div class="flex items-center px-3 py-2">
							{#each segments as { part, value: segValue } (part)}
								<DateRangePicker.Segment
									{part}
									class="text-kl-base-content data-[type=literal]:text-kl-muted-content focus:bg-kl-primary focus:text-kl-primary-content rounded-sm px-0.5 text-sm outline-none"
								>
									{segValue}
								</DateRangePicker.Segment>
							{/each}
						</div>
					{/snippet}
				</DateRangePicker.Input>
				<div class="flex items-center gap-0.5 pr-1.5">
					{#if hasValue}
						<button
							type="button"
							onclick={handleClear}
							{disabled}
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<X size={16} />
						</button>
					{/if}
					<DateRangePicker.Trigger
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
					>
						<Calendar size={16} />
					</DateRangePicker.Trigger>
				</div>
			</div>
		</div>

		<DateRangePicker.Content
			side="bottom"
			sideOffset={4}
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] border p-3"
		>
			<DateRangePicker.Calendar>
				{#snippet children({ months, weekdays })}
					<DateRangePicker.Header class="mb-2 flex items-center justify-between">
						<DateRangePicker.PrevButton
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<ChevronLeft size={16} />
						</DateRangePicker.PrevButton>
						<DateRangePicker.Heading class="text-kl-base-content text-sm font-medium" />
						<DateRangePicker.NextButton
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<ChevronRight size={16} />
						</DateRangePicker.NextButton>
					</DateRangePicker.Header>
					<div class="flex gap-4">
						{#each months as month, mi (mi)}
							<DateRangePicker.Grid class="w-full border-collapse">
								<DateRangePicker.GridHead>
									<DateRangePicker.GridRow>
										{#each weekdays as day, di (di)}
											<DateRangePicker.HeadCell
												class="text-kl-muted-content pb-1 text-center text-xs font-medium"
											>
												{day}
											</DateRangePicker.HeadCell>
										{/each}
									</DateRangePicker.GridRow>
								</DateRangePicker.GridHead>
								<DateRangePicker.GridBody>
									{#each month.weeks as weekDates, wi (wi)}
										<DateRangePicker.GridRow>
											{#each weekDates as date, dti (dti)}
												<DateRangePicker.Cell {date} month={month.value} class="p-0 text-center">
													<DateRangePicker.Day
														class="rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[range-middle]:bg-kl-primary/10 inline-flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[range-middle]:rounded-none data-[today]:font-semibold data-[unavailable]:line-through"
													/>
												</DateRangePicker.Cell>
											{/each}
										</DateRangePicker.GridRow>
									{/each}
								</DateRangePicker.GridBody>
							</DateRangePicker.Grid>
						{/each}
					</div>
				{/snippet}
			</DateRangePicker.Calendar>
		</DateRangePicker.Content>
	</DateRangePicker.Root>
{:else}
	<DatePicker.Root
		bind:value={value as DateValue | DateValue[] | undefined}
		bind:open
		{name}
		{placeholder}
		{disabled}
		readonly={readOnly}
		{required}
		{minValue}
		{maxValue}
		{numberOfMonths}
		{weekStartsOn}
		{isDateUnavailable}
		{isDateDisabled}
		{locale}
		closeOnDateSelect={closeOnSelect ?? selectionMode !== 'multiple'}
		onValueChange={onValueChange as
			| ((value: DateValue | DateValue[] | undefined) => void)
			| undefined}
	>
		<div class="relative w-full {className ?? ''}">
			<div
				class="border-kl-base-300 rounded-kl-field bg-kl-base-100 focus-within:border-kl-primary focus-within:outline-kl-primary data-[invalid]:border-kl-error flex items-center border transition-colors duration-150 focus-within:outline-2 focus-within:-outline-offset-1 {disabled
					? 'cursor-not-allowed opacity-50'
					: ''}"
			>
				<DatePicker.Input>
					{#snippet children({ segments })}
						<div class="flex items-center px-3 py-2">
							{#each segments as { part, value: segValue } (part)}
								<DatePicker.Segment
									{part}
									class="text-kl-base-content data-[type=literal]:text-kl-muted-content focus:bg-kl-primary focus:text-kl-primary-content rounded-sm px-0.5 text-sm outline-none"
								>
									{segValue}
								</DatePicker.Segment>
							{/each}
						</div>
					{/snippet}
				</DatePicker.Input>
				<div class="flex items-center gap-0.5 pr-1.5">
					{#if hasValue}
						<button
							type="button"
							onclick={handleClear}
							{disabled}
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<X size={16} />
						</button>
					{/if}
					<DatePicker.Trigger
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
					>
						<Calendar size={16} />
					</DatePicker.Trigger>
				</div>
			</div>
		</div>

		<DatePicker.Content
			side="bottom"
			sideOffset={4}
			class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] border p-3"
		>
			<DatePicker.Calendar>
				{#snippet children({ months, weekdays })}
					<DatePicker.Header class="mb-2 flex items-center justify-between">
						<DatePicker.PrevButton
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<ChevronLeft size={16} />
						</DatePicker.PrevButton>
						<DatePicker.Heading class="text-kl-base-content text-sm font-medium" />
						<DatePicker.NextButton
							class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-colors duration-150"
						>
							<ChevronRight size={16} />
						</DatePicker.NextButton>
					</DatePicker.Header>
					<div class="flex gap-4">
						{#each months as month, mi (mi)}
							<DatePicker.Grid class="w-full border-collapse">
								<DatePicker.GridHead>
									<DatePicker.GridRow>
										{#each weekdays as day, di (di)}
											<DatePicker.HeadCell
												class="text-kl-muted-content pb-1 text-center text-xs font-medium"
											>
												{day}
											</DatePicker.HeadCell>
										{/each}
									</DatePicker.GridRow>
								</DatePicker.GridHead>
								<DatePicker.GridBody>
									{#each month.weeks as weekDates, wi (wi)}
										<DatePicker.GridRow>
											{#each weekDates as date, dti (dti)}
												<DatePicker.Cell {date} month={month.value} class="p-0 text-center">
													<DatePicker.Day
														class="rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content inline-flex h-8 w-8 cursor-pointer items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[today]:font-semibold data-[unavailable]:line-through"
													/>
												</DatePicker.Cell>
											{/each}
										</DatePicker.GridRow>
									{/each}
								</DatePicker.GridBody>
							</DatePicker.Grid>
						{/each}
					</div>
				{/snippet}
			</DatePicker.Calendar>
		</DatePicker.Content>
	</DatePicker.Root>
{/if}
