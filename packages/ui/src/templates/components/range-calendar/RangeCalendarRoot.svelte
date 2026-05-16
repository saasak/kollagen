<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { RangeCalendar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm inline-block border p-3',
		className as string | undefined
	)}
/>
