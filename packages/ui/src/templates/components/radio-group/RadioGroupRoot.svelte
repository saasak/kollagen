<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { RadioGroup as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root {...rest} class={cn('flex flex-col gap-2', className as string | undefined)} />
