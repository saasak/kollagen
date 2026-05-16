<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { RatingGroup as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Item
	{...rest}
	class={cn(
		'text-kl-muted-content data-[state=active]:text-kl-warning hover:text-kl-warning cursor-pointer transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
		className as string | undefined
	)}
/>
