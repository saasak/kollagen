<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Link
	{...rest}
	class={cn(
		'rounded-kl-field text-kl-base-content hover:bg-kl-base-200 block p-3 text-sm transition-colors duration-150 outline-none',
		className as string | undefined
	)}
/>
