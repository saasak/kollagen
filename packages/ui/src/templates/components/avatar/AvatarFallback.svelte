<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Avatar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Fallback
	{...rest}
	class={cn(
		'text-kl-muted-content flex size-full items-center justify-center text-sm font-medium',
		className as string | undefined
	)}
/>
