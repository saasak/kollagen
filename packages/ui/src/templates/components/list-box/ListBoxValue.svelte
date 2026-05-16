<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Value
	{...rest}
	class={cn('text-kl-base-content text-sm', className as string | undefined)}
/>
