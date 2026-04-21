<script lang="ts">
	import { Avatar } from '$ui/avatar';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{ name: 'src', type: 'string', default: '—', description: 'Image source URL' },
		{ name: 'alt', type: 'string', default: '""', description: 'Alt text for the avatar image' },
		{
			name: 'fallback',
			type: 'string',
			default: '—',
			description: 'Fallback text (e.g. initials) shown when image is unavailable'
		},
		{
			name: 'size',
			type: '"xs" | "sm" | "md" | "lg" | "xl"',
			default: '"md"',
			description: 'Avatar size'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether the avatar is disabled (reduces opacity)'
		},
		{
			name: 'onStatusChange',
			type: '(details: { status: "loaded" | "error" }) => void',
			default: '—',
			description: 'Callback when the image load status changes'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<h1 class="text-kl-base-content mb-2 text-3xl font-bold">Avatar</h1>
<p class="text-kl-muted-content mb-8 text-lg">
	A visual representation of a user or entity, with image loading and fallback support.
</p>

<div class="space-y-8">
	<h2 class="text-kl-base-content text-xl font-semibold">Examples</h2>

	<DemoCard
		title="Basic with image"
		description="Displays a user photo. Falls back to initials or icon if the image fails to load."
		code="<Avatar src=&quot;https://i.pravatar.cc/150?u=avatar1&quot; alt=&quot;John Doe&quot; />"
	>
		<div class="flex items-center gap-4">
			<Avatar src="https://i.pravatar.cc/150?u=avatar1" alt="John Doe" />
			<Avatar src="https://i.pravatar.cc/150?u=avatar2" alt="Jane Smith" />
			<Avatar src="https://i.pravatar.cc/150?u=avatar3" alt="Alex Johnson" />
		</div>
	</DemoCard>

	<DemoCard
		title="Sizes"
		description="Available in five sizes: xs, sm, md, lg, and xl."
		code={`<Avatar src="..." size="xs" />
<Avatar src="..." size="sm" />
<Avatar src="..." size="md" />
<Avatar src="..." size="lg" />
<Avatar src="..." size="xl" />`}
	>
		<div class="flex items-end gap-4">
			<Avatar src="https://i.pravatar.cc/150?u=size" size="xs" alt="Extra small" />
			<Avatar src="https://i.pravatar.cc/150?u=size" size="sm" alt="Small" />
			<Avatar src="https://i.pravatar.cc/150?u=size" size="md" alt="Medium" />
			<Avatar src="https://i.pravatar.cc/150?u=size" size="lg" alt="Large" />
			<Avatar src="https://i.pravatar.cc/150?u=size" size="xl" alt="Extra large" />
		</div>
	</DemoCard>

	<DemoCard
		title="Fallback with initials"
		description="Shows initials when no image is provided or the image fails to load."
		code={`<Avatar fallback="JD" />
<Avatar fallback="AS" />
<Avatar fallback="MK" />`}
	>
		<div class="flex items-center gap-4">
			<Avatar fallback="JD" />
			<Avatar fallback="AS" />
			<Avatar fallback="MK" />
		</div>
	</DemoCard>

	<DemoCard
		title="Icon fallback"
		description="Displays a default user icon when neither image nor initials are provided."
		code="<Avatar />"
	>
		<div class="flex items-center gap-4">
			<Avatar size="sm" />
			<Avatar size="md" />
			<Avatar size="lg" />
		</div>
	</DemoCard>

	<DemoCard
		title="Disabled"
		description="Reduces opacity to indicate a disabled state."
		code="<Avatar src=&quot;...&quot; disabled />"
	>
		<div class="flex items-center gap-4">
			<Avatar src="https://i.pravatar.cc/150?u=disabled" alt="Disabled" disabled />
			<Avatar fallback="DX" disabled />
			<Avatar disabled />
		</div>
	</DemoCard>

	<h2 class="text-kl-base-content mt-12 text-xl font-semibold">Props</h2>
	<PropsTable props={propsData} />
</div>
