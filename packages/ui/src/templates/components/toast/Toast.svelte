<script module lang="ts">
	export type ToastVariant = import('./Toast.variants').ToastVariant;
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { toastVariants } from './Toast.variants';
	import { Toaster } from 'svelte-sonner';

	interface Props {
		position?:
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right';
		expand?: boolean;
		richColors?: boolean;
		variant?: ToastVariant;
		closeButton?: boolean;
		duration?: number;
		class?: string;
	}

	let {
		position = 'bottom-right',
		expand = false,
		richColors = true,
		variant = 'soft',
		closeButton = false,
		duration = 4000,
		class: className
	}: Props = $props();

	let classes = $derived(toastVariants({ variant, richColors }));
</script>

<Toaster
	{position}
	{expand}
	{closeButton}
	{duration}
	class={cn(className)}
	toastOptions={{
		unstyled: true,
		classes: {
			toast: classes.toast(),
			content: classes.content(),
			icon: classes.icon(),
			title: classes.title(),
			description: classes.description(),
			actionButton: classes.actionButton(),
			cancelButton: classes.cancelButton(),
			closeButton: classes.closeButton(),
			success: classes.success(),
			error: classes.error(),
			info: classes.info(),
			warning: classes.warning()
		}
	}}
/>
