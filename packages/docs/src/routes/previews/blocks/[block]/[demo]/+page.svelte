<script lang="ts">
	import { page } from '$app/stores';
	import {
		AppShell,
		AppShellProvider,
		BottomNavBar,
		SideNavBar,
		TopNavBar
	} from '$blocks/app-shell';
	import { ChatBubble, ChatPanel } from '$blocks/chat-panel';
	import type { ChatMessage } from '$blocks/chat-panel/ChatPanel.svelte';
	import {
		demoBrand,
		horizontalGroups,
		initialChatMessages,
		minimalMessages,
		neutralSignInAction,
		sidebarGroups,
		signInAction,
		statusMessages,
		storefrontBrand,
		upgradeAction,
		userMenu
	} from '$lib/block-demo-data';

	const demoKey = $derived(`${$page.params.block}/${$page.params.demo}`);

	let messages: ChatMessage[] = $state(initialChatMessages);
	let nextId = $state(5);

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
</script>

<svelte:head>
	<title>Block preview</title>
</svelte:head>

<div class="bg-kl-base-200 text-kl-base-content h-dvh min-h-0 overflow-hidden">
	{#if demoKey === 'app-shell/side-and-top-navigation'}
		<AppShellProvider currentPath="https://example.com/dashboard/crm/deals">
			<SideNavBar side="left" brand={demoBrand} groups={sidebarGroups} {userMenu} />
			<TopNavBar groups={horizontalGroups} action={upgradeAction} />

			<AppShell>
				<div class="space-y-5">
					<div class="flex flex-wrap items-end justify-between gap-3">
						<div>
							<h1 class="text-2xl font-semibold">CRM Overview</h1>
							<p class="text-kl-muted-content mt-1 text-sm">
								Pipeline activity and revenue health.
							</p>
						</div>
						<div class="text-kl-muted-content text-sm">2026</div>
					</div>

					<div class="grid gap-4 md:grid-cols-3">
						{#each [['Customers', '4,235', '+8.84%'], ['Revenue', '$75,400', '+13.5%'], ['Closed Deals', '574', '-2.4%']] as metric (metric[0])}
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
								<div class="text-kl-muted-content text-sm">{metric[0]}</div>
								<div class="mt-3 flex items-end justify-between gap-2">
									<div class="text-2xl font-semibold">{metric[1]}</div>
									<div
										class="rounded-kl-selector bg-kl-success/15 text-kl-success px-2 py-1 text-xs font-semibold"
									>
										{metric[2]}
									</div>
								</div>
							</div>
						{/each}
					</div>

					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
						<div class="mb-4 flex items-center justify-between">
							<h2 class="font-semibold">Sales metrics</h2>
							<span class="text-kl-muted-content text-xs">Realtime</span>
						</div>
						<div class="flex h-64 items-end gap-2">
							{#each [34, 48, 58, 72, 64, 86, 52, 74, 44, 92, 66, 79] as value (value)}
								<div class="flex flex-1 items-end gap-1">
									<div
										class="bg-kl-secondary h-[calc(var(--bar)*1%)] flex-1 rounded-t"
										style:--bar={value}
									></div>
									<div
										class="bg-kl-primary h-[calc(var(--bar)*1%)] flex-1 rounded-t"
										style:--bar={Math.max(18, 100 - value)}
									></div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</AppShell>
		</AppShellProvider>
	{:else if demoKey === 'app-shell/bottom-bar-on-mobile'}
		<AppShellProvider currentPath="https://example.com/product" mobileBar="bottom">
			<BottomNavBar
				brand={storefrontBrand}
				groups={horizontalGroups}
				action={neutralSignInAction}
			/>
			<AppShell>
				<div class="grid gap-4 md:grid-cols-3">
					{#each [['Orders', '1,248'], ['Revenue', '$28.4k'], ['Conversion', '7.8%']] as item (item[0])}
						<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
							<div class="text-kl-muted-content text-sm">{item[0]}</div>
							<div class="mt-3 text-2xl font-semibold">{item[1]}</div>
						</div>
					{/each}
				</div>
			</AppShell>
		</AppShellProvider>
	{:else if demoKey === 'app-shell/standalone-top-bar'}
		<TopNavBar
			brand={demoBrand}
			groups={horizontalGroups}
			{userMenu}
			currentPath="https://example.com/solutions/crm"
		/>
		<main class="p-4 sm:p-6">
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-5">
				<h1 class="font-semibold">Standalone content</h1>
				<p class="text-kl-muted-content mt-1 text-sm">
					The bar can be used without AppShell while keeping the same data model.
				</p>
			</div>
		</main>
	{:else if demoKey === 'navbars/top-navbar'}
		<TopNavBar
			brand={demoBrand}
			groups={horizontalGroups}
			{userMenu}
			currentPath="https://example.com/solutions/crm"
		/>
	{:else if demoKey === 'navbars/bottom-navbar'}
		<main class="min-h-32 p-4">
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
				<div class="font-semibold">Content above the bottom bar</div>
				<div class="text-kl-muted-content mt-1 text-sm">Dropdowns open upward.</div>
			</div>
		</main>
		<BottomNavBar
			brand={demoBrand}
			groups={horizontalGroups}
			action={signInAction}
			currentPath="https://example.com/pricing"
		/>
	{:else if demoKey === 'navbars/side-navbar'}
		<div class="flex h-full min-h-0 overflow-hidden">
			<SideNavBar
				brand={demoBrand}
				groups={sidebarGroups}
				{userMenu}
				currentPath="https://example.com/dashboard/crm/deals"
			/>

			<main class="min-h-0 min-w-0 flex-1 overflow-auto p-4 sm:p-6">
				<div class="space-y-5">
					<div class="flex flex-wrap items-end justify-between gap-3">
						<div>
							<h1 class="text-xl font-semibold">Deal command center</h1>
							<p class="text-kl-muted-content mt-1 text-sm">
								Standalone sidebar over real page content.
							</p>
						</div>
						<div
							class="rounded-kl-selector bg-kl-success/15 text-kl-success px-2.5 py-1 text-xs font-semibold"
						>
							Live
						</div>
					</div>

					<div class="grid gap-3 sm:grid-cols-3">
						{#each [['Pipeline', '$428k'], ['Deals', '32'], ['Close rate', '28%']] as metric (metric[0])}
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
								<div class="text-kl-muted-content text-xs font-medium">{metric[0]}</div>
								<div class="mt-2 text-2xl font-semibold">{metric[1]}</div>
							</div>
						{/each}
					</div>

					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border">
						<div class="border-kl-base-300 flex items-center justify-between border-b p-4">
							<h2 class="font-semibold">Active deals</h2>
							<span class="text-kl-muted-content text-xs">This week</span>
						</div>
						<div class="divide-kl-base-300 divide-y">
							{#each [['Northstar Labs', '$84k', 'Negotiation'], ['Luma Health', '$42k', 'Security review'], ['Cedar Bank', '$97k', 'Procurement'], ['Vector Works', '$51k', 'Pilot']] as deal (deal[0])}
								<div class="grid gap-2 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
									<div class="min-w-0">
										<div class="truncate font-medium">{deal[0]}</div>
										<div class="text-kl-muted-content mt-1 text-sm">{deal[2]}</div>
									</div>
									<div class="font-mono text-sm font-semibold">{deal[1]}</div>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</main>
		</div>
	{:else if demoKey === 'chat-panel/interactive'}
		<div class="mx-auto h-screen max-w-2xl p-4">
			<ChatPanel
				{messages}
				onSend={handleSend}
				title="Alice"
				subtitle="Online"
				headerAvatar="AL"
				class="h-full"
			/>
		</div>
	{:else if demoKey === 'chat-panel/without-header'}
		<div class="mx-auto h-screen max-w-2xl p-4">
			<ChatPanel messages={minimalMessages} onSend={handleSend} class="h-full" />
		</div>
	{:else if demoKey === 'chat-panel/message-statuses'}
		<div class="mx-auto h-screen max-w-2xl p-4">
			<ChatPanel messages={statusMessages} title="Status Demo" class="h-full" />
		</div>
	{:else if demoKey === 'chat-panel/standalone-chat-bubble'}
		<div class="mx-auto flex min-h-screen max-w-2xl flex-col gap-3 p-4">
			<ChatBubble content="Hello there!" sender="Alice" avatar="AL" timestamp="2:30 PM" />
			<ChatBubble content="Hi! How are you?" sent timestamp="2:31 PM" status="read" />
		</div>
	{:else}
		<div class="flex min-h-screen items-center justify-center p-6">
			<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 border p-4">
				Preview not found.
			</div>
		</div>
	{/if}
</div>
