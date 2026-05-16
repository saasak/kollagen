<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertDialog as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Title
	{...rest}
	class={cn('text-kl-base-content text-lg font-semibold', className as string | undefined)}
/>
