<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Trigger
	{...rest}
	class={cn(
		'rounded-kl-field text-kl-base-content hover:bg-kl-base-200 data-[state=open]:bg-kl-base-200 h-kl-field-md inline-flex cursor-pointer items-center justify-center gap-1 px-3 text-sm font-medium transition-colors duration-150 outline-none',
		className as string | undefined
	)}
/>
