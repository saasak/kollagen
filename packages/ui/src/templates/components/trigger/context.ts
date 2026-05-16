import type { HTMLAttributes } from 'svelte/elements';

export type TriggerPrimitiveProps = HTMLAttributes<HTMLSpanElement> & {
	disabled?: boolean;
	type?: unknown;
};

export const triggerContextKey = Symbol('kollagen-trigger-context');
