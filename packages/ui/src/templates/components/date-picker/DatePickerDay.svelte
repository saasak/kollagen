<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DatePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Day
	{...rest}
	class={cn(
		'rounded-kl-selector text-kl-base-content hover:bg-kl-base-200 data-[selected]:bg-kl-primary data-[selected]:text-kl-primary-content data-[outside-month]:text-kl-muted-content data-[unavailable]:text-kl-muted-content data-[disabled]:text-kl-muted-content inline-flex size-10 items-center justify-center border-none bg-transparent text-sm transition-colors duration-150 data-[disabled]:pointer-events-none data-[today]:font-semibold data-[unavailable]:line-through',
		className as string | undefined
	)}
/>
