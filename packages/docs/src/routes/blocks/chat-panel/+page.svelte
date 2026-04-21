<script lang="ts">
	import { ChatPanel, ChatBubble } from '$blocks/chat-panel';
	import type { ChatMessage } from '$blocks/chat-panel/ChatPanel.svelte';
	import DemoCard from '$lib/components/DemoCard.svelte';
	import PropsTable from '$lib/components/PropsTable.svelte';

	let messages: ChatMessage[] = $state([
		{
			id: '1',
			content: "Hey! How's the project going?",
			sender: 'Alice',
			avatar: 'AL',
			timestamp: '2:30 PM'
		},
		{
			id: '2',
			content: 'Going well! Just finished the new component system.',
			sent: true,
			timestamp: '2:31 PM',
			status: 'read'
		},
		{
			id: '3',
			content: "That's awesome. Can you show me a demo?",
			sender: 'Alice',
			avatar: 'AL',
			timestamp: '2:32 PM'
		},
		{
			id: '4',
			content: "Sure, I'll send a link in a sec.",
			sent: true,
			timestamp: '2:33 PM',
			status: 'delivered'
		}
	]);

	let nextId = 5;

	function handleSend(content: string) {
		messages = [
			...messages,
			{
				id: String(nextId++),
				content,
				sent: true,
				timestamp: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
				status: 'sent'
			}
		];
	}

	const minimalMessages: ChatMessage[] = [
		{ id: '1', content: 'Welcome! How can I help you today?', sender: 'Support', avatar: 'S' },
		{ id: '2', content: 'I have a question about my order.', sent: true, status: 'read' }
	];

	const statusMessages: ChatMessage[] = [
		{
			id: '1',
			content: 'Testing message statuses',
			sent: true,
			timestamp: '1:00 PM',
			status: 'sending'
		},
		{ id: '2', content: 'This one was sent', sent: true, timestamp: '1:01 PM', status: 'sent' },
		{
			id: '3',
			content: 'This was delivered',
			sent: true,
			timestamp: '1:02 PM',
			status: 'delivered'
		},
		{ id: '4', content: 'And this was read', sent: true, timestamp: '1:03 PM', status: 'read' }
	];

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

		<DemoCard
			title="Interactive"
			description="A full chat panel with header, messages, and working input. Type a message and press Enter to send."
			code={`<ChatPanel
  {messages}
  onSend={handleSend}
  title="Alice"
  subtitle="Online"
  headerAvatar="AL"
/>`}
		>
			<div class="h-[500px]">
				<ChatPanel
					{messages}
					onSend={handleSend}
					title="Alice"
					subtitle="Online"
					headerAvatar="AL"
					class="h-full"
				/>
			</div>
		</DemoCard>

		<DemoCard
			title="Without header"
			description="A minimal chat panel without the header section."
			code={`<ChatPanel
  messages={minimalMessages}
  onSend={handleSend}
/>`}
		>
			<div class="h-[350px]">
				<ChatPanel messages={minimalMessages} onSend={handleSend} class="h-full" />
			</div>
		</DemoCard>

		<DemoCard
			title="Message statuses"
			description="Sent messages can show delivery status indicators: sending, sent, delivered, and read."
			code={`<ChatPanel
  messages={statusMessages}
  title="Status Demo"
/>`}
		>
			<div class="h-[400px]">
				<ChatPanel messages={statusMessages} title="Status Demo" class="h-full" />
			</div>
		</DemoCard>

		<DemoCard
			title="Standalone ChatBubble"
			description="The ChatBubble component can be used independently for custom layouts."
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
		>
			<div class="flex flex-col gap-3">
				<ChatBubble content="Hello there!" sender="Alice" avatar="AL" timestamp="2:30 PM" />
				<ChatBubble content="Hi! How are you?" sent timestamp="2:31 PM" status="read" />
			</div>
		</DemoCard>
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
