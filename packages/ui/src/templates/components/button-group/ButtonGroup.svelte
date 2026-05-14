<script module lang="ts">
	export type ButtonGroupOrientation = import('./ButtonGroup.variants').ButtonGroupOrientation;
	export type ButtonGroupRole = 'group' | 'toolbar';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { buttonGroupVariants } from './ButtonGroup.variants';
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

	let rootClass = $derived(buttonGroupVariants({ orientation, attached }));
</script>

<div
	{role}
	aria-label={ariaLabel}
	aria-orientation={role === 'toolbar' ? orientation : undefined}
	data-orientation={orientation}
	data-attached={attached}
	class={cn(rootClass, className)}
>
	{@render children?.()}
</div>
