<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { numberInputVariants } from './NumberInput.variants';
	import { ChevronUp, ChevronDown } from 'lucide-svelte';

	interface ValueChangeDetails {
		value: string;
		valueAsNumber: number;
	}

	interface ValueInvalidDetails {
		reason: 'rangeOverflow' | 'rangeUnderflow';
	}

	interface Props {
		/** Display label */
		label?: string;
		/** Controlled value (string). Supports bind:value */
		value?: string;
		/** Initial value for uncontrolled mode */
		defaultValue?: string;
		/** Form field name for native submission */
		name?: string;
		/** Minimum allowed value */
		min?: number;
		/** Maximum allowed value */
		max?: number;
		/** Increment/decrement step */
		step?: number;
		/** Disable the input */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Make read-only */
		readOnly?: boolean;
		/** Allow mouse wheel to change value */
		allowMouseWheel?: boolean;
		/** Clamp value to min/max on blur */
		clampValueOnBlur?: boolean;
		/** Intl.NumberFormat options for formatting */
		formatOptions?: Intl.NumberFormatOptions;
		/** Placeholder text */
		placeholder?: string;
		/** Callback when value changes */
		onValueChange?: (details: ValueChangeDetails) => void;
		/** Callback when value is outside min/max range */
		onValueInvalid?: (details: ValueInvalidDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		value = $bindable(),
		defaultValue,
		name,
		min,
		max,
		step = 1,
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		allowMouseWheel = false,
		clampValueOnBlur = true,
		formatOptions,
		placeholder,
		onValueChange,
		onValueInvalid,
		class: className
	}: Props = $props();

	function getDefaultValue() {
		return defaultValue;
	}

	const initialDefaultValue = getDefaultValue();
	if (value === undefined && initialDefaultValue !== undefined) {
		value = initialDefaultValue;
	}

	let focused = $state(false);
	const id = `number-input-${Math.random().toString(36).slice(2, 9)}`;

	const formatter = $derived(
		formatOptions ? new Intl.NumberFormat(undefined, formatOptions) : null
	);

	function parseValue(v: string | undefined): number {
		if (v === undefined || v === '') return NaN;
		return Number(v);
	}

	function clamp(num: number): number {
		if (min !== undefined && num < min) return min;
		if (max !== undefined && num > max) return max;
		return num;
	}

	function formatNum(num: number): string {
		if (formatter) return formatter.format(num);
		return String(num);
	}

	function emitChange(newValue: string) {
		value = newValue;
		onValueChange?.({ value: newValue, valueAsNumber: Number(newValue) });
	}

	function increment() {
		if (disabled || readOnly) return;
		const current = parseValue(value);
		const base = isNaN(current) ? 0 : current;
		let next = base + step;
		if (max !== undefined && next > max) {
			onValueInvalid?.({ reason: 'rangeOverflow' });
			return;
		}
		next = clamp(next);
		emitChange(String(next));
	}

	function decrement() {
		if (disabled || readOnly) return;
		const current = parseValue(value);
		const base = isNaN(current) ? 0 : current;
		let next = base - step;
		if (min !== undefined && next < min) {
			onValueInvalid?.({ reason: 'rangeUnderflow' });
			return;
		}
		next = clamp(next);
		emitChange(String(next));
	}

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		emitChange(target.value);
	}

	function handleBlur() {
		focused = false;
		if (clampValueOnBlur && value !== undefined && value !== '') {
			const num = parseValue(value);
			if (!isNaN(num)) {
				const clamped = clamp(num);
				if (clamped !== num) {
					emitChange(String(clamped));
				}
			}
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			increment();
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			decrement();
		}
	}

	function handleWheel(e: WheelEvent) {
		if (!allowMouseWheel || disabled || readOnly) return;
		e.preventDefault();
		if (e.deltaY < 0) increment();
		else decrement();
	}

	// Display value: show formatted if not focused, raw otherwise
	const displayValue = $derived.by(() => {
		if (focused || !formatter) return value ?? '';
		const num = parseValue(value);
		if (isNaN(num)) return value ?? '';
		return formatNum(num);
	});

	const focusState = $derived(focused ? (invalid ? 'invalid' : 'valid') : undefined);
	let classes = $derived(numberInputVariants({ disabled, invalid, focused: focusState }));
</script>

<div class={cn(`flex flex-col gap-1.5`, className)}>
	{#if label}
		<label
			for={id}
			class="text-kl-base-content text-sm font-medium {disabled ? 'text-kl-muted-content' : ''}"
		>
			{label}
		</label>
	{/if}

	<div class={classes.fieldShell()}>
		<input
			{id}
			type="text"
			inputmode="decimal"
			value={displayValue}
			{name}
			{placeholder}
			{disabled}
			{required}
			readonly={readOnly}
			aria-invalid={invalid || undefined}
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={parseValue(value)}
			role="spinbutton"
			oninput={handleInput}
			onfocus={() => (focused = true)}
			onblur={handleBlur}
			onkeydown={handleKeydown}
			onwheel={handleWheel}
			class={classes.input()}
		/>

		<div class="border-kl-base-300 flex flex-col border-l">
			<button
				type="button"
				tabindex={-1}
				{disabled}
				onclick={increment}
				aria-label="Increment"
				class={classes.stepperButton()}
			>
				<ChevronUp size={14} />
			</button>

			<div class="border-kl-base-300 border-t"></div>

			<button
				type="button"
				tabindex={-1}
				{disabled}
				onclick={decrement}
				aria-label="Decrement"
				class={classes.stepperButton()}
			>
				<ChevronDown size={14} />
			</button>
		</div>
	</div>
</div>
