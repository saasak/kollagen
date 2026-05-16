<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.ScrollDownButton
	{...rest}
	class={cn(
		'text-kl-muted-content hover:bg-kl-base-200 flex cursor-pointer items-center justify-center py-1 transition-colors duration-150',
		className as string | undefined
	)}
/>
