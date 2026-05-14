<script lang="ts">
	import { cn } from '$lib/utils/cn';

	interface Props {
		class?: string;
	}

	let { class: className }: Props = $props();
</script>

<div aria-hidden="true" class={cn('rounded-kl-field bg-kl-muted animate-pulse', className)}></div>
