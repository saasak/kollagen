<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Progress as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'bg-kl-muted rounded-kl-selector h-2 w-full overflow-hidden',
		className as string | undefined
	)}
/>
