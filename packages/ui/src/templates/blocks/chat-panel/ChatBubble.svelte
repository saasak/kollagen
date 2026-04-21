<script lang="ts">
	import { Check, CheckCheck } from 'lucide-svelte';

	interface Props {
		/** Message content */
		content: string;
		/** Timestamp string (e.g. "2:34 PM") */
		timestamp?: string;
		/** Sender name (shown for received messages) */
		sender?: string;
		/** Avatar initials (e.g. "JD") */
		avatar?: string;
		/** Whether this message was sent by the current user */
		sent?: boolean;
		/** Message status for sent messages */
		status?: 'sending' | 'sent' | 'delivered' | 'read';
		/** Additional CSS classes */
		class?: string;
	}

	let {
		content,
		timestamp,
		sender,
		avatar,
		sent = false,
		status,
		class: className
	}: Props = $props();
</script>

<div class="flex gap-2 {sent ? 'flex-row-reverse justify-end' : 'flex-row'} {className ?? ''}">
	{#if !sent && avatar}
		<div
			class="bg-kl-secondary text-kl-secondary-content flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium"
		>
			{avatar}
		</div>
	{/if}

	<div class="flex max-w-[75%] flex-col {sent ? 'items-end' : 'items-start'}">
		{#if !sent && sender}
			<span class="text-kl-muted-content mb-1 text-xs font-medium">{sender}</span>
		{/if}

		<div
			class="rounded-kl-box px-3 py-2 text-sm {sent
				? 'bg-kl-primary text-kl-primary-content rounded-br-sm'
				: 'bg-kl-base-200 text-kl-base-content rounded-bl-sm'}"
		>
			{content}
		</div>

		{#if timestamp || (sent && status)}
			<div class="text-kl-muted-content mt-1 flex items-center gap-1 text-xs">
				{#if timestamp}
					<span>{timestamp}</span>
				{/if}
				{#if sent && status}
					{#if status === 'sending'}
						<span class="opacity-50">...</span>
					{:else if status === 'sent'}
						<Check size={12} />
					{:else if status === 'delivered'}
						<CheckCheck size={12} />
					{:else if status === 'read'}
						<CheckCheck size={12} class="text-kl-primary" />
					{/if}
				{/if}
			</div>
		{/if}
	</div>
</div>
