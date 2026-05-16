<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ScrollArea as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Corner {...rest} class={cn('bg-kl-base-300', className as string | undefined)} />
