<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardImage,
		CardRoot,
		CardTitle
	} from '$ui/card';
	import { Button } from '$ui/button';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'title',
			type: 'string',
			default: '—',
			description: 'Card title displayed in the header'
		},
		{
			name: 'description',
			type: 'string',
			default: '—',
			description: 'Supporting text displayed below the title'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		},
		{ name: 'children', type: 'Snippet', default: '—', description: 'Main card content' },
		{ name: 'footer', type: 'Snippet', default: '—', description: 'Footer content' }
	];

	const cardImagePropsData = [
		{
			name: 'src',
			type: 'string',
			default: '—',
			description: 'Image source URL'
		},
		{
			name: 'alt',
			type: 'string',
			default: "''",
			description: 'Alternative text for the image'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the image'
		}
	];

	const cardImageSrc =
		'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80';
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Card</h1>
		<p class="text-kl-muted-content mt-2">
			A theme-aware content surface with default radius, border, background, and shadow tokens.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple themed surface."
			code={`<Card title="Workspace" description="Updated 2 minutes ago">
  <p>Review pending tasks and recent changes.</p>
</Card>`}
		>
			<Card title="Workspace" description="Updated 2 minutes ago" class="max-w-sm">
				<p class="text-kl-base-content text-sm">Review pending tasks and recent changes.</p>
			</Card>
		</DemoCard>

		<DemoCard
			title="With footer"
			description="Footer content stays visually attached to the card."
			code={`<Card title="Billing" description="Current plan: Pro">
  <p>Your next invoice is scheduled for May 28.</p>

  {#snippet footer()}
    <Button size="sm">Manage plan</Button>
  {/snippet}
</Card>`}
		>
			<Card title="Billing" description="Current plan: Pro" class="max-w-sm">
				<p class="text-kl-base-content text-sm">Your next invoice is scheduled for May 28.</p>

				{#snippet footer()}
					<Button size="sm">Manage plan</Button>
				{/snippet}
			</Card>
		</DemoCard>

		<DemoCard
			title="With image"
			description="Compose CardImage as the leading media area."
			code={`<Card.Root class="max-w-sm">
  <Card.Image
    src="${cardImageSrc}"
    alt="Desk with laptop and notebook"
  />
  <Card.Header>
    <Card.Title>Team workspace</Card.Title>
    <Card.Description>Planning board and weekly notes</Card.Description>
  </Card.Header>
  <Card.Content>
    <p class="text-sm text-kl-base-content">
      Keep project context and current priorities in one place.
    </p>
  </Card.Content>
</Card.Root>`}
		>
			<CardRoot class="max-w-sm">
				<CardImage src={cardImageSrc} alt="Desk with laptop and notebook" />
				<CardHeader>
					<CardTitle>Team workspace</CardTitle>
					<CardDescription>Planning board and weekly notes</CardDescription>
				</CardHeader>
				<CardContent>
					<p class="text-kl-base-content text-sm">
						Keep project context and current priorities in one place.
					</p>
				</CardContent>
			</CardRoot>
		</DemoCard>

		<DemoCard
			title="Custom content"
			description="Use class to adjust layout while keeping theme defaults."
			code={`<Card class="max-w-sm">
  <div class="flex items-center justify-between">
    <div>
      <p class="font-semibold">Conversion</p>
      <p class="text-sm text-kl-muted-content">Last 30 days</p>
    </div>
    <span class="text-kl-success font-semibold">+12.4%</span>
  </div>
</Card>`}
		>
			<Card class="max-w-sm">
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="font-semibold">Conversion</p>
						<p class="text-kl-muted-content text-sm">Last 30 days</p>
					</div>
					<span class="text-kl-success font-semibold">+12.4%</span>
				</div>
			</Card>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<h3 class="text-lg font-semibold">Card</h3>
		<PropsTable items={propsData} />
		<h3 class="text-lg font-semibold">CardImage</h3>
		<PropsTable items={cardImagePropsData} />
	</section>
</div>
