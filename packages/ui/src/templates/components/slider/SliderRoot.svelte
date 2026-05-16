<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Slider as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn('relative flex w-full items-center py-1', className as string | undefined)}
/>
