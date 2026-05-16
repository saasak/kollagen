<script module lang="ts">
	export type ButtonColor = import('../button/Button.variants').ButtonColor;
	export type ButtonContent = import('../button/Button.variants').ButtonContent;
	export type ButtonSize = import('../button/Button.variants').ButtonSize;
	export type ButtonVariant = import('../button/Button.variants').ButtonVariant;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { LoaderCircle } from 'lucide-svelte';
	import { getContext, type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { buttonVariants } from '../button/Button.variants';
	import { triggerContextKey, type TriggerPrimitiveProps } from './context';

	type SpanMouseEvent = MouseEvent & { currentTarget: EventTarget & HTMLSpanElement };
	type SpanKeyboardEvent = KeyboardEvent & { currentTarget: EventTarget & HTMLSpanElement };

	type Props = HTMLAttributes<HTMLSpanElement> & {
		/** Visual style */
		variant?: ButtonVariant;
		/** Semantic color */
		color?: ButtonColor;
		/** Trigger size */
		size?: ButtonSize;
		/** Trigger content layout */
		content?: ButtonContent;
		/** Disable the trigger */
		disabled?: boolean;
		/** Show a loading spinner and disable the trigger */
		loading?: boolean;
		/** Ignored when primitive trigger props include native button type */
		type?: unknown;
		/** Element reference. Supports bind:ref */
		ref?: HTMLSpanElement | null;
		/** Accessible label, required for icon-only triggers */
		ariaLabel?: string;
		/** Trigger content */
		children?: Snippet;
	};

	const getPrimitiveProps = getContext<(() => TriggerPrimitiveProps) | undefined>(
		triggerContextKey
	);

	let {
		variant = 'solid',
		color = 'base',
		size = 'md',
		content = 'normal',
		disabled = false,
		loading = false,
		type: _type,
		ref = $bindable<HTMLSpanElement | null>(null),
		ariaLabel,
		'aria-label': ariaLabelAttribute,
		role: _role,
		tabindex,
		class: className,
		onclick,
		onkeydown,
		children,
		...restProps
	}: Props = $props();

	let primitiveProps = $derived(getPrimitiveProps?.() ?? {});
	let primitiveDisabled = $derived(Boolean(primitiveProps.disabled));
	let primitiveClass = $derived(primitiveProps.class as string | undefined);
	let primitiveOnclick = $derived(primitiveProps.onclick);
	let primitiveOnkeydown = $derived(primitiveProps.onkeydown);
	let primitiveTabindex = $derived(primitiveProps.tabindex);
	let primitiveAriaLabel = $derived(primitiveProps['aria-label']);
	let mergedRestProps = $derived.by(() => {
		const {
			disabled: _disabled,
			type: _type,
			class: _class,
			onclick: _onclick,
			onkeydown: _onkeydown,
			role: _primitiveRole,
			tabindex: _tabindex,
			'aria-label': _ariaLabel,
			...restPrimitiveProps
		} = primitiveProps;

		return { ...restPrimitiveProps, ...restProps };
	});
	let isDisabled = $derived(disabled || loading || primitiveDisabled);
	let triggerClass = $derived(buttonVariants({ variant, color, size, content }));

	function handleClick(event: SpanMouseEvent) {
		if (isDisabled) {
			event.preventDefault();
			event.stopPropagation();
			return;
		}

		primitiveOnclick?.(event);
		if (event.defaultPrevented) return;
		onclick?.(event);
	}

	function handleKeydown(event: SpanKeyboardEvent) {
		primitiveOnkeydown?.(event);
		if (event.defaultPrevented) return;
		onkeydown?.(event);

		if (event.defaultPrevented || isDisabled) return;

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			event.currentTarget.click();
		}
	}

	function setRef(node: HTMLSpanElement) {
		ref = node;
		return () => {
			if (ref === node) ref = null;
		};
	}
</script>

<span
	{...mergedRestProps}
	{@attach setRef}
	role="button"
	tabindex={isDisabled ? -1 : (tabindex ?? primitiveTabindex ?? 0)}
	aria-label={ariaLabel ?? ariaLabelAttribute ?? primitiveAriaLabel}
	aria-disabled={isDisabled}
	aria-busy={loading}
	onclick={handleClick}
	onkeydown={handleKeydown}
	class={cn(triggerClass, primitiveClass, className as string | undefined)}
>
	{#if loading}
		<LoaderCircle size={16} class="animate-spin" aria-hidden="true" />
	{/if}
	{@render children?.()}
</span>
