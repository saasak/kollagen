<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Combobox as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Viewport
	{...rest}
	class={cn('max-h-72 overflow-y-auto', className as string | undefined)}
/>
