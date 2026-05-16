<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { Menubar as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Content
	{...rest}
	class={cn(
		'rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-md z-[var(--kl-z-dropdown)] min-w-[8rem] border p-1 outline-none',
		className as string | undefined
	)}
/>
