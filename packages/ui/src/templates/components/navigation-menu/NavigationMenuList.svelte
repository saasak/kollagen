<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.List
	{...rest}
	class={cn(
		'flex flex-1 list-none items-center justify-center gap-1',
		className as string | undefined
	)}
/>
