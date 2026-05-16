<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { RadioGroup as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Item
	{...rest}
	class={cn(
		'border-kl-base-300 bg-kl-base-100 data-[state=checked]:border-kl-primary focus-visible:outline-kl-primary size-kl-selector-md rounded-full border transition-colors duration-150 outline-none focus-visible:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
