<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Toggle as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'rounded-kl-field border-kl-base-300 text-kl-base-content hover:bg-kl-base-200 data-[state=on]:bg-kl-primary data-[state=on]:text-kl-primary-content focus-visible:outline-kl-primary h-kl-field-md inline-flex cursor-pointer items-center justify-center gap-2 border px-3 text-sm font-medium transition-colors duration-150 outline-none focus-visible:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
