<script lang="ts">
	import { Toast } from '$ui/toast';
	import { toast } from 'svelte-sonner';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const propsData = [
		{
			name: 'position',
			type: '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
			default: '"bottom-right"',
			description: 'Where toasts appear on screen'
		},
		{
			name: 'expand',
			type: 'boolean',
			default: 'false',
			description: 'Expand toasts by default instead of stacking'
		},
		{
			name: 'richColors',
			type: 'boolean',
			default: 'true',
			description: 'Use colored borders for different toast types'
		},
		{
			name: 'closeButton',
			type: 'boolean',
			default: 'false',
			description: 'Show a close button on each toast'
		},
		{
			name: 'duration',
			type: 'number',
			default: '4000',
			description: 'Default duration in ms before auto-dismiss'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the toaster container'
		}
	];

	const toastMethodsData = [
		{
			name: 'toast(message)',
			type: 'function',
			default: '—',
			description: 'Show a basic toast with a message string'
		},
		{
			name: 'toast.success(message)',
			type: 'function',
			default: '—',
			description: 'Show a success toast'
		},
		{
			name: 'toast.error(message)',
			type: 'function',
			default: '—',
			description: 'Show an error toast'
		},
		{
			name: 'toast.info(message)',
			type: 'function',
			default: '—',
			description: 'Show an info toast'
		},
		{
			name: 'toast.warning(message)',
			type: 'function',
			default: '—',
			description: 'Show a warning toast'
		},
		{
			name: 'toast.loading(message)',
			type: 'function',
			default: '—',
			description: 'Show a loading toast'
		},
		{
			name: 'toast.promise(promise, opts)',
			type: 'function',
			default: '—',
			description: 'Show loading/success/error based on promise result'
		}
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Toast</h1>
		<p class="text-kl-muted-content mt-2">
			Non-intrusive notification toasts. Place the Toast component in your layout and call toast()
			to show notifications. Built on svelte-sonner.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<DemoCard
			title="Basic"
			description="Show a simple toast notification."
			code={`import { Toast, toast } from '$ui/toast';

<!-- Place once in your layout -->
<Toast />

<button onclick={() => toast("Hello! This is a toast.")}>
  Show toast
</button>`}
		>
			<button
				class="rounded-kl-field bg-kl-primary text-kl-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90"
				onclick={() => toast('Hello! This is a toast notification.')}
			>
				Show toast
			</button>
		</DemoCard>

		<DemoCard
			title="Toast types"
			description="Different types for different contexts: success, error, info, warning."
			code={`toast.success("Operation completed!");
toast.error("Something went wrong.");
toast.info("Here's some information.");
toast.warning("Watch out!");`}
		>
			<div class="flex flex-wrap gap-2">
				<button
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
					onclick={() => toast.info('Informational message.')}
				>
					Info
				</button>
				<button
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
					onclick={() => toast.success('Operation completed!')}
				>
					Success
				</button>
				<button
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
					onclick={() => toast.error('Something went wrong.')}
				>
					Error
				</button>
				<button
					class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
					onclick={() => toast.warning('Watch out!')}
				>
					Warning
				</button>
			</div>
		</DemoCard>

		<DemoCard
			title="With description"
			description="Toasts can have both a title and a longer description."
			code={`toast.success("Saved!", {
  description: "Your changes have been saved successfully."
});`}
		>
			<button
				class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
				onclick={() =>
					toast.success('Saved!', {
						description: 'Your changes have been saved successfully.'
					})}
			>
				Toast with description
			</button>
		</DemoCard>

		<DemoCard
			title="With action"
			description="Add an action button to the toast for user interaction."
			code={`toast("File deleted", {
  action: {
    label: "Undo",
    onClick: () => toast.success("Restored!")
  }
});`}
		>
			<button
				class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
				onclick={() =>
					toast('File deleted', {
						action: {
							label: 'Undo',
							onClick: () => toast.success('Restored!')
						}
					})}
			>
				Delete with undo
			</button>
		</DemoCard>

		<DemoCard
			title="Promise"
			description="Automatically show loading, success, and error states based on a promise."
			code={`toast.promise(
  new Promise((resolve) => setTimeout(resolve, 2000)),
  {
    loading: "Loading data...",
    success: "Data loaded!",
    error: "Failed to load."
  }
);`}
		>
			<button
				class="rounded-kl-field border-kl-base-300 bg-kl-base-100 border px-4 py-2 text-sm"
				onclick={() =>
					toast.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
						loading: 'Loading data...',
						success: 'Data loaded!',
						error: 'Failed to load.'
					})}
			>
				Promise toast
			</button>
		</DemoCard>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Toast Component Props</h2>
		<PropsTable items={propsData} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">toast() Methods</h2>
		<PropsTable items={toastMethodsData} />
	</section>
</div>

<Toast />
