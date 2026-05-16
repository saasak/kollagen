<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Slider as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.ThumbLabel
	{...rest}
	class={cn('text-kl-muted-content text-xs', className as string | undefined)}
/>
