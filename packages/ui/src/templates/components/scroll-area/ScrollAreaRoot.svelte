<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ScrollArea as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root {...rest} class={cn('relative overflow-hidden', className as string | undefined)} />
