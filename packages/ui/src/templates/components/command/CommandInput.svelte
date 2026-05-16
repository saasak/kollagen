<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Command as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Input
	{...rest}
	class={cn(
		'placeholder:text-kl-muted-content text-kl-base-content h-kl-field-md rounded-kl-field border-kl-base-300 bg-kl-base-100 focus-visible:outline-kl-primary w-full border px-3 text-sm transition-colors duration-150 outline-none focus-visible:outline data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
