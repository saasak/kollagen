<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Slider as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Tick
	{...rest}
	class={cn('bg-kl-base-300 rounded-kl-selector', className as string | undefined)}
/>
