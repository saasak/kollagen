<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Avatar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Image {...rest} class={cn('size-full object-cover', className as string | undefined)} />
