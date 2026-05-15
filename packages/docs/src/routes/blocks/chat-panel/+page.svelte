<script lang="ts">
	import BrowserDemoCard from '$lib/components/BrowserDemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	const chatPanelProps = [
		{
			name: 'messages',
			type: 'ChatMessage[]',
			default: '[]',
			description: 'Array of messages to display'
		},
		{
			name: 'onSend',
			type: '(message: string) => void',
			default: '—',
			description: 'Callback when a message is submitted'
		},
		{
			name: 'title',
			type: 'string',
			default: '—',
			description: 'Header title (e.g. contact name)'
		},
		{
			name: 'subtitle',
			type: 'string',
			default: '—',
			description: 'Header subtitle (e.g. "Online")'
		},
		{ name: 'headerAvatar', type: 'string', default: '—', description: 'Header avatar initials' },
		{
			name: 'placeholder',
			type: 'string',
			default: '"Type a message..."',
			description: 'Placeholder text for the input'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Whether the input is disabled'
		},
		{
			name: 'header',
			type: 'Snippet',
			default: '—',
			description: 'Custom header snippet (overrides title/subtitle/headerAvatar)'
		},
		{
			name: 'class',
			type: 'string',
			default: '—',
			description: 'Additional CSS classes on the root container'
		}
	];

	const chatBubbleProps = [
		{ name: 'content', type: 'string', default: '—', description: 'Message content (required)' },
		{
			name: 'timestamp',
			type: 'string',
			default: '—',
			description: 'Timestamp string (e.g. "2:34 PM")'
		},
		{
			name: 'sender',
			type: 'string',
			default: '—',
			description: 'Sender name (shown for received messages)'
		},
		{ name: 'avatar', type: 'string', default: '—', description: 'Avatar initials (e.g. "JD")' },
		{
			name: 'sent',
			type: 'boolean',
			default: 'false',
			description: 'Whether this message was sent by the current user'
		},
		{
			name: 'status',
			type: '"sending" | "sent" | "delivered" | "read"',
			default: '—',
			description: 'Message delivery status (sent messages only)'
		},
		{ name: 'class', type: 'string', default: '—', description: 'Additional CSS classes' }
	];
</script>

<div class="space-y-8">
	<div>
		<h1 class="text-3xl font-bold">Chat Panel</h1>
		<p class="text-kl-muted-content mt-2">
			A complete chat interface with message bubbles, auto-scrolling message area, and an input with
			send button. Responsive with a 350px minimum width.
		</p>
	</div>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">Examples</h2>

		<BrowserDemoCard
			title="Interactive"
			description="A full chat panel with header, messages, and working input. Type a message and press Enter to send."
			src="/previews/blocks/chat-panel/interactive"
			height={500}
			code={`<ChatPanel
  {messages}
  onSend={handleSend}
  title="Alice"
  subtitle="Online"
  headerAvatar="AL"
/>`}
		/>

		<BrowserDemoCard
			title="Without header"
			description="A minimal chat panel without the header section."
			src="/previews/blocks/chat-panel/without-header"
			height={350}
			code={`<ChatPanel
  messages={minimalMessages}
  onSend={handleSend}
/>`}
		/>

		<BrowserDemoCard
			title="Message statuses"
			description="Sent messages can show delivery status indicators: sending, sent, delivered, and read."
			src="/previews/blocks/chat-panel/message-statuses"
			height={400}
			code={`<ChatPanel
  messages={statusMessages}
  title="Status Demo"
/>`}
		/>

		<BrowserDemoCard
			title="Standalone ChatBubble"
			description="The ChatBubble component can be used independently for custom layouts."
			src="/previews/blocks/chat-panel/standalone-chat-bubble"
			height={220}
			code={`<ChatBubble
  content="Hello there!"
  sender="Alice"
  avatar="AL"
  timestamp="2:30 PM"
/>
<ChatBubble
  content="Hi! How are you?"
  sent
  timestamp="2:31 PM"
  status="read"
/>`}
		/>
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">ChatPanel Props</h2>
		<PropsTable items={chatPanelProps} />
	</section>

	<section class="space-y-4">
		<h2 class="text-xl font-semibold">ChatBubble Props</h2>
		<PropsTable items={chatBubbleProps} />
	</section>
</div>
