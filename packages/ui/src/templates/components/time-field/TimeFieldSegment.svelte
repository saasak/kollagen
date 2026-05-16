<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { TimeField as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Segment
	{...rest}
	class={cn(
		'text-kl-base-content data-[placeholder]:text-kl-muted-content rounded-kl-selector data-[focused]:bg-kl-primary data-[focused]:text-kl-primary-content px-0.5 tabular-nums outline-none',
		className as string | undefined
	)}
/>
