<script lang="ts">
	import { Steps } from '$ui/steps';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const basicSteps = [
		{ label: 'Account', description: 'Create your account' },
		{ label: 'Profile', description: 'Set up your profile' },
		{ label: 'Review', description: 'Confirm your details' }
	];

	const onboardingSteps = [
		{ label: 'Welcome' },
		{ label: 'Preferences' },
		{ label: 'Notifications' },
		{ label: 'Done' }
	];

	let formResult = $state('');

	const propsData = [
		{
			name: 'items',
			type: 'StepDefinition[]',
			default: '—',
			description: 'Array of step definitions with label and optional description'
		},
		{
			name: 'step',
			type: 'number',
			default: '0',
			description: 'Controlled current step index. Supports bind:step'
		},
		{
			name: 'defaultStep',
			type: 'number',
			default: '—',
			description: 'Initial step for uncontrolled mode'
		},
		{
			name: 'linear',
			type: 'boolean',
			default: 'false',
			description: 'Require steps to be completed in order'
		},
		{
			name: 'orientation',
			type: '"horizontal" | "vertical"',
			default: '"horizontal"',
			description: 'Layout orientation of the step indicators'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disable all step navigation'
		},
		{
			name: 'onStepChange',
			type: '(details: { step: number }) => void',
			default: '—',
			description: 'Callback when the active step changes'
		},
		{
			name: 'onStepComplete',
			type: '() => void',
			default: '—',
			description: 'Callback when all steps are completed'
		},
		{
			name: 'content',
			type: 'Snippet<[number]>',
			default: '—',
			description: 'Render snippet for step content. Receives step index'
		},
		{
			name: 'completed',
			type: 'Snippet',
			default: '—',
			description: 'Render snippet for completed state'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root element'
		}
	];
</script>

<div class="space-y-8">
	<!-- Header -->
	<div>
		<h1 class="text-3xl font-bold">Steps</h1>
		<p class="text-kl-muted-content mt-2">
			Multi-step wizard with navigation, progress indicators, and completion state. Built on Ark UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="A simple three-step wizard with next/previous navigation."
			code={`<Steps
  items={[
    { label: "Account", description: "Create your account" },
    { label: "Profile", description: "Set up your profile" },
    { label: "Review", description: "Confirm your details" },
  ]}
>
  {#snippet content(index)}
    {#if index === 0}
      <p>Enter your email and password.</p>
    {:else if index === 1}
      <p>Tell us about yourself.</p>
    {:else}
      <p>Review and submit your information.</p>
    {/if}
  {/snippet}
</Steps>`}
		>
			<div class="max-w-lg">
				<Steps items={basicSteps}>
					{#snippet content(index)}
						{#if index === 0}
							<p class="text-kl-base-content text-sm">
								Enter your email and password to get started.
							</p>
						{:else if index === 1}
							<p class="text-kl-base-content text-sm">Tell us a bit about yourself.</p>
						{:else}
							<p class="text-kl-base-content text-sm">Review your information before submitting.</p>
						{/if}
					{/snippet}
				</Steps>
			</div>
		</DemoCard>

		<DemoCard
			title="Linear mode"
			description="Steps must be completed in order — users cannot skip ahead."
			code={`<Steps items={steps} linear={true}>
  {#snippet content(index)}
    <p>Step {index + 1} content</p>
  {/snippet}
</Steps>`}
		>
			<div class="max-w-lg">
				<Steps items={basicSteps} linear={true}>
					{#snippet content(index)}
						<p class="text-kl-base-content text-sm">
							Complete step {index + 1} before moving forward.
						</p>
					{/snippet}
				</Steps>
			</div>
		</DemoCard>

		<DemoCard
			title="Custom completed state"
			description="Provide a custom snippet for the completed state."
			code={`<Steps items={steps}>
  {#snippet content(index)}
    <p>Step {index + 1} content</p>
  {/snippet}
  {#snippet completed()}
    <div class="text-center">
      <p class="text-lg font-semibold">🎉 All done!</p>
      <p>You've completed the setup wizard.</p>
    </div>
  {/snippet}
</Steps>`}
		>
			<div class="max-w-lg">
				<Steps items={onboardingSteps}>
					{#snippet content(index)}
						<p class="text-kl-base-content text-sm">Content for step {index + 1}.</p>
					{/snippet}
					{#snippet completed()}
						<div class="text-center">
							<p class="text-kl-primary text-lg font-semibold">All done!</p>
							<p class="text-kl-muted-content text-sm">You've completed the onboarding wizard.</p>
						</div>
					{/snippet}
				</Steps>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Steps navigation in disabled state."
			code={`<Steps items={steps} disabled={true}>
  {#snippet content(index)}
    <p>Step {index + 1} content</p>
  {/snippet}
</Steps>`}
		>
			<div class="max-w-lg">
				<Steps items={basicSteps} disabled={true}>
					{#snippet content(index)}
						<p class="text-kl-base-content text-sm">Step {index + 1} is locked.</p>
					{/snippet}
				</Steps>
			</div>
		</DemoCard>

		<DemoCard
			title="Step change callback"
			description="Track step changes with the onStepChange callback."
			code={`<Steps
  items={steps}
  onStepChange={(details) => {
    currentStep = details.step;
  }}
>
  {#snippet content(index)}
    <p>Step {index + 1}</p>
  {/snippet}
</Steps>`}
		>
			<div class="max-w-lg space-y-3">
				<Steps
					items={basicSteps}
					onStepChange={(details) => {
						formResult = `Moved to step ${details.step + 1}`;
					}}
				>
					{#snippet content(index)}
						<p class="text-kl-base-content text-sm">You are on step {index + 1}.</p>
					{/snippet}
				</Steps>
				{#if formResult}
					<p class="text-kl-muted-content text-sm">
						Event: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{formResult}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
