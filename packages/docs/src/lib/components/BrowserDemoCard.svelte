<script lang="ts">
	let {
		title,
		description,
		code,
		src,
		browserTitle = `${title} preview`,
		height = 560,
		resizable = true
	}: {
		title: string;
		description?: string;
		code?: string;
		src: string;
		browserTitle?: string;
		height?: number | string;
		resizable?: boolean;
	} = $props();

	const MIN_PREVIEW_WIDTH = 288;
	const RESIZE_STEP = 32;

	let showCode = $state(false);
	let availableWidth = $state(0);
	let previewWidth = $state<number | undefined>();
	let isResizing = $state(false);
	let startX = 0;
	let startWidth = 0;

	const previewHeight = $derived(typeof height === 'number' ? `${height}px` : height);

	function clampPreviewWidth(width: number) {
		const max = availableWidth || width;
		const min = Math.min(MIN_PREVIEW_WIDTH, max);

		return Math.min(Math.max(width, min), max);
	}

	function handleResizeStart(event: PointerEvent) {
		if (!resizable) return;

		const handle = event.currentTarget as HTMLButtonElement | null;
		const preview = handle?.parentElement;

		if (!handle || !preview) return;

		isResizing = true;
		startX = event.clientX;
		startWidth = preview.getBoundingClientRect().width;
		previewWidth = startWidth;
		handle.setPointerCapture(event.pointerId);
	}

	function handleResizeMove(event: PointerEvent) {
		if (!isResizing) return;

		previewWidth = clampPreviewWidth(startWidth + event.clientX - startX);
	}

	function handleResizeEnd(event: PointerEvent) {
		const handle = event.currentTarget as HTMLButtonElement | null;

		if (!isResizing) return;

		isResizing = false;
		handle?.releasePointerCapture(event.pointerId);
	}

	function handleResizeKeydown(event: KeyboardEvent) {
		if (!resizable || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;

		event.preventDefault();
		const direction = event.key === 'ArrowRight' ? 1 : -1;
		previewWidth = clampPreviewWidth((previewWidth || availableWidth) + direction * RESIZE_STEP);
	}
</script>

<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border">
	<div class="border-kl-base-300 border-b px-4 py-3">
		<div class="flex items-center justify-between gap-4">
			<div class="min-w-0">
				<h3 class="text-kl-base-content font-semibold">{title}</h3>
				{#if description}
					<p class="text-kl-muted-content mt-1 text-sm">{description}</p>
				{/if}
			</div>
			{#if code}
				<button
					type="button"
					onclick={() => (showCode = !showCode)}
					class="rounded-kl-field text-kl-muted-content hover:bg-kl-muted hover:text-kl-base-content shrink-0 px-3 py-1.5 text-xs font-medium transition-colors"
				>
					{showCode ? 'Hide code' : 'Show code'}
				</button>
			{/if}
		</div>
	</div>

	<div class="p-4">
		<div class="flex justify-center overflow-x-auto" bind:clientWidth={availableWidth}>
			<div
				class="rounded-kl-field border-kl-base-300/70 bg-kl-base-100 relative max-w-full min-w-[min(18rem,100%)] overflow-hidden border"
				style:width={previewWidth ? `${previewWidth}px` : '100%'}
			>
				<iframe
					title={browserTitle}
					{src}
					class="block w-full border-0"
					style:height={previewHeight}
				></iframe>

				{#if resizable}
					<button
						type="button"
						aria-label="Resize browser preview"
						class="group rounded-r-kl-field absolute inset-y-0 right-0 flex w-3 cursor-ew-resize items-center justify-center outline-none"
						onpointerdown={handleResizeStart}
						onpointermove={handleResizeMove}
						onpointerup={handleResizeEnd}
						onpointercancel={handleResizeEnd}
						onkeydown={handleResizeKeydown}
					>
						<span
							class="bg-kl-base-300 group-hover:bg-kl-primary group-focus-visible:bg-kl-primary h-10 w-0.5 rounded-full transition-colors"
						></span>
					</button>
				{/if}
			</div>
		</div>
	</div>

	{#if code && showCode}
		<div class="border-kl-base-300 border-t">
			<pre class="bg-kl-base-200 overflow-x-auto p-4 font-mono text-sm">{code}</pre>
		</div>
	{/if}
</div>
