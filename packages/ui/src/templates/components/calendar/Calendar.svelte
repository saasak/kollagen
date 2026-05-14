<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { calendarVariants } from './Calendar.variants';
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	interface Props {
		value?: DateValue | undefined;
		placeholder?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		preventDeselect?: boolean;
		minValue?: DateValue;
		maxValue?: DateValue;
		numberOfMonths?: number;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		isDateUnavailable?: (date: DateValue) => boolean;
		isDateDisabled?: (date: DateValue) => boolean;
		locale?: string;
		onValueChange?: (value: DateValue | undefined) => void;
		class?: string;
	}

	let {
		value = $bindable(),
		placeholder,
		disabled = false,
		readonly = false,
		preventDeselect = false,
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

	const classes = calendarVariants();
</script>

<CalendarPrimitive.Root
	type="single"
	bind:value
	{placeholder}
	{disabled}
	{readonly}
	{preventDeselect}
	{minValue}
	{maxValue}
	{numberOfMonths}
	{weekStartsOn}
	{isDateUnavailable}
	{isDateDisabled}
	{locale}
	{onValueChange}
	weekdayFormat="short"
	fixedWeeks={true}
	class={cn(classes.root(), className)}
>
	{#snippet children({ months, weekdays })}
		<CalendarPrimitive.Header class="mb-2 flex items-center justify-between">
			<CalendarPrimitive.PrevButton class={classes.navButton()}>
				<ChevronLeft size={16} />
			</CalendarPrimitive.PrevButton>
			<CalendarPrimitive.Heading class="text-kl-base-content text-sm font-medium" />
			<CalendarPrimitive.NextButton class={classes.navButton()}>
				<ChevronRight size={16} />
			</CalendarPrimitive.NextButton>
		</CalendarPrimitive.Header>
		<div class="flex gap-4">
			{#each months as month (month.value)}
				<CalendarPrimitive.Grid class="w-full border-collapse space-y-1 select-none">
					<CalendarPrimitive.GridHead>
						<CalendarPrimitive.GridRow class="flex w-full justify-between">
							{#each weekdays as day (day)}
								<CalendarPrimitive.HeadCell
									class="text-kl-muted-content w-10 text-center text-xs font-medium"
								>
									{day}
								</CalendarPrimitive.HeadCell>
							{/each}
						</CalendarPrimitive.GridRow>
					</CalendarPrimitive.GridHead>
					<CalendarPrimitive.GridBody>
						{#each month.weeks as weekDates (weekDates)}
							<CalendarPrimitive.GridRow class="flex w-full">
								{#each weekDates as date (date)}
									<CalendarPrimitive.Cell
										{date}
										month={month.value}
										class="relative size-10 p-0 text-center text-sm"
									>
										<CalendarPrimitive.Day class={classes.day()}>{date.day}</CalendarPrimitive.Day>
									</CalendarPrimitive.Cell>
								{/each}
							</CalendarPrimitive.GridRow>
						{/each}
					</CalendarPrimitive.GridBody>
				</CalendarPrimitive.Grid>
			{/each}
		</div>
	{/snippet}
</CalendarPrimitive.Root>
