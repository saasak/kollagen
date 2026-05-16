<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Label as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn('text-kl-base-content text-sm font-medium', className as string | undefined)}
/>
