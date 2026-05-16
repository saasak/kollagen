<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Header
	{...rest}
	class={cn('mb-2 flex items-center justify-between', className as string | undefined)}
/>
