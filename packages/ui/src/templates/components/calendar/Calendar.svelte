<script lang="ts">
	import { cn } from '$lib/utils/cn';
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

	const dayClass =
		'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[disabled]:text-kl-muted-content inline-flex size-10 items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:pointer-events-none data-[today]:font-semibold data-[unavailable]:line-through';
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
	class={cn(
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm inline-block border p-3',
		className
	)}
>
	{#snippet children({ months, weekdays })}
		<CalendarPrimitive.Header class="mb-2 flex items-center justify-between">
			<CalendarPrimitive.PrevButton
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
			>
				<ChevronLeft size={16} />
			</CalendarPrimitive.PrevButton>
			<CalendarPrimitive.Heading class="text-kl-base-content text-sm font-medium" />
			<CalendarPrimitive.NextButton
				class="rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content size-kl-selector-md flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-colors duration-150"
			>
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
										<CalendarPrimitive.Day class={dayClass}>{date.day}</CalendarPrimitive.Day>
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
