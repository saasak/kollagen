<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DropdownMenu as Primitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof Primitive.CheckboxGroup>;

	let { class: className, value = $bindable([]), ...rest }: Props = $props();
</script>

<Primitive.CheckboxGroup {...rest} bind:value class={cn(className as string | undefined)} />
