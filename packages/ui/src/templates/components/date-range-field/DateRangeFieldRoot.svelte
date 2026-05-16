<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { DateRangeField as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Root {...rest} class={cn(className as string | undefined)} />
