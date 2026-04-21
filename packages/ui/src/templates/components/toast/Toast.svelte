<script lang="ts">
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
		closeButton?: boolean;
		duration?: number;
		class?: string;
	}

	let {
		position = 'bottom-right',
		expand = false,
		richColors = true,
		closeButton = false,
		duration = 4000,
		class: className
	}: Props = $props();
</script>

<Toaster
	{position}
	{expand}
	{richColors}
	{closeButton}
	{duration}
	class={className ?? ''}
	toastOptions={{
		classes: {
			toast: 'rounded-kl-box border-kl-base-300 bg-kl-base-100 text-kl-base-content shadow-kl-lg',
			title: 'text-kl-base-content',
			description: 'text-kl-muted-content',
			actionButton: 'bg-kl-primary text-kl-primary-content',
			cancelButton: 'bg-kl-muted text-kl-muted-content',
			success: 'border-kl-success/30',
			error: 'border-kl-error/30',
			info: 'border-kl-info/30',
			warning: 'border-kl-warning/30'
		}
	}}
/>
