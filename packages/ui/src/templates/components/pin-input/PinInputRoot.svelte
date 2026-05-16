<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { PinInput as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root {...rest} class={cn('flex items-center gap-2', className as string | undefined)} />
