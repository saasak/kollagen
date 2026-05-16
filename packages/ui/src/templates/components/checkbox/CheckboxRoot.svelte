<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Checkbox as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'rounded-kl-selector border-kl-base-300 bg-kl-base-100 data-[state=checked]:bg-kl-primary data-[state=checked]:text-kl-primary-content data-[state=indeterminate]:bg-kl-primary data-[state=indeterminate]:text-kl-primary-content focus-visible:outline-kl-primary size-kl-selector-md inline-flex shrink-0 cursor-pointer items-center justify-center border transition-colors duration-150 outline-none focus-visible:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
