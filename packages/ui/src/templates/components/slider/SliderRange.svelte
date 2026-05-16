<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Slider as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Range
	{...rest}
	class={cn('bg-kl-primary rounded-kl-selector absolute h-full', className as string | undefined)}
/>
