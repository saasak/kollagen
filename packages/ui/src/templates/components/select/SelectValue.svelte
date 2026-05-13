<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Value>;

	let { class: className, ...rest }: Props = $props();
</script>

<SelectPrimitive.Value
	{...rest}
	class={cn(`truncate text-left`, className as string | undefined)}
/>
