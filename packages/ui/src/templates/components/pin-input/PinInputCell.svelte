<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { PinInput as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Cell
	{...rest}
	class={cn(
		'rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content data-[active]:border-kl-primary data-[active]:outline-kl-primary flex h-11 w-11 items-center justify-center border text-center text-base font-medium transition-colors duration-150 outline-none data-[active]:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
