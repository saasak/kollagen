<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { ContextMenu as Primitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof Primitive.CheckboxItem>;

	let { class: className, ...rest }: Props = $props();
</script>

<Primitive.CheckboxItem
	{...rest}
	class={cn(
		'rounded-kl-selector text-kl-base-content data-[highlighted]:bg-kl-base-200 flex cursor-pointer items-center gap-2 px-2 py-2 text-sm transition-colors duration-150 outline-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
