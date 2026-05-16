<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DatePicker as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Heading
	{...rest}
	class={cn('text-kl-base-content text-sm font-medium', className as string | undefined)}
/>
