import type { ChatMessage } from '$blocks/chat-panel/ChatPanel.svelte';
import type { NavAction, NavBrand, NavGroup, NavUserMenu } from '$blocks/app-shell';
import {
	Bot,
	ChartNoAxesColumnIncreasing,
	Folder,
	LayoutDashboard,
	LogOut,
	MessageSquare,
	Settings,
	ShoppingBag
} from 'lucide-svelte';

export const demoBrand: NavBrand = {
	label: 'Nexus',
	logoSrc: '/favicon.png',
	href: 'https://example.com/dashboard'
};

export const storefrontBrand: NavBrand = {
	label: 'Storefront',
	logoSrc: '/favicon.png',
	href: 'https://example.com/product'
};

export const sidebarGroups: NavGroup[] = [
	{
		label: 'Overview',
		items: [
			{ label: 'Dashboard', href: 'https://example.com/dashboard', icon: LayoutDashboard },
			{
				label: 'CRM',
				href: 'https://example.com/dashboard/crm',
				icon: ChartNoAxesColumnIncreasing,
				match: 'startsWith',
				children: [
					{ label: 'Customers', href: 'https://example.com/dashboard/crm/customers' },
					{ label: 'Deals', href: 'https://example.com/dashboard/crm/deals', badge: '12' },
					{ label: 'Reports', href: 'https://example.com/dashboard/crm/reports' }
				]
			},
			{ label: 'Ecommerce', href: 'https://example.com/dashboard/ecommerce', icon: ShoppingBag }
		]
	},
	{
		label: 'Apps',
		items: [
			{ label: 'File manager', href: 'https://example.com/apps/files', icon: Folder },
			{ label: 'Chat', href: 'https://example.com/apps/chat', icon: MessageSquare },
			{ label: 'Gen AI', href: 'https://example.com/apps/ai', icon: Bot, badge: 'New' }
		]
	}
];

export const horizontalGroups: NavGroup[] = [
	{
		items: [
			{ label: 'Product', href: 'https://example.com/product' },
			{
				label: 'Solutions',
				href: 'https://example.com/solutions',
				children: [
					{
						label: 'CRM',
						href: 'https://example.com/solutions/crm',
						description: 'Pipeline and account work'
					},
					{
						label: 'Commerce',
						href: 'https://example.com/solutions/commerce',
						description: 'Orders and revenue'
					}
				]
			},
			{ label: 'Pricing', href: 'https://example.com/pricing' }
		]
	}
];

export const userMenu: NavUserMenu = {
	name: 'Denish N',
	email: 'owner@nexus.test',
	initials: 'DN',
	items: [
		{ label: 'Settings', icon: Settings },
		{ label: 'Log out', icon: LogOut, tone: 'error' }
	]
};

export const upgradeAction: NavAction = {
	label: 'Upgrade',
	href: 'https://example.com/billing',
	color: 'primary'
};
export const signInAction: NavAction = {
	label: 'Sign in',
	href: 'https://example.com/login',
	color: 'primary'
};
export const neutralSignInAction: NavAction = {
	label: 'Sign in',
	href: 'https://example.com/login',
	color: 'neutral'
};

export const initialChatMessages: ChatMessage[] = [
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
];

export const minimalMessages: ChatMessage[] = [
	{ id: '1', content: 'Welcome! How can I help you today?', sender: 'Support', avatar: 'S' },
	{ id: '2', content: 'I have a question about my order.', sent: true, status: 'read' }
];

export const statusMessages: ChatMessage[] = [
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
