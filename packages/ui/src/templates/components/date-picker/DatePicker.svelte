<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { datePickerVariants } from './DatePicker.variants';
	import { DatePicker } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-svelte';

	interface Props {
		/** Controlled selected date. Supports bind:value */
		value?: DateValue | undefined;
		/** Form field name for native submission */
		name?: string;
		/** Placeholder date for calendar navigation */
		placeholder?: DateValue;
		/** Disable the date picker */
		disabled?: boolean;
		/** Mark as read-only */
		readonly?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Close calendar after selection */
		closeOnDateSelect?: boolean;
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
		/** Accessible label for the date input */
		ariaLabel?: string;
		/** Callback when selected value changes */
		onValueChange?: (value: DateValue | undefined) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		value = $bindable(),
		name,
		placeholder,
		disabled = false,
		readonly = false,
		required = false,
		closeOnDateSelect = true,
		minValue,
		maxValue,
		numberOfMonths,
		weekStartsOn,
		isDateUnavailable,
		isDateDisabled,
		locale = 'en',
		ariaLabel,
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

	let classes = $derived(datePickerVariants({ disabled }));
</script>

<DatePicker.Root
	bind:value
	bind:open
	{placeholder}
	{disabled}
	{readonly}
	{required}
	{minValue}
	{maxValue}
	{numberOfMonths}
	{weekStartsOn}
	{isDateUnavailable}
	{isDateDisabled}
	{locale}
	{closeOnDateSelect}
	{onValueChange}
	weekdayFormat="short"
	fixedWeeks={true}
>
	<div class={cn(`relative w-full`, className)}>
		<DatePicker.Input {name} aria-label={ariaLabel} class={classes.fieldShell()}>
			{#snippet children({ segments })}
				{#each segments as { part, value: segValue }, i (part + i)}
					{#if part === 'literal'}
						<DatePicker.Segment {part} class="text-kl-muted-content px-0.5 text-sm">
							{segValue}
						</DatePicker.Segment>
					{:else}
						<DatePicker.Segment {part} class={classes.segment()}>
							{segValue}
						</DatePicker.Segment>
					{/if}
				{/each}
				<div class="ml-auto flex items-center gap-0.5">
					{#if value}
						<button type="button" onclick={handleClear} {disabled} class={classes.iconButton()}>
							<X size={14} />
						</button>
					{/if}
					<DatePicker.Trigger class={classes.iconButton()}>
						<Calendar size={16} />
					</DatePicker.Trigger>
				</div>
			{/snippet}
		</DatePicker.Input>
	</div>

	<DatePicker.Content sideOffset={6} class={classes.content()}>
		<DatePicker.Calendar>
			{#snippet children({ months, weekdays })}
				<DatePicker.Header class="mb-2 flex items-center justify-between">
					<DatePicker.PrevButton class={classes.iconButton()}>
						<ChevronLeft size={16} />
					</DatePicker.PrevButton>
					<DatePicker.Heading class="text-kl-base-content text-sm font-medium" />
					<DatePicker.NextButton class={classes.iconButton()}>
						<ChevronRight size={16} />
					</DatePicker.NextButton>
				</DatePicker.Header>
				<div class="flex gap-4">
					{#each months as month (month.value)}
						<DatePicker.Grid class="w-full border-collapse space-y-1 select-none">
							<DatePicker.GridHead>
								<DatePicker.GridRow class="flex w-full justify-between">
									{#each weekdays as day (day)}
										<DatePicker.HeadCell
											class="text-kl-muted-content w-10 text-center text-xs font-medium"
										>
											{day}
										</DatePicker.HeadCell>
									{/each}
								</DatePicker.GridRow>
							</DatePicker.GridHead>
							<DatePicker.GridBody>
								{#each month.weeks as weekDates (weekDates)}
									<DatePicker.GridRow class="flex w-full">
										{#each weekDates as date (date)}
											<DatePicker.Cell
												{date}
												month={month.value}
												class="relative size-10 p-0 text-center text-sm"
											>
												<DatePicker.Day class={classes.day()}>
													{date.day}
												</DatePicker.Day>
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
