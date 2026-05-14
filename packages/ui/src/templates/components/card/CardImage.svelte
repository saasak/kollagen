<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import type { HTMLImgAttributes } from 'svelte/elements';

	type Props = HTMLImgAttributes & {
		src: string;
	};

	let { class: className, alt = '', ...rest }: Props = $props();
</script>

<img
	{...rest}
	{alt}
	class={cn('block h-48 w-full object-cover', className as string | undefined)}
/>
