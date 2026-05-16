<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Switch as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'bg-kl-base-300 data-[state=checked]:bg-kl-primary h-kl-selector-md inline-flex w-[calc(var(--kl-size-selector)*11)] shrink-0 cursor-pointer items-center rounded-full border p-[calc(var(--kl-size-selector)*0.5)] transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
