<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertDialog as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Description
	{...rest}
	class={cn('text-kl-muted-content text-sm', className as string | undefined)}
/>
