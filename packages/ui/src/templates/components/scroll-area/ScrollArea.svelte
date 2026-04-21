<script lang="ts">
	import { ScrollArea } from 'bits-ui';
	import type { Snippet } from 'svelte';

	interface Props {
		dir?: 'ltr' | 'rtl';
		class?: string;
		children: Snippet;
	}

	let { dir, class: className, children }: Props = $props();
</script>

<ScrollArea.Root {dir} class="relative overflow-hidden {className ?? ''}">
	<ScrollArea.Viewport class="size-full">
		{@render children()}
	</ScrollArea.Viewport>

	<ScrollArea.Scrollbar
		orientation="vertical"
		class="flex touch-none p-0.5 transition-colors duration-150 select-none data-[orientation=vertical]:w-2.5"
	>
		<ScrollArea.Thumb
			class="bg-kl-base-300 hover:bg-kl-neutral relative flex-1 rounded-full transition-colors duration-150"
		/>
	</ScrollArea.Scrollbar>

	<ScrollArea.Scrollbar
		orientation="horizontal"
		class="flex touch-none p-0.5 transition-colors duration-150 select-none data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col"
	>
		<ScrollArea.Thumb
			class="bg-kl-base-300 hover:bg-kl-neutral relative flex-1 rounded-full transition-colors duration-150"
		/>
	</ScrollArea.Scrollbar>

	<ScrollArea.Corner class="bg-kl-base-200" />
</ScrollArea.Root>
