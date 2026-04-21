<script lang="ts">
	interface Props {
		/** Label text displayed above the dropzone */
		label?: string;
		/** Hint text shown inside the dropzone */
		hint?: string;
		/** Form field name for native submission */
		name?: string;
		/** Accepted file types (comma-separated MIME types or extensions) */
		accept?: string;
		/** Maximum number of files (set >1 for multi-upload) */
		maxFiles?: number;
		/** Maximum file size in bytes */
		maxFileSize?: number;
		/** Whether to allow drag and drop */
		allowDrop?: boolean;
		/** Whether to show image previews for accepted files */
		showPreview?: boolean;
		/** Disable the file upload */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Accept directories (webkit only) */
		directory?: boolean;
		/** Camera capture mode */
		capture?: 'user' | 'environment';
		/** Controlled accepted files. Supports bind:acceptedFiles */
		acceptedFiles?: File[];
		/** Callback when files change */
		onFileChange?: (details: { acceptedFiles: File[]; rejectedFiles: File[] }) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		hint = 'Drag and drop or click to upload',
		name,
		accept,
		maxFiles = 1,
		maxFileSize,
		allowDrop = true,
		showPreview = true,
		disabled = false,
		invalid = false,
		required = false,
		directory = false,
		capture,
		acceptedFiles = $bindable<File[]>([]),
		onFileChange,
		class: className
	}: Props = $props();

	let dragging = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	function isImageFile(file: File): boolean {
		return file.type.startsWith('image/');
	}

	function getPreviewUrl(file: File): string {
		return URL.createObjectURL(file);
	}

	function processFiles(fileList: FileList | null) {
		if (!fileList) return;
		const accepted: File[] = [];
		const rejected: File[] = [];

		for (const file of Array.from(fileList)) {
			if (maxFileSize && file.size > maxFileSize) {
				rejected.push(file);
				continue;
			}
			if (maxFiles && acceptedFiles.length + accepted.length >= maxFiles) {
				rejected.push(file);
				continue;
			}
			accepted.push(file);
		}

		if (maxFiles === 1 && accepted.length > 0) {
			acceptedFiles = [accepted[0]];
		} else {
			acceptedFiles = [...acceptedFiles, ...accepted];
		}
		onFileChange?.({ acceptedFiles, rejectedFiles: rejected });
	}

	function removeFile(index: number) {
		acceptedFiles = acceptedFiles.filter((_, i) => i !== index);
		onFileChange?.({ acceptedFiles, rejectedFiles: [] });
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		dragging = false;
		if (!allowDrop || disabled) return;
		processFiles(event.dataTransfer?.files ?? null);
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
		if (!disabled) dragging = true;
	}

	function handleDragLeave() {
		dragging = false;
	}

	function handleInputChange(event: Event) {
		const target = event.target as HTMLInputElement;
		processFiles(target.files);
		target.value = '';
	}
</script>

<div class="flex flex-col gap-2 {className ?? ''}">
	{#if label}
		<span
			class="text-kl-base-content text-sm font-medium {disabled ? 'text-kl-muted-content' : ''}"
		>
			{label}
		</span>
	{/if}

	<div
		ondrop={handleDrop}
		ondragover={handleDragOver}
		ondragleave={handleDragLeave}
		onclick={() => !disabled && inputEl?.click()}
		onkeydown={(e) => e.key === 'Enter' && !disabled && inputEl?.click()}
		role="button"
		tabindex={disabled ? -1 : 0}
		class="rounded-kl-box border-kl-base-300 bg-kl-base-100 flex min-h-36 flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-8 text-center transition-colors duration-150 {invalid
			? 'border-kl-error'
			: ''} {dragging ? 'border-kl-primary bg-kl-primary/5' : ''} {disabled
			? 'cursor-not-allowed opacity-50'
			: 'cursor-pointer'}"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="text-kl-muted-content size-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
			/>
		</svg>
		<p class="text-kl-muted-content text-sm">{hint}</p>
		<span
			class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
		>
			Choose file{maxFiles > 1 ? 's' : ''}
		</span>
	</div>

	<input
		bind:this={inputEl}
		type="file"
		{accept}
		{name}
		{disabled}
		{required}
		multiple={maxFiles > 1}
		webkitdirectory={directory || undefined}
		{capture}
		onchange={handleInputChange}
		class="hidden"
	/>

	{#if acceptedFiles.length > 0}
		<div class="flex flex-col gap-2">
			{#each acceptedFiles as file, index (`${file.name}-${file.size}-${file.lastModified}`)}
				<div
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 flex items-center gap-3 border p-3"
				>
					{#if showPreview}
						<div
							class="rounded-kl-selector bg-kl-base-200 flex size-10 shrink-0 items-center justify-center overflow-hidden"
						>
							{#if isImageFile(file)}
								<img src={getPreviewUrl(file)} alt={file.name} class="size-full object-cover" />
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-kl-muted-content size-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
									/>
								</svg>
							{/if}
						</div>
					{/if}

					<div class="min-w-0 flex-1">
						<p class="text-kl-base-content truncate text-sm font-medium">{file.name}</p>
						<p class="text-kl-muted-content text-xs">{formatSize(file.size)}</p>
					</div>

					<button
						onclick={() => removeFile(index)}
						class="rounded-kl-selector text-kl-muted-content hover:bg-kl-base-200 hover:text-kl-error shrink-0 p-1.5 transition-colors"
						aria-label="Remove {file.name}"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="size-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			{/each}
		</div>
	{/if}
</div>
