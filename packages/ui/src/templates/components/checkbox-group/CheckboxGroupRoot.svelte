<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Checkbox as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root {...rest} class={cn('space-y-2', className as string | undefined)} />
