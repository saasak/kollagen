<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { avatarVariants, type AvatarSize } from './Avatar.variants';
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
		size?: AvatarSize;
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

	let rootClass = $derived(avatarVariants({ size, disabled }));
</script>

<Avatar.Root {onLoadingStatusChange} class={cn(rootClass, className)}>
	<Avatar.Fallback class="flex size-full items-center justify-center font-medium">
		{#if fallback}
			{fallback}
		{:else}
			<User class="size-1/2" />
		{/if}
	</Avatar.Fallback>
	<Avatar.Image {src} {alt} class="size-full object-cover" />
</Avatar.Root>
