<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertDialog as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Action
	{...rest}
	class={cn(
		'rounded-kl-field bg-kl-error text-kl-error-content h-kl-field-md cursor-pointer border border-transparent px-3 text-sm font-medium transition-colors duration-150 hover:brightness-95',
		className as string | undefined
	)}
/>
