<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Command as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Loading
	{...rest}
	class={cn('text-kl-muted-content p-4 text-center text-sm', className as string | undefined)}
/>
