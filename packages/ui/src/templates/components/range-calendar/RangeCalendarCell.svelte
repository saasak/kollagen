<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { RangeCalendar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Cell
	{...rest}
	class={cn('relative size-10 p-0 text-center text-sm', className as string | undefined)}
/>
