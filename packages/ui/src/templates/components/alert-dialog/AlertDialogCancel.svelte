<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertDialog as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Cancel
	{...rest}
	class={cn(
		'rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 h-kl-field-md cursor-pointer border px-3 text-sm font-medium transition-colors duration-150',
		className as string | undefined
	)}
/>
