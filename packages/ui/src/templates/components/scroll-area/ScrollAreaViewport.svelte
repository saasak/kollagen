<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ScrollArea as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Viewport
	{...rest}
	class={cn('size-full rounded-[inherit]', className as string | undefined)}
/>
