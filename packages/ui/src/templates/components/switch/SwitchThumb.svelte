<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Switch as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Thumb
	{...rest}
	class={cn(
		'bg-kl-base-100 size-kl-selector-sm pointer-events-none block rounded-full [box-shadow:var(--kl-shadow-sm)] transition-transform duration-150 data-[state=checked]:translate-x-[calc(var(--spacing-kl-selector-sm)] data-[state=unchecked]:translate-x-0',
		className as string | undefined
	)}
/>
