<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Slider as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Thumb
	{...rest}
	class={cn(
		'bg-kl-base-100 border-kl-primary size-kl-selector-md rounded-kl-selector focus-visible:outline-kl-primary border transition-transform duration-150 outline-none focus-visible:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
