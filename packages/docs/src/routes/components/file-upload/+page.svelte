<script lang="ts">
	import { FileUpload } from '$ui/file-upload';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let acceptedFiles = $state<File[]>([]);
	let rejectedInfo = $state('');
	let formResult = $state('');

	const propsData = [
		{
			name: 'label',
			type: 'string',
			default: '—',
			description: 'Label text displayed above the dropzone'
		},
		{
			name: 'hint',
			type: 'string',
			default: '"Drag and drop or click to upload"',
			description: 'Hint text shown inside the dropzone'
		},
		{
			name: 'name',
			type: 'string',
			default: '—',
			description: 'Form field name for native submission'
		},
		{
			name: 'accept',
			type: 'string',
			default: '—',
			description: 'Accepted file types (comma-separated MIME types or extensions)'
		},
		{
			name: 'maxFiles',
			type: 'number',
			default: '1',
			description: 'Maximum number of files (set >1 for multi-upload)'
		},
		{
			name: 'maxFileSize',
			type: 'number',
			default: '—',
			description: 'Maximum file size in bytes'
		},
		{
			name: 'allowDrop',
			type: 'boolean',
			default: 'true',
			description: 'Whether to allow drag and drop'
		},
		{
			name: 'showPreview',
			type: 'boolean',
			default: 'true',
			description: 'Show image previews for accepted files'
		},
		{ name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the file upload' },
		{ name: 'invalid', type: 'boolean', default: 'false', description: 'Mark as invalid' },
		{ name: 'required', type: 'boolean', default: 'false', description: 'Mark as required' },
		{
			name: 'directory',
			type: 'boolean',
			default: 'false',
			description: 'Accept directories (webkit only)'
		},
		{
			name: 'capture',
			type: '"user" | "environment"',
			default: '—',
			description: 'Camera capture mode'
		},
		{
			name: 'acceptedFiles',
			type: 'File[]',
			default: '[]',
			description: 'Controlled accepted files. Supports bind:acceptedFiles'
		},
		{
			name: 'onFileChange',
			type: '(details: { acceptedFiles: File[]; rejectedFiles: File[] }) => void',
			default: '—',
			description: 'Callback when files change (accepted or rejected)'
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
		<h1 class="text-3xl font-bold">FileUpload</h1>
		<p class="text-kl-muted-content mt-2">
			A file upload component with drag-and-drop, previews, and validation.
		</p>
	</div>

	<!-- Demos -->
	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Single file upload with drag and drop."
			code="<FileUpload label=&quot;Attachment&quot; />"
		>
			<FileUpload label="Attachment" />
		</DemoCard>

		<DemoCard
			title="Multiple files"
			description="Allow multiple files with maxFiles."
			code={`<FileUpload label="Documents" maxFiles={5} />`}
		>
			<FileUpload label="Documents" maxFiles={5} />
		</DemoCard>

		<DemoCard
			title="Image only"
			description="Restrict to image files with accept."
			code={`<FileUpload
  label="Profile picture"
  accept="image/png, image/jpeg, image/webp"
/>`}
		>
			<FileUpload label="Profile picture" accept="image/png, image/jpeg, image/webp" />
		</DemoCard>

		<DemoCard
			title="File size limit"
			description="Reject files larger than 1 MB."
			code={`<FileUpload
  label="Upload (max 1 MB)"
  maxFileSize={1_048_576}
  onFileChange={(d) => rejectedInfo = d.rejectedFiles.map(f => f.name).join(", ")}
/>`}
		>
			<div class="space-y-2">
				<FileUpload
					label="Upload (max 1 MB)"
					maxFileSize={1_048_576}
					onFileChange={(d) => (rejectedInfo = d.rejectedFiles.map((f) => f.name).join(', '))}
				/>
				{#if rejectedInfo}
					<p class="text-kl-error text-sm">
						Rejected: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
							>{rejectedInfo}</code
						>
					</p>
				{/if}
			</div>
		</DemoCard>

		<DemoCard
			title="Controlled"
			description="Manage files externally with bind:acceptedFiles."
			code={`<FileUpload label="Files" bind:acceptedFiles maxFiles={3} />
<p>{acceptedFiles.length} file(s) selected</p>`}
		>
			<div class="space-y-2">
				<FileUpload label="Files" bind:acceptedFiles maxFiles={3} />
				<p class="text-kl-muted-content text-sm">
					<code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
						>{acceptedFiles.length}</code
					> file(s) selected
				</p>
			</div>
		</DemoCard>

		<DemoCard
			title="Disabled"
			description="Disabled state."
			code="<FileUpload label=&quot;Disabled upload&quot; disabled />"
		>
			<FileUpload label="Disabled upload" disabled />
		</DemoCard>

		<DemoCard
			title="Invalid"
			description="Shows error styling when validation fails."
			code="<FileUpload label=&quot;Invalid upload&quot; invalid />"
		>
			<FileUpload label="Invalid upload" invalid />
		</DemoCard>

		<DemoCard
			title="Form integration"
			description="Native form submission with the name prop."
			code={`<form onsubmit={handleSubmit}>
  <FileUpload label="Resume" name="resume" />
  <button type="submit">Submit</button>
</form>`}
		>
			<div class="space-y-3">
				<form
					onsubmit={(e) => {
						e.preventDefault();
						const data = new FormData(e.currentTarget);
						const files = data.getAll('resume');
						formResult =
							files.length > 0
								? files.map((f) => (f instanceof File ? f.name : String(f))).join(', ')
								: '(no file)';
					}}
					class="space-y-3"
				>
					<FileUpload label="Resume" name="resume" />
					<button
						type="submit"
						class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
					>
						Submit
					</button>
				</form>
				{#if formResult}
					<p class="text-kl-muted-content text-sm">
						Submitted: <code class="bg-kl-base-200 rounded px-1.5 py-0.5 font-mono text-xs"
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
