<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DatePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Close
	{...rest}
	class={cn(
		'rounded-kl-selector text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content inline-flex cursor-pointer items-center justify-center p-1 transition-colors duration-150',
		className as string | undefined
	)}
/>
