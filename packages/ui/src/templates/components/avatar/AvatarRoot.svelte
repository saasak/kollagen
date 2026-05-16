<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Avatar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'bg-kl-base-200 rounded-kl-selector relative inline-flex size-10 shrink-0 overflow-hidden',
		className as string | undefined
	)}
/>
