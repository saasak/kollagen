<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Command as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Separator
	{...rest}
	class={cn('bg-kl-base-300 my-1 h-px', className as string | undefined)}
/>
