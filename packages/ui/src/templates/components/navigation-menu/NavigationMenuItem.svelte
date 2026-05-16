<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Item
	{...rest}
	class={cn(
		'rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 data-[selected]:bg-kl-base-200 flex cursor-pointer items-center gap-2 px-2 py-2 text-sm transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
