<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.GridRow {...rest} class={cn('flex w-full', className as string | undefined)} />
