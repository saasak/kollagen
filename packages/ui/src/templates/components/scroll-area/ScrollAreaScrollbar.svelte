<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ScrollArea as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Scrollbar
	{...rest}
	class={cn(
		'flex touch-none bg-transparent p-0.5 transition-colors select-none data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5',
		className as string | undefined
	)}
/>
