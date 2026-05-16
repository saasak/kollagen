<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Viewport
	{...rest}
	class={cn(
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md relative mt-2 h-[var(--bits-navigation-menu-viewport-height)] w-full overflow-hidden border',
		className as string | undefined
	)}
/>
