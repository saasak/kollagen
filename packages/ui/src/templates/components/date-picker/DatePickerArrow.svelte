<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DatePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Arrow
	{...rest}
	class={cn('fill-kl-base-100 stroke-kl-base-300', className as string | undefined)}
/>
