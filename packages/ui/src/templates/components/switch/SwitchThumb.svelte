<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Switch as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Thumb
	{...rest}
	class={cn(
		'bg-kl-base-100 pointer-events-none block size-[calc(var(--kl-size-selector)*5)] rounded-full [box-shadow:var(--kl-shadow-sm)] transition-transform duration-150 data-[state=checked]:translate-x-[calc(var(--kl-size-selector)*5)] data-[state=unchecked]:translate-x-0',
		className as string | undefined
	)}
/>
