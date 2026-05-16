<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Menubar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.GroupHeading
	{...rest}
	class={cn(
		'text-kl-muted-content px-2 py-1.5 text-xs font-semibold',
		className as string | undefined
	)}
/>
