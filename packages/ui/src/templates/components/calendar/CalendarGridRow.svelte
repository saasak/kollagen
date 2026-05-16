<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Calendar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.GridRow {...rest} class={cn('flex w-full', className as string | undefined)} />
