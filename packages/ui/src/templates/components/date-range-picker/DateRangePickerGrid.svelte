<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Grid
	{...rest}
	class={cn('w-full border-collapse space-y-1 select-none', className as string | undefined)}
/>
