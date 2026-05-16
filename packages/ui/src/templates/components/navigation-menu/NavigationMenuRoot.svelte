<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root
	{...rest}
	class={cn(
		'relative z-[var(--kl-z-dropdown)] flex max-w-max flex-1 items-center justify-center',
		className as string | undefined
	)}
/>
