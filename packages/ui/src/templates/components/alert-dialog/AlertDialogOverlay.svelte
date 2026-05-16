<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { AlertDialog as Primitive } from 'bits-ui';

	let { class: className, ...rest }: any = $props();
</script>

<Primitive.Overlay
	{...rest}
	class={cn(
		'bg-kl-neutral/50 fixed inset-0 z-[var(--kl-z-overlay)] backdrop-blur-sm',
		className as string | undefined
	)}
/>
