<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Pagination as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Page
	{...rest}
	class={cn(
		'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content size-kl-selector-md inline-flex cursor-pointer items-center justify-center text-sm transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
