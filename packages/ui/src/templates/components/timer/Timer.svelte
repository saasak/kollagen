<script lang="ts">
	import { Play, Pause, RotateCcw } from 'lucide-svelte';

	type TimePart = 'days' | 'hours' | 'minutes' | 'seconds';

	interface Props {
		/** Count down instead of up */
		countdown?: boolean;
		/** Start value in milliseconds */
		startMs?: number;
		/** Target/stop value in milliseconds */
		targetMs?: number;
		/** Auto-start on mount */
		autoStart?: boolean;
		/** Tick interval in milliseconds */
		interval?: number;
		/** Time segments to display */
		segments?: TimePart[];
		/** Show start, pause, resume, and reset controls */
		showControls?: boolean;
		/** Disable all interaction */
		disabled?: boolean;
		/** Callback on each tick */
		onTick?: (details: { time: number; segments: Record<TimePart, number> }) => void;
		/** Callback when the timer completes */
		onComplete?: () => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		countdown = false,
		startMs = 0,
		targetMs,
		autoStart = false,
		interval = 1000,
		segments = ['hours', 'minutes', 'seconds'],
		showControls = true,
		disabled = false,
		onTick,
		onComplete,
		class: className
	}: Props = $props();

	let elapsed = $state(countdown ? (startMs ?? 0) : 0);
	let running = $state(false);
	let paused = $state(false);
	let intervalId: ReturnType<typeof setInterval> | null = null;

	function getSegments(ms: number): Record<TimePart, number> {
		const totalSec = Math.floor(Math.abs(ms) / 1000);
		return {
			days: Math.floor(totalSec / 86400),
			hours: Math.floor((totalSec % 86400) / 3600),
			minutes: Math.floor((totalSec % 3600) / 60),
			seconds: totalSec % 60
		};
	}

	let display = $derived(getSegments(elapsed));

	function formatSegment(value: number): string {
		return String(value).padStart(2, '0');
	}

	function tick() {
		if (countdown) {
			elapsed -= interval;
			if (elapsed <= 0) {
				elapsed = 0;
				stop();
				onComplete?.();
				return;
			}
		} else {
			elapsed += interval;
			if (targetMs != null && elapsed >= targetMs) {
				elapsed = targetMs;
				stop();
				onComplete?.();
				return;
			}
		}
		onTick?.({ time: elapsed, segments: getSegments(elapsed) });
	}

	function start() {
		if (running) return;
		running = true;
		paused = false;
		intervalId = setInterval(tick, interval);
	}

	function pause() {
		if (!running) return;
		running = false;
		paused = true;
		if (intervalId) clearInterval(intervalId);
		intervalId = null;
	}

	function resume() {
		if (!paused) return;
		start();
	}

	function reset() {
		stop();
		elapsed = countdown ? (startMs ?? 0) : 0;
	}

	function stop() {
		running = false;
		paused = false;
		if (intervalId) clearInterval(intervalId);
		intervalId = null;
	}

	$effect(() => {
		if (autoStart) start();
		return () => {
			if (intervalId) clearInterval(intervalId);
		};
	});
</script>

<div
	inert={disabled || undefined}
	class="inline-flex flex-col items-center gap-4 {disabled
		? 'pointer-events-none opacity-50'
		: ''} {className ?? ''}"
	aria-disabled={disabled || undefined}
>
	<div class="flex items-center gap-0.5" role="timer" aria-live="polite">
		{#each segments as seg, i (seg)}
			<span
				class="rounded-kl-box bg-kl-base-200 text-kl-base-content flex h-16 w-14 items-center justify-center font-mono text-3xl font-bold tabular-nums"
			>
				{formatSegment(display[seg])}
			</span>
			{#if i < segments.length - 1}
				<span class="text-kl-muted-content px-0.5 text-2xl font-bold">:</span>
			{/if}
		{/each}
	</div>

	{#if showControls}
		<div class="flex items-center gap-2">
			{#if !running && !paused}
				<button
					onclick={start}
					class="rounded-kl-field bg-kl-primary text-kl-primary-content inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:opacity-90"
				>
					<Play size={14} />
					Start
				</button>
			{:else if running}
				<button
					onclick={pause}
					class="rounded-kl-field border-kl-base-300 bg-kl-base-200 text-kl-base-content hover:bg-kl-muted inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-sm font-medium transition-colors duration-150"
				>
					<Pause size={14} />
					Pause
				</button>
			{:else}
				<button
					onclick={resume}
					class="rounded-kl-field bg-kl-primary text-kl-primary-content inline-flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-sm font-medium transition-colors duration-150 hover:opacity-90"
				>
					<Play size={14} />
					Resume
				</button>
			{/if}

			{#if running || paused}
				<button
					onclick={reset}
					class="rounded-kl-field border-kl-base-300 bg-kl-base-200 text-kl-base-content hover:bg-kl-muted inline-flex cursor-pointer items-center gap-1.5 border px-3 py-1.5 text-sm font-medium transition-colors duration-150"
				>
					<RotateCcw size={14} />
					Reset
				</button>
			{/if}
		</div>
	{/if}
</div>
