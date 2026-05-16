<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { NavigationMenu as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Content
	{...rest}
	class={cn(
		'bg-kl-base-100 text-kl-base-content data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out absolute top-0 left-0 w-full p-4',
		className as string | undefined
	)}
/>
