<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.YearSelect
	{...rest}
	class={cn(
		'rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content h-kl-field-sm border px-2 text-sm outline-none',
		className as string | undefined
	)}
/>
