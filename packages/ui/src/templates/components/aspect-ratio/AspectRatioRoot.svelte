<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AspectRatio as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn('rounded-kl-box overflow-hidden', className as string | undefined)}
/>
