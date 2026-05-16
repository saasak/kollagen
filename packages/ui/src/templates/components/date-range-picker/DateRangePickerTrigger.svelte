<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Trigger
	{...rest}
	class={cn(
		'rounded-kl-field text-kl-base-content hover:bg-kl-base-200 focus-visible:outline-kl-primary h-kl-field-md inline-flex cursor-pointer items-center justify-center gap-2 border border-transparent px-3 text-sm font-medium transition-colors duration-150 outline-none focus-visible:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
