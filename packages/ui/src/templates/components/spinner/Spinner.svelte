<script module lang="ts">
	export type SpinnerSize = 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { LoaderCircle } from 'lucide-svelte';

	interface Props {
		size?: SpinnerSize;
		label?: string;
		class?: string;
	}

	let { size = 'md', label = 'Loading', class: className }: Props = $props();

	const sizes: Record<SpinnerSize, number> = {
		sm: 16,
		md: 20,
		lg: 28
	};
</script>

<LoaderCircle
	size={sizes[size]}
	aria-label={label}
	class={cn('text-kl-base-content animate-spin', className)}
/>
