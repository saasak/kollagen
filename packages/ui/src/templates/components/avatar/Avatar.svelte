<script lang="ts">
	import { Avatar } from 'bits-ui';
	import { User } from 'lucide-svelte';

	interface Props {
		/** Image source URL */
		src?: string;
		/** Alt text for the avatar image */
		alt?: string;
		/** Fallback text (e.g. initials) shown when image is unavailable */
		fallback?: string;
		/** Avatar size */
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		/** Whether the avatar is disabled (reduces opacity) */
		disabled?: boolean;
		/** Callback when the image load status changes */
		onLoadingStatusChange?: (status: 'loading' | 'loaded' | 'error') => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		src,
		alt = '',
		fallback,
		size = 'md',
		disabled = false,
		onLoadingStatusChange,
		class: className
	}: Props = $props();

	const sizeClass: Record<string, string> = {
		xs: 'size-6 text-xs',
		sm: 'size-8 text-sm',
		md: 'size-10 text-sm',
		lg: 'size-14 text-base',
		xl: 'size-20 text-lg'
	};
</script>

<Avatar.Root
	{onLoadingStatusChange}
	class="rounded-kl-selector bg-kl-base-200 text-kl-muted-content relative inline-flex shrink-0 items-center justify-center overflow-hidden {sizeClass[
		size
	]} {disabled ? 'opacity-50' : ''} {className ?? ''}"
>
	<Avatar.Fallback class="flex size-full items-center justify-center font-medium">
		{#if fallback}
			{fallback}
		{:else}
			<User class="size-1/2" />
		{/if}
	</Avatar.Fallback>
	<Avatar.Image {src} {alt} class="size-full object-cover" />
</Avatar.Root>
