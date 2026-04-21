<script lang="ts">
	import { Timer } from '$ui/timer';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let tickCount = $state(0);
	let completed = $state(false);

	const propsData = [
		{
			name: 'countdown',
			type: 'boolean',
			default: 'false',
			description: 'Count down instead of up'
		},
		{ name: 'startMs', type: 'number', default: '—', description: 'Start value in milliseconds' },
		{
			name: 'targetMs',
			type: 'number',
			default: '—',
			description: 'Target/stop value in milliseconds'
		},
		{ name: 'autoStart', type: 'boolean', default: 'false', description: 'Auto-start on mount' },
		{
			name: 'interval',
			type: 'number',
			default: '1000',
			description: 'Tick interval in milliseconds'
		},
		{
			name: 'segments',
			type: 'TimePart[]',
			default: '["hours","minutes","seconds"]',
			description: 'Time segments to display'
		},
		{
			name: 'showControls',
			type: 'boolean',
			default: 'true',
			description: 'Show start, pause, resume, and reset controls'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all interaction' },
		{
			name: 'onTick',
			type: '(details: TickDetails) => void',
			default: '—',
			description: 'Callback on each tick'
		},
		{
			name: 'onComplete',
			type: '() => void',
			default: '—',
			description: 'Callback when the timer completes'
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
		<h1 class="text-3xl font-bold">Timer</h1>
		<p class="text-kl-muted-content mt-2">
			Countdown and count-up timer with configurable segments and built-in controls. Built on bits-ui
			UI.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Count-up timer"
			description="Basic stopwatch counting up from zero. Press Start to begin."
			code={`<Timer segments={["minutes", "seconds"]} />`}
		>
			<Timer segments={['minutes', 'seconds']} />
		</DemoCard>

		<DemoCard
			title="Countdown timer"
			description="Counts down from 5 minutes. Starts automatically on mount."
			code={`<Timer
  countdown
  startMs={5 * 60 * 1000}
  autoStart
  segments={["minutes", "seconds"]}
/>`}
		>
			<Timer countdown startMs={5 * 60 * 1000} autoStart segments={['minutes', 'seconds']} />
		</DemoCard>

		<DemoCard
			title="Millisecond precision"
			description="High-frequency timer updating every 100ms showing milliseconds."
			code={`<Timer
  segments={["seconds", "milliseconds"]}
  interval={100}
/>`}
		>
			<Timer segments={['seconds', 'milliseconds']} interval={100} />
		</DemoCard>

		<DemoCard
			title="Full day display"
			description="Shows all time segments including days and hours for long-running timers."
			code={`<Timer segments={["days", "hours", "minutes", "seconds"]} />`}
		>
			<Timer segments={['days', 'hours', 'minutes', 'seconds']} />
		</DemoCard>

		<DemoCard
			title="Countdown with onComplete callback"
			description="Fires a callback when the countdown reaches zero."
			code={`let completed = $state(false);

<Timer
  countdown
  startMs={10 * 1000}
  segments={["seconds"]}
  onComplete={() => completed = true}
/>
{#if completed}
  <p>Time's up!</p>
{/if}`}
		>
			<div class="space-y-3">
				<Timer
					countdown
					startMs={10 * 1000}
					segments={['seconds']}
					onTick={(details) => {
						if (completed && details.value > 0) {
							completed = false;
							tickCount = 0;
						}
						tickCount += 1;
					}}
					onComplete={() => (completed = true)}
				/>
				{#if completed}
					<p class="text-kl-primary text-sm font-medium">Time's up!</p>
				{/if}
				<p class="text-kl-muted-content text-xs">Ticks received: {tickCount}</p>
			</div>
		</DemoCard>

		<DemoCard
			title="No controls"
			description="Timer display only — no action buttons shown."
			code={`<Timer segments={["minutes", "seconds"]} autoStart showControls={false} />`}
		>
			<Timer segments={['minutes', 'seconds']} autoStart showControls={false} />
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Timer in disabled state — all interaction is blocked."
			code={`<Timer segments={["minutes", "seconds"]} disabled />`}
		>
			<Timer segments={['minutes', 'seconds']} disabled />
		</DemoCard>
	</section>

	<!-- Props table -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Props</h2>
		<PropsTable items={propsData} />
	</section>
</div>
