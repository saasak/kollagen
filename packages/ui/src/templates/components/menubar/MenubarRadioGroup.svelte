<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Menubar as Primitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof Primitive.RadioGroup>;

	let { class: className, value = $bindable(''), ...rest }: Props = $props();
</script>

<Primitive.RadioGroup {...rest} bind:value class={cn(className as string | undefined)} />
