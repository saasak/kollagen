<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { RangeCalendar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.HeadCell
	{...rest}
	class={cn(
		'text-kl-muted-content w-10 text-center text-xs font-medium',
		className as string | undefined
	)}
/>
