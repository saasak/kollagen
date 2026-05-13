<script module lang="ts">
	export type ButtonGroupOrientation = 'horizontal' | 'vertical';
	export type ButtonGroupRole = 'group' | 'toolbar';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { Snippet } from 'svelte';

	interface Props {
		/** Layout direction */
		orientation?: ButtonGroupOrientation;
		/** Visually attach direct children */
		attached?: boolean;
		/** Accessible role for the group */
		role?: ButtonGroupRole;
		/** Accessible label for the group */
		ariaLabel?: string;
		/** Additional CSS classes on the root element */
		class?: string;
		/** Group content */
		children?: Snippet;
	}

	let {
		orientation = 'horizontal',
		attached = true,
		role = 'group',
		ariaLabel,
		class: className,
		children
	}: Props = $props();

	const baseClass = 'inline-flex w-fit items-stretch';
	const orientationClasses: Record<ButtonGroupOrientation, string> = {
		horizontal: 'flex-row',
		vertical: 'flex-col'
	};
	const gapClasses: Record<ButtonGroupOrientation, string> = {
		horizontal: 'gap-2',
		vertical: 'gap-2'
	};
	const attachedClasses: Record<ButtonGroupOrientation, string> = {
		horizontal:
			'[&>*:not(:first-child)]:-ml-px [&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none',
		vertical:
			'[&>*:not(:first-child)]:-mt-px [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none'
	};
</script>

<div
	{role}
	aria-label={ariaLabel}
	aria-orientation={role === 'toolbar' ? orientation : undefined}
	data-orientation={orientation}
	data-attached={attached}
	class={cn(
		baseClass,
		orientationClasses[orientation],
		attached ? attachedClasses[orientation] : gapClasses[orientation],
		className
	)}
>
	{@render children?.()}
</div>
