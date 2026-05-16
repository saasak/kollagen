<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Separator as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'bg-kl-base-300 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px',
		className as string | undefined
	)}
/>
