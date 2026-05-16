<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { TimeField as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Label
	{...rest}
	class={cn('text-kl-base-content text-sm font-medium', className as string | undefined)}
/>
