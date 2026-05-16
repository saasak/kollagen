<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ToggleGroup as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn('inline-flex items-center gap-1', className as string | undefined)}
/>
