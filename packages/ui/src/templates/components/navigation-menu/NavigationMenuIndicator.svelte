<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Indicator
	{...rest}
	class={cn(
		'data-[state=visible]:animate-in data-[state=hidden]:animate-out top-full z-[1] flex h-2.5 items-end justify-center overflow-hidden',
		className as string | undefined
	)}
/>
