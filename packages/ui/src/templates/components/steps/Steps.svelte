<script lang="ts">
	import { Check, ChevronLeft, ChevronRight } from 'lucide-svelte';
	import type { Snippet } from 'svelte';

	interface StepDefinition {
		label: string;
		description?: string;
	}

	interface Props {
		items: StepDefinition[];
		step?: number;
		linear?: boolean;
		orientation?: 'horizontal' | 'vertical';
		disabled?: boolean;
		class?: string;
		onStepChange?: (details: { step: number }) => void;
		onStepComplete?: () => void;
		content?: Snippet<[number]>;
		completed?: Snippet;
	}

	let {
		items,
		step = $bindable(0),
		linear = false,
		orientation = 'horizontal',
		disabled = false,
		class: className,
		onStepChange,
		onStepComplete,
		content,
		completed
	}: Props = $props();

	let isComplete = $derived(step >= items.length);

	function goTo(index: number) {
		if (disabled) return;
		if (linear && index > step) return;
		step = index;
		onStepChange?.({ step: index });
	}

	function prev() {
		if (step > 0) {
			step--;
			onStepChange?.({ step });
		}
	}

	function next() {
		if (step < items.length) {
			step++;
			onStepChange?.({ step });
			if (step >= items.length) {
				onStepComplete?.();
			}
		}
	}
</script>

<div class="flex flex-col gap-4 {className ?? ''}">
	<div
		class="flex items-center gap-0 {orientation === 'vertical' ? 'flex-col items-stretch' : ''}"
		role="tablist"
		aria-label="Steps"
	>
		{#each items as item, i}
			<div class="flex items-center gap-2 {i < items.length - 1 ? 'flex-1' : ''}">
				<button
					{disabled}
					onclick={() => goTo(i)}
					role="tab"
					aria-selected={step === i}
					aria-current={step === i ? 'step' : undefined}
					class="rounded-kl-field text-kl-muted-content flex items-center gap-2 px-2 py-1.5 text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 {step ===
					i
						? 'text-kl-primary'
						: ''} {step > i ? 'text-kl-primary' : ''} {step < i
						? 'hover:text-kl-base-content'
						: ''}"
				>
					<span
						class="border-kl-base-300 bg-kl-base-100 text-kl-muted-content flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors duration-150 {step ===
						i
							? 'border-kl-primary bg-kl-primary text-kl-primary-content'
							: ''} {step > i ? 'border-kl-primary bg-kl-primary text-kl-primary-content' : ''}"
					>
						{#if step > i}
							<Check size={14} />
						{:else}
							{i + 1}
						{/if}
					</span>
					<span class="hidden sm:inline">
						{item.label}
						{#if item.description}
							<span class="text-kl-muted-content block text-xs font-normal">{item.description}</span
							>
						{/if}
					</span>
				</button>
				{#if i < items.length - 1}
					<div
						class="bg-kl-base-300 mx-1 h-0.5 flex-1 rounded transition-colors duration-150 {step > i
							? 'bg-kl-primary'
							: ''}"
					></div>
				{/if}
			</div>
		{/each}
	</div>

	{#if isComplete}
		<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
			{#if completed}
				{@render completed()}
			{:else}
				<div class="text-kl-base-content flex items-center gap-2 text-sm">
					<Check size={16} class="text-kl-primary" />
					All steps completed!
				</div>
			{/if}
		</div>
	{:else if content}
		<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4" role="tabpanel">
			{@render content(step)}
		</div>
	{/if}

	<div class="flex items-center justify-between">
		<button
			onclick={prev}
			disabled={disabled || step === 0}
			class="rounded-kl-field border-kl-base-300 bg-kl-base-100 text-kl-base-content hover:bg-kl-base-200 inline-flex items-center gap-1.5 border px-3 py-2 text-sm font-medium transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50"
		>
			<ChevronLeft size={16} />
			Previous
		</button>
		<button
			{disabled}
			onclick={next}
			class="rounded-kl-field bg-kl-primary text-kl-primary-content inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors duration-150 hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
		>
			Next
			<ChevronRight size={16} />
		</button>
	</div>
</div>
