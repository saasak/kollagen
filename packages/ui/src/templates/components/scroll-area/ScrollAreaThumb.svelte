<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ScrollArea as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Thumb
	{...rest}
	class={cn(
		'bg-kl-base-300 hover:bg-kl-muted-content relative flex-1 rounded-full transition-colors',
		className as string | undefined
	)}
/>
