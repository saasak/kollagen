<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Checkbox as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Group {...rest} class={cn('flex flex-col gap-2', className as string | undefined)} />
