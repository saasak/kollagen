<script lang="ts">
	import { browser } from '$app/environment';
	import { Accordion } from '$ui/accordion';
	import { Alert } from '$ui/alert';
	import { Badge } from '$ui/badge';
	import { Button } from '$ui/button';
	import { ButtonGroup } from '$ui/button-group';
	import { Card } from '$ui/card';
	import { Checkbox } from '$ui/checkbox';
	import { Clipboard } from '$ui/clipboard';
	import {
		DataTable,
		createDataTableQuery,
		type DataTableColumn,
		type DataTableQuery
	} from '$ui/data-table';
	import { DatePicker } from '$ui/date-picker';
	import { Field } from '$ui/field';
	import { FileUpload } from '$ui/file-upload';
	import { NumberInput } from '$ui/number-input';
	import { Pagination } from '$ui/pagination';
	import { PasswordInput } from '$ui/password-input';
	import { Progress } from '$ui/progress';
	import { QrCode } from '$ui/qr-code';
	import { RadioGroup } from '$ui/radio-group';
	import { RatingGroup } from '$ui/rating-group';
	import { Separator } from '$ui/separator';
	import { Select } from '$ui/select';
	import { Slider } from '$ui/slider';
	import { Skeleton } from '$ui/skeleton';
	import { Steps } from '$ui/steps';
	import { Switch } from '$ui/switch';
	import { Tabs } from '$ui/tabs';
	import { TagsInput } from '$ui/tags-input';
	import { Timer } from '$ui/timer';
	import { Tooltip } from '$ui/tooltip';
	import { Toggle } from '$ui/toggle';
	import { TreeView } from '$ui/tree-view';
	import { ChatPanel } from '$blocks/chat-panel';
	import { getFontPreset } from '$lib/font-presets';
	import { parseDate } from '@internationalized/date';
	import { onMount } from 'svelte';

	type TokenDefinition = {
		name: string;
		variable: string;
		kind: 'color' | 'value';
	};

	type TokenValue = TokenDefinition & {
		value: string;
	};

	type TokenGroup = {
		title: string;
		tokens: TokenValue[];
	};

	type ThemeSnapshot = {
		themeName: string;
		modeName: 'light' | 'dark';
		fontId: string;
		fontName: string;
		groups: TokenGroup[];
	};

	type Order = {
		id: string;
		customer: string;
		status: 'Paid' | 'Pending' | 'Failed';
		channel: string;
		total: number;
		date: string;
	};

	type ChatMessage = {
		id: string;
		content: string;
		timestamp?: string;
		sender?: string;
		avatar?: string;
		sent?: boolean;
		status?: 'sending' | 'sent' | 'delivered' | 'read';
	};

	const tokenDefinitions: Array<{ title: string; tokens: TokenDefinition[] }> = [
		{
			title: 'Brand',
			tokens: [
				{ name: 'Primary', variable: '--kl-primary', kind: 'color' },
				{ name: 'Primary content', variable: '--kl-primary-content', kind: 'color' },
				{ name: 'Secondary', variable: '--kl-secondary', kind: 'color' },
				{ name: 'Secondary content', variable: '--kl-secondary-content', kind: 'color' },
				{ name: 'Accent', variable: '--kl-accent', kind: 'color' },
				{ name: 'Accent content', variable: '--kl-accent-content', kind: 'color' },
				{ name: 'Neutral', variable: '--kl-neutral', kind: 'color' },
				{ name: 'Neutral content', variable: '--kl-neutral-content', kind: 'color' }
			]
		},
		{
			title: 'Surfaces',
			tokens: [
				{ name: 'Base 100', variable: '--kl-base-100', kind: 'color' },
				{ name: 'Base 200', variable: '--kl-base-200', kind: 'color' },
				{ name: 'Base 300', variable: '--kl-base-300', kind: 'color' },
				{ name: 'Base content', variable: '--kl-base-content', kind: 'color' },
				{ name: 'Muted', variable: '--kl-muted', kind: 'color' },
				{ name: 'Muted content', variable: '--kl-muted-content', kind: 'color' },
				{ name: 'Page background', variable: '--kl-page-background', kind: 'value' },
				{ name: 'Surface background', variable: '--kl-surface-background', kind: 'value' },
				{ name: 'Pattern image', variable: '--kl-pattern-image', kind: 'value' },
				{ name: 'Pattern opacity', variable: '--kl-pattern-opacity', kind: 'value' }
			]
		},
		{
			title: 'Status',
			tokens: [
				{ name: 'Info', variable: '--kl-info', kind: 'color' },
				{ name: 'Info content', variable: '--kl-info-content', kind: 'color' },
				{ name: 'Success', variable: '--kl-success', kind: 'color' },
				{ name: 'Success content', variable: '--kl-success-content', kind: 'color' },
				{ name: 'Warning', variable: '--kl-warning', kind: 'color' },
				{ name: 'Warning content', variable: '--kl-warning-content', kind: 'color' },
				{ name: 'Error', variable: '--kl-error', kind: 'color' },
				{ name: 'Error content', variable: '--kl-error-content', kind: 'color' }
			]
		},
		{
			title: 'Shape',
			tokens: [
				{ name: 'Selector radius', variable: '--kl-radius-selector', kind: 'value' },
				{ name: 'Field radius', variable: '--kl-radius-field', kind: 'value' },
				{ name: 'Box radius', variable: '--kl-radius-box', kind: 'value' },
				{ name: 'Selector size', variable: '--kl-size-selector', kind: 'value' },
				{ name: 'Field size', variable: '--kl-size-field', kind: 'value' },
				{ name: 'Border width', variable: '--kl-border-width', kind: 'value' },
				{ name: 'Strong border', variable: '--kl-border-width-strong', kind: 'value' },
				{ name: 'Outline width', variable: '--kl-outline-width', kind: 'value' },
				{ name: 'Strong outline', variable: '--kl-outline-width-strong', kind: 'value' },
				{ name: 'Outline offset', variable: '--kl-outline-offset', kind: 'value' }
			]
		},
		{
			title: 'Rendering',
			tokens: [
				{ name: 'Density', variable: '--kl-density', kind: 'value' },
				{ name: 'Reading density', variable: '--kl-density-reading', kind: 'value' },
				{ name: 'Depth', variable: '--kl-depth', kind: 'value' },
				{ name: 'Noise', variable: '--kl-noise', kind: 'value' },
				{ name: 'Motion scale', variable: '--kl-motion-scale', kind: 'value' },
				{ name: 'Contrast level', variable: '--kl-contrast-level', kind: 'value' }
			]
		},
		{
			title: 'Typography',
			tokens: [
				{ name: 'Body font', variable: '--kl-font-body', kind: 'value' },
				{ name: 'Heading font', variable: '--kl-font-heading', kind: 'value' },
				{ name: 'Display font', variable: '--kl-font-display', kind: 'value' },
				{ name: 'Mono font', variable: '--kl-font-mono', kind: 'value' }
			]
		},
		{
			title: 'Elevation',
			tokens: [
				{ name: 'Shadow sm', variable: '--kl-shadow-sm', kind: 'value' },
				{ name: 'Shadow md', variable: '--kl-shadow-md', kind: 'value' },
				{ name: 'Shadow lg', variable: '--kl-shadow-lg', kind: 'value' },
				{ name: 'Inset', variable: '--kl-shadow-inset', kind: 'value' },
				{ name: 'Pressed', variable: '--kl-shadow-pressed', kind: 'value' },
				{ name: 'Raised', variable: '--kl-shadow-raised', kind: 'value' },
				{ name: 'Glow sm', variable: '--kl-glow-sm', kind: 'value' },
				{ name: 'Glow md', variable: '--kl-glow-md', kind: 'value' }
			]
		}
	];

	const tokenHelp: Record<string, string> = {
		'--kl-primary': 'Primary brand action color. Use it for the main action and selected states.',
		'--kl-primary-content': 'Readable foreground on primary backgrounds.',
		'--kl-secondary': 'Secondary brand color. Use it for alternate actions and accents.',
		'--kl-secondary-content': 'Readable foreground on secondary backgrounds.',
		'--kl-accent':
			'Decorative accent color. Use it sparingly for highlights and calls for attention.',
		'--kl-accent-content': 'Readable foreground on accent backgrounds.',
		'--kl-neutral': 'High-emphasis neutral color for solid neutral controls and strong UI chrome.',
		'--kl-neutral-content': 'Readable foreground on neutral backgrounds.',
		'--kl-base-100':
			'Main component surface. Cards, fields, popovers, and panels usually start here.',
		'--kl-base-200': 'Raised page surface and subtle fills behind components.',
		'--kl-base-300': 'Divider and low-emphasis border surface.',
		'--kl-base-content': 'Default text color across the theme.',
		'--kl-muted': 'Subdued background for quiet UI, disabled blocks, and soft fills.',
		'--kl-muted-content': 'Subdued foreground for helper text, placeholders, and metadata.',
		'--kl-page-background': 'Page-level background applied behind the preview.',
		'--kl-surface-background': 'Preferred surface background for composed panels.',
		'--kl-pattern-image': 'Optional page texture or pattern layered over the background.',
		'--kl-pattern-opacity': 'Opacity for the page texture overlay.',
		'--kl-info': 'Informational state color for notices, badges, and neutral feedback.',
		'--kl-info-content': 'Readable foreground on info backgrounds.',
		'--kl-success': 'Success state color for positive feedback and completed states.',
		'--kl-success-content': 'Readable foreground on success backgrounds.',
		'--kl-warning': 'Warning state color for caution and pending states.',
		'--kl-warning-content': 'Readable foreground on warning backgrounds.',
		'--kl-error': 'Error state color for destructive actions, validation, and failures.',
		'--kl-error-content': 'Readable foreground on error backgrounds.',
		'--kl-radius-selector':
			'Radius for selectors: checkbox, switch thumb, toggle, badges, and small controls.',
		'--kl-radius-field':
			'Radius for fields and actions: inputs, buttons, tabs, and similar controls.',
		'--kl-radius-box': 'Radius for containers: cards, modals, dropdowns, and larger panels.',
		'--kl-size-selector':
			'Selector scale. It changes checkboxes, toggles, switches, slider thumbs, and small control affordances.',
		'--kl-size-field':
			'Field scale. It changes input and button heights without touching global spacing.',
		'--kl-border-width': 'Default themed border width used by the Kollagen border utility.',
		'--kl-border-width-strong':
			'Derived strong border width. Used by border-strong, not edited directly.',
		'--kl-outline-width': 'Default focus outline width used by the Kollagen outline utility.',
		'--kl-outline-width-strong': 'Derived strong focus outline width for outline-strong.',
		'--kl-outline-offset': 'Distance between the element and its focus outline.',
		'--kl-density': 'Preview-only density marker. It no longer changes global spacing.',
		'--kl-density-reading':
			'Preview-only reading density marker for future text rhythm experiments.',
		'--kl-depth':
			'Tactility multiplier. It strengthens inset highlights, shadows, borders, and pressed states.',
		'--kl-noise':
			'Texture multiplier. It controls how visible/generated noise layers appear on themed surfaces.',
		'--kl-motion-scale':
			'Animation duration multiplier. Lower values make the theme feel snappier.',
		'--kl-contrast-level':
			'Theme contrast marker for comparing palettes and future contrast tuning.',
		'--kl-font-body': 'Primary application font used by body text and default controls.',
		'--kl-font-heading': 'Heading font used by h1-h6 and font-kl-heading.',
		'--kl-font-display': 'Display font for larger editorial or hero-style type.',
		'--kl-font-mono': 'Monospace font used by code, kbd, samp, pre, and font-mono.',
		'--kl-shadow-sm': 'Low elevation shadow for subtle surfaces.',
		'--kl-shadow-md': 'Medium elevation shadow for raised cards and controls.',
		'--kl-shadow-lg': 'High elevation shadow for prominent surfaces and overlays.',
		'--kl-shadow-inset': 'Inset shadow for pressed or recessed surfaces.',
		'--kl-shadow-pressed': 'Pressed-state shadow for active controls.',
		'--kl-shadow-raised': 'Reusable raised surface shadow.',
		'--kl-glow-sm': 'Small glow affordance for themes that use luminous accents.',
		'--kl-glow-md': 'Medium glow affordance for stronger emphasis.'
	};

	const palettePairs = [
		{ label: 'Primary', color: '--kl-primary', content: '--kl-primary-content' },
		{ label: 'Secondary', color: '--kl-secondary', content: '--kl-secondary-content' },
		{ label: 'Accent', color: '--kl-accent', content: '--kl-accent-content' },
		{ label: 'Neutral', color: '--kl-neutral', content: '--kl-neutral-content' },
		{ label: 'Info', color: '--kl-info', content: '--kl-info-content' },
		{ label: 'Success', color: '--kl-success', content: '--kl-success-content' },
		{ label: 'Warning', color: '--kl-warning', content: '--kl-warning-content' },
		{ label: 'Error', color: '--kl-error', content: '--kl-error-content' }
	];

	const buttonColors = [
		'base',
		'neutral',
		'primary',
		'secondary',
		'accent',
		'info',
		'success',
		'warning',
		'error'
	] as const;

	const buttonVariants = ['solid', 'outline', 'soft', 'ghost', 'dash'] as const;

	const selectItems = [
		{ label: 'Revenue operations', value: 'revops' },
		{ label: 'Product analytics', value: 'product' },
		{ label: 'Customer success', value: 'success' }
	];

	const radioItems = [
		{ label: 'Compact', value: 'compact' },
		{ label: 'Balanced', value: 'balanced' },
		{ label: 'Spacious', value: 'spacious' }
	];

	const steps = [
		{ label: 'Account', description: 'Workspace' },
		{ label: 'Billing', description: 'Plan' },
		{ label: 'Launch', description: 'Review' }
	];

	const accordionItems = [
		{ value: 'density', label: 'Density and rhythm' },
		{ value: 'depth', label: 'Depth and tactility' },
		{ value: 'contrast', label: 'Contrast and content' }
	];

	const treeNodes = [
		{
			value: 'theme',
			label: 'theme',
			children: [
				{ value: 'theme-colors', label: 'colors.css' },
				{ value: 'theme-effects', label: 'effects.css' }
			]
		},
		{
			value: 'components',
			label: 'components',
			children: [
				{ value: 'components-inputs', label: 'inputs' },
				{ value: 'components-overlays', label: 'overlays' }
			]
		}
	];

	const chatMessages: ChatMessage[] = [
		{
			id: '1',
			content: 'The new palette is live in staging.',
			timestamp: '09:24',
			sender: 'Maya',
			avatar: 'M',
			status: 'read'
		},
		{
			id: '2',
			content: 'Depth looks better on buttons. Cards still need a sharper edge.',
			timestamp: '09:26',
			sent: true,
			status: 'delivered'
		},
		{
			id: '3',
			content: 'I will compare it against the DaisyUI preview grid.',
			timestamp: '09:27',
			sender: 'Noah',
			avatar: 'N'
		}
	];

	const orders: Order[] = [
		{
			id: 'ORD-2401',
			customer: 'Northstar Labs',
			status: 'Paid',
			channel: 'Enterprise',
			total: 8400,
			date: '2026-05-06'
		},
		{
			id: 'ORD-2402',
			customer: 'Luma Health',
			status: 'Pending',
			channel: 'Self serve',
			total: 1280,
			date: '2026-05-08'
		},
		{
			id: 'ORD-2403',
			customer: 'Atlas Supply',
			status: 'Failed',
			channel: 'Partner',
			total: 690,
			date: '2026-05-09'
		},
		{
			id: 'ORD-2404',
			customer: 'Kairo Studio',
			status: 'Paid',
			channel: 'Self serve',
			total: 320,
			date: '2026-05-10'
		},
		{
			id: 'ORD-2405',
			customer: 'Cedar Bank',
			status: 'Paid',
			channel: 'Enterprise',
			total: 9700,
			date: '2026-05-11'
		}
	];

	const orderColumns: DataTableColumn<Order>[] = [
		{ id: 'id', label: 'Order', sortable: true },
		{ id: 'customer', label: 'Customer', sortable: true },
		{ id: 'status', label: 'Status', sortable: true },
		{ id: 'channel', label: 'Channel' },
		{ id: 'total', label: 'Total', align: 'right', sortable: true },
		{ id: 'date', label: 'Date' }
	];

	let themeRevision = $state(0);
	let reportEnabled = $state(true);
	let emailEnabled = $state(false);
	let compactPressed = $state(true);
	let selectedSegment = $state('balanced');
	let selectedProduct = $state('product');
	let sliderValue = $state([62]);
	let rangeValue = $state([25, 74]);
	let tags = $state(['contrast', 'surface', 'depth']);
	let seats = $state('14');
	let email = $state('design@saasak.test');
	let password = $state('kollagen-preview');
	let checkedTerms = $state(true);
	let selectedDate = $state(parseDate('2026-05-13'));
	let currentStep = $state(1);
	let rating = $state(4);
	let page = $state(2);
	let perPage = $state(10);
	let query: DataTableQuery = $state(createDataTableQuery({ perPage: 5 }));
	let expandedTree = $state(['theme', 'components']);
	let selectedTree = $state(['theme-colors']);
	let hasLiveOverrides = $state(false);
	let selectorRadius = $state([0.25]);
	let fieldRadius = $state([0.375]);
	let boxRadius = $state([0.375]);
	let fieldSize = $state([0.25]);
	let selectorSize = $state([0.25]);
	let borderWidth = $state([0.0625]);
	let outlineWidth = $state([0.125]);
	let outlineOffset = $state([0.125]);
	let depth = $state([1]);
	let noise = $state([0]);

	const snapshot = $derived.by(() => readSnapshot(themeRevision));
	const colorGroups = $derived(
		snapshot.groups.filter((group) => group.tokens.some((token) => token.kind === 'color'))
	);
	const shapeTokens = $derived(
		snapshot.groups.find((group) => group.title === 'Shape')?.tokens ?? []
	);
	const renderingTokens = $derived(
		snapshot.groups.find((group) => group.title === 'Rendering')?.tokens ?? []
	);
	const typographyTokens = $derived(
		snapshot.groups.find((group) => group.title === 'Typography')?.tokens ?? []
	);
	const selectedFont = $derived(getFontPreset(snapshot.fontId));
	const visibleOrders = $derived.by(() => {
		let rows = orders.filter((order) => matchesOrder(order, query.search));
		if (query.sort) {
			const direction = query.sort.direction === 'asc' ? 1 : -1;
			rows = [...rows].sort((a, b) => {
				const aValue = a[query.sort!.id as keyof Order];
				const bValue = b[query.sort!.id as keyof Order];
				if (aValue < bValue) return -1 * direction;
				if (aValue > bValue) return 1 * direction;
				return 0;
			});
		}
		return rows;
	});

	function readSnapshot(_revision = 0): ThemeSnapshot {
		if (!browser) {
			return {
				themeName: 'default',
				modeName: 'light',
				fontId: 'system',
				fontName: getFontPreset('system').label,
				groups: tokenDefinitions.map((group) => ({ title: group.title, tokens: [] }))
			};
		}

		const root = document.documentElement;
		const styles = getComputedStyle(root);
		const font = getFontPreset(root.dataset.font);
		return {
			themeName: root.dataset.theme || 'default',
			modeName: root.dataset.mode === 'dark' ? 'dark' : 'light',
			fontId: font.id,
			fontName: font.label,
			groups: tokenDefinitions.map((group) => ({
				title: group.title,
				tokens: group.tokens.map((token) => ({
					...token,
					value: styles.getPropertyValue(token.variable).trim()
				}))
			}))
		};
	}

	function getTokenValue(variable: string) {
		for (const group of snapshot.groups) {
			const token = group.tokens.find((item) => item.variable === variable);
			if (token) return token.value;
		}
		return '';
	}

	function matchesOrder(order: Order, search: string) {
		if (!search) return true;
		const needle = search.toLowerCase();
		return [order.id, order.customer, order.status, order.channel, order.date].some((value) =>
			value.toLowerCase().includes(needle)
		);
	}

	function currency(value: number) {
		return `$${value.toLocaleString()}`;
	}

	function readRemToken(styles: CSSStyleDeclaration, variable: string, fallback: number) {
		const rawValue = styles.getPropertyValue(variable).trim();
		const value = Number.parseFloat(rawValue);
		if (!Number.isFinite(value)) return fallback;
		if (rawValue.endsWith('px')) {
			const rootFontSize = Number.parseFloat(styles.fontSize) || 16;
			return Math.min(value / rootFontSize, 2);
		}
		return Math.min(value, 2);
	}

	function readNumberToken(styles: CSSStyleDeclaration, variable: string, fallback: number) {
		const value = Number.parseFloat(styles.getPropertyValue(variable).trim());
		return Number.isFinite(value) ? value : fallback;
	}

	function syncLiveControls() {
		if (!browser) return;
		const styles = getComputedStyle(document.documentElement);
		selectorRadius = [readRemToken(styles, '--kl-radius-selector', selectorRadius[0] ?? 0.25)];
		fieldRadius = [readRemToken(styles, '--kl-radius-field', fieldRadius[0] ?? 0.375)];
		boxRadius = [readRemToken(styles, '--kl-radius-box', boxRadius[0] ?? 0.375)];
		fieldSize = [readRemToken(styles, '--kl-size-field', fieldSize[0] ?? 0.25)];
		selectorSize = [readRemToken(styles, '--kl-size-selector', selectorSize[0] ?? 0.25)];
		borderWidth = [readRemToken(styles, '--kl-border-width', borderWidth[0] ?? 0.0625)];
		outlineWidth = [readRemToken(styles, '--kl-outline-width', outlineWidth[0] ?? 0.125)];
		outlineOffset = [readRemToken(styles, '--kl-outline-offset', outlineOffset[0] ?? 0.125)];
		depth = [readNumberToken(styles, '--kl-depth', depth[0] ?? 1)];
		noise = [readNumberToken(styles, '--kl-noise', noise[0] ?? 0)];
	}

	function formatRem(value: number) {
		return `${value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}rem`;
	}

	function formatPx(value: number) {
		return `${Math.round(value * 16)}px`;
	}

	function formatNumber(value: number) {
		return value.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
	}

	function formatPercent(value: number) {
		return `${Math.round(value * 100)}%`;
	}

	function setLiveRem(variable: string, value: number | undefined) {
		if (!browser || value === undefined) return;
		document.documentElement.style.setProperty(variable, formatRem(value));
		hasLiveOverrides = true;
		themeRevision += 1;
	}

	function setLiveNumber(variable: string, value: number | undefined) {
		if (!browser || value === undefined) return;
		document.documentElement.style.setProperty(variable, formatNumber(value));
		hasLiveOverrides = true;
		themeRevision += 1;
	}

	function resetLiveOverrides() {
		if (!browser) return;
		for (const variable of [
			'--kl-radius-selector',
			'--kl-radius-field',
			'--kl-radius-box',
			'--kl-size-field',
			'--kl-size-selector',
			'--kl-border-width',
			'--kl-outline-width',
			'--kl-outline-offset',
			'--kl-depth',
			'--kl-noise'
		]) {
			document.documentElement.style.removeProperty(variable);
		}
		hasLiveOverrides = false;
		syncLiveControls();
		themeRevision += 1;
	}

	onMount(() => {
		syncLiveControls();
		themeRevision += 1;

		const observer = new MutationObserver(() => {
			themeRevision += 1;
			if (!hasLiveOverrides) syncLiveControls();
		});
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme', 'data-mode', 'data-font']
		});

		return () => observer.disconnect();
	});
</script>

{#snippet sectionTitle(title: string, description: string)}
	<div class="flex flex-col gap-1">
		<h2 class="font-kl-heading text-kl-base-content text-xl font-semibold">{title}</h2>
		<p class="text-kl-muted-content max-w-3xl text-sm">{description}</p>
	</div>
{/snippet}

{#snippet statusCell(_row: Order, value: unknown)}
	{#if value === 'Paid'}
		<Badge color="success">{value}</Badge>
	{:else if value === 'Pending'}
		<Badge color="warning">{value}</Badge>
	{:else}
		<Badge color="error">{value}</Badge>
	{/if}
{/snippet}

{#snippet totalCell(_row: Order, value: unknown)}
	<span class="font-mono tabular-nums">{currency(Number(value))}</span>
{/snippet}

{#snippet savePreviewAction()}
	Save preview
{/snippet}

{#snippet discardAction()}
	Discard
{/snippet}

{#snippet exportAction()}
	Export
{/snippet}

<div class="min-h-full">
	<div class="grid gap-6 xl:grid-cols-[20rem_minmax(0,1fr)]">
		<aside class="xl:sticky xl:top-20 xl:max-h-[calc(100vh-5rem)] xl:self-start xl:overflow-y-auto">
			<div
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm overflow-hidden border"
			>
				<div class="border-kl-base-300 bg-kl-base-200 border-b p-4">
					<div class="flex items-start justify-between gap-3">
						<div>
							<p class="text-kl-muted-content text-xs font-semibold tracking-[0.18em] uppercase">
								Current theme
							</p>
							<h1 class="mt-1 text-2xl font-bold capitalize">{snapshot.themeName}</h1>
							<p class="text-kl-muted-content mt-1 text-xs">{snapshot.fontName}</p>
						</div>
						<Badge variant="outline" class="capitalize">{snapshot.modeName}</Badge>
					</div>
					<div
						class="rounded-kl-box border-kl-base-300 mt-4 grid grid-cols-3 overflow-hidden border"
					>
						<div class="bg-kl-base-100 h-14"></div>
						<div class="bg-kl-base-200 h-14"></div>
						<div class="bg-kl-base-300 h-14"></div>
					</div>
				</div>

				<div class="space-y-5 p-4">
					<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 space-y-4 border p-3">
						<div class="flex items-start justify-between gap-3">
							<div>
								<p class="text-kl-muted-content text-xs font-semibold tracking-[0.14em] uppercase">
									Live tuning
								</p>
								<p class="text-kl-muted-content mt-1 text-xs">Inline overrides for this preview.</p>
							</div>
							<Button
								size="sm"
								variant="outline"
								disabled={!hasLiveOverrides}
								onclick={resetLiveOverrides}
							>
								Reset
							</Button>
						</div>

						<div class="space-y-3">
							<Slider
								bind:value={selectorRadius}
								label={`Selector radius ${formatRem(selectorRadius[0] ?? 0)}`}
								min={0}
								max={2}
								step={0.25}
								color="primary"
								onValueChange={(value) => setLiveRem('--kl-radius-selector', value[0])}
							/>
							<Slider
								bind:value={fieldRadius}
								label={`Field radius ${formatRem(fieldRadius[0] ?? 0)}`}
								min={0}
								max={2}
								step={0.25}
								color="secondary"
								onValueChange={(value) => setLiveRem('--kl-radius-field', value[0])}
							/>
							<Slider
								bind:value={boxRadius}
								label={`Box radius ${formatRem(boxRadius[0] ?? 0)}`}
								min={0}
								max={2}
								step={0.25}
								color="accent"
								onValueChange={(value) => setLiveRem('--kl-radius-box', value[0])}
							/>
						</div>

						<div class="border-kl-base-300 border-t pt-3">
							<div class="space-y-3">
								<Slider
									bind:value={fieldSize}
									label={`Field size ${formatRem(fieldSize[0] ?? 0)}`}
									min={0.1875}
									max={0.3125}
									step={0.03125}
									color="info"
									onValueChange={(value) => setLiveRem('--kl-size-field', value[0])}
								/>
								<Slider
									bind:value={selectorSize}
									label={`Selector size ${formatRem(selectorSize[0] ?? 0)}`}
									min={0.1875}
									max={0.3125}
									step={0.03125}
									color="success"
									onValueChange={(value) => setLiveRem('--kl-size-selector', value[0])}
								/>
							</div>
						</div>

						<div class="border-kl-base-300 border-t pt-3">
							<div class="space-y-3">
								<Slider
									bind:value={depth}
									label={`Depth ${formatNumber(depth[0] ?? 0)}`}
									min={0}
									max={2}
									step={0.05}
									color="primary"
									onValueChange={(value) => setLiveNumber('--kl-depth', value[0])}
								/>
								<Slider
									bind:value={noise}
									label={`Noise ${formatPercent(noise[0] ?? 0)}`}
									min={0}
									max={0.2}
									step={0.01}
									color="secondary"
									onValueChange={(value) => setLiveNumber('--kl-noise', value[0])}
								/>
							</div>
						</div>

						<div class="border-kl-base-300 border-t pt-3">
							<div class="space-y-3">
								<Slider
									bind:value={borderWidth}
									label={`Default border ${formatPx(borderWidth[0] ?? 0)}`}
									min={0}
									max={0.25}
									step={0.0625}
									color="warning"
									onValueChange={(value) => setLiveRem('--kl-border-width', value[0])}
								/>
							</div>
						</div>

						<div class="border-kl-base-300 border-t pt-3">
							<div class="space-y-3">
								<Slider
									bind:value={outlineWidth}
									label={`Outline width ${formatPx(outlineWidth[0] ?? 0)}`}
									min={0.0625}
									max={0.25}
									step={0.0625}
									color="primary"
									onValueChange={(value) => setLiveRem('--kl-outline-width', value[0])}
								/>
								<Slider
									bind:value={outlineOffset}
									label={`Outline offset ${formatPx(outlineOffset[0] ?? 0)}`}
									min={0}
									max={0.375}
									step={0.0625}
									color="secondary"
									onValueChange={(value) => setLiveRem('--kl-outline-offset', value[0])}
								/>
							</div>
						</div>
					</div>

					<div>
						<p class="text-kl-muted-content mb-2 text-xs font-semibold tracking-[0.14em] uppercase">
							Rendering controls
						</p>
						<div class="grid grid-cols-2 gap-2">
							{#each renderingTokens as token (token.variable)}
								<div class="rounded-kl-field border-kl-base-300 bg-kl-base-200 border p-2">
									<div class="text-kl-muted-content truncate text-[0.68rem]">{token.name}</div>
									<code class="text-kl-base-content mt-1 block truncate font-mono text-xs">
										{token.value || 'unset'}
									</code>
								</div>
							{/each}
						</div>
					</div>

					<div>
						<p class="text-kl-muted-content mb-2 text-xs font-semibold tracking-[0.14em] uppercase">
							Typography
						</p>
						<div
							class="divide-kl-base-300 rounded-kl-box border-kl-base-300 divide-y overflow-hidden border"
						>
							{#each typographyTokens as token (token.variable)}
								<div class="px-2.5 py-2">
									<div class="text-kl-base-content truncate text-xs font-medium">{token.name}</div>
									<code class="text-kl-muted-content block truncate font-mono text-[0.68rem]">
										{token.value || 'unset'}
									</code>
								</div>
							{/each}
						</div>
					</div>

					<div>
						<p class="text-kl-muted-content mb-2 text-xs font-semibold tracking-[0.14em] uppercase">
							Radius
						</p>
						<div class="grid grid-cols-3 gap-2">
							{#each shapeTokens.slice(0, 3) as token (token.variable)}
								<div>
									<div
										class="border-kl-base-300 bg-kl-muted h-12 border"
										style:border-radius={token.value}
									></div>
									<p class="text-kl-muted-content mt-1 truncate text-[0.68rem]">{token.value}</p>
								</div>
							{/each}
						</div>
					</div>

					{#each snapshot.groups as group (group.title)}
						<div>
							<p
								class="text-kl-muted-content mb-2 text-xs font-semibold tracking-[0.14em] uppercase"
							>
								{group.title}
							</p>
							<div
								class="divide-kl-base-300 rounded-kl-box border-kl-base-300 divide-y overflow-hidden border"
							>
								{#each group.tokens as token (token.variable)}
									<div class="grid grid-cols-[1.25rem_minmax(0,1fr)_auto] gap-2 px-2.5 py-2">
										{#if token.kind === 'color'}
											<span
												class="border-kl-base-300 rounded-kl-selector mt-0.5 size-4 border"
												style:background-color={token.value}
											></span>
										{:else}
											<span class="bg-kl-base-300 rounded-kl-selector mt-0.5 size-4"></span>
										{/if}
										<div class="min-w-0">
											<div class="text-kl-base-content truncate text-xs font-medium">
												{token.name}
											</div>
											<code class="text-kl-muted-content block truncate font-mono text-[0.68rem]">
												{token.variable}: {token.value || 'unset'}
											</code>
										</div>
										<Tooltip
											content={tokenHelp[token.variable] ??
												`${token.name} controls ${token.variable}.`}
											side="left"
											class="max-w-60"
										>
											<span
												class="border-kl-base-300 text-kl-muted-content hover:border-kl-primary hover:text-kl-primary mt-0.5 grid size-4 cursor-help place-items-center rounded-full border text-[0.6rem] leading-none transition-colors"
											>
												i
											</span>
										</Tooltip>
									</div>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</aside>

		<div class="min-w-0 space-y-8">
			<section
				class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm overflow-hidden border"
			>
				<div class="grid gap-6 p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-6">
					<div class="space-y-5">
						<div>
							<p class="text-kl-muted-content text-xs font-semibold tracking-[0.2em] uppercase">
								Theme preview system
							</p>
							<h2 class="mt-2 max-w-3xl text-4xl font-bold tracking-normal">
								Kollagen components under real pressure.
							</h2>
							<p class="text-kl-muted-content mt-3 max-w-2xl text-sm leading-6">
								A dense preview surface for color, depth, noise, radius, forms, data, content,
								feedback, and product-like layouts.
							</p>
						</div>
						<div class="flex flex-wrap gap-2">
							<Button color="primary">Primary action</Button>
							<Button color="secondary" variant="soft">Secondary</Button>
							<Button color="accent" variant="outline">Accent outline</Button>
							<Button loading>Loading</Button>
						</div>
					</div>

					<div class="grid gap-3 sm:grid-cols-2">
						{#each palettePairs.slice(0, 6) as item (item.label)}
							<div
								class="rounded-kl-box border-kl-base-300 shadow-kl-sm min-h-24 border p-3"
								style:background-color={getTokenValue(item.color)}
								style:color={getTokenValue(item.content)}
							>
								<p class="text-sm font-semibold">{item.label}</p>
								<p class="mt-1 font-mono text-xs opacity-80">{item.color}</p>
							</div>
						{/each}
					</div>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Typography',
					'Body, heading, display, mono, and numeric rhythm under the selected font preset.'
				)}
				<div class="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
					<Card title={`${selectedFont.label} specimen`} description={selectedFont.source}>
						<div class="space-y-5">
							<div>
								<p class="text-kl-muted-content text-xs font-semibold tracking-[0.18em] uppercase">
									Font preset
								</p>
								<h3 class="font-kl-display mt-2 text-5xl font-bold tracking-normal">
									Kollagen ships composed UI.
								</h3>
								<p class="mt-4 max-w-2xl text-base leading-7">
									The selected preset rewires global typography tokens while every component keeps
									using the same semantic Tailwind utilities.
								</p>
							</div>
							<div class="grid gap-3 md:grid-cols-3">
								<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 border p-3">
									<p class="text-kl-muted-content text-xs font-medium">Body</p>
									<p class="mt-2 text-sm leading-6">
										Fast dashboards need calm text, resilient fallbacks, and readable density.
									</p>
								</div>
								<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 border p-3">
									<p class="text-kl-muted-content text-xs font-medium">Heading</p>
									<p class="font-kl-heading mt-2 text-xl font-semibold">Revenue workspace</p>
								</div>
								<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 border p-3">
									<p class="text-kl-muted-content text-xs font-medium">Mono</p>
									<code class="mt-2 block font-mono text-sm">pnpm build:registry</code>
								</div>
							</div>
						</div>
					</Card>

					<Card title="Numeric rhythm" description="Tables, amounts, codes, and compact metadata.">
						<div class="space-y-3">
							{#each orders.slice(0, 4) as order (order.id)}
								<div
									class="border-kl-base-300 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b pb-3 last:border-0 last:pb-0"
								>
									<div class="min-w-0">
										<p class="truncate text-sm font-medium">{order.customer}</p>
										<p class="text-kl-muted-content mt-0.5 font-mono text-xs">{order.id}</p>
									</div>
									<div class="text-right">
										<p class="font-mono text-sm font-semibold tabular-nums">
											{currency(order.total)}
										</p>
										<p class="text-kl-muted-content mt-0.5 text-xs">{order.date}</p>
									</div>
								</div>
							{/each}
						</div>
					</Card>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Foundation',
					'Colors, buttons, radius, elevation, and token contrast in compact grids.'
				)}
				<div class="grid gap-4 xl:grid-cols-[1fr_1fr]">
					<Card title="Button matrix" description="Every semantic color across core variants.">
						<div class="space-y-4">
							{#each buttonVariants as variant (variant)}
								<div class="flex flex-wrap items-center gap-2">
									<span class="text-kl-muted-content w-16 text-xs font-medium capitalize"
										>{variant}</span
									>
									{#each buttonColors as color (color)}
										<Button {variant} {color} size="sm">{color}</Button>
									{/each}
								</div>
							{/each}
						</div>
					</Card>

					<Card title="Surface stack" description="Base surfaces, shadows, and noise overlays.">
						<div class="grid gap-3 sm:grid-cols-3">
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-100 shadow-kl-sm border p-4">
								<p class="font-medium">Base 100</p>
								<p class="text-kl-muted-content mt-8 text-xs">shadow sm</p>
							</div>
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-200 shadow-kl-md border p-4">
								<p class="font-medium">Base 200</p>
								<p class="text-kl-muted-content mt-8 text-xs">shadow md</p>
							</div>
							<div class="rounded-kl-box border-kl-base-300 bg-kl-base-300 shadow-kl-lg border p-4">
								<p class="font-medium">Base 300</p>
								<p class="text-kl-muted-content mt-8 text-xs">shadow lg</p>
							</div>
						</div>
						<div class="mt-4 grid gap-3 sm:grid-cols-3">
							{#each shapeTokens.slice(0, 3) as token (token.variable)}
								<div
									class="border-kl-base-300 bg-kl-base-200 border p-4"
									style:border-radius={token.value}
								>
									<p class="text-sm font-medium">{token.name}</p>
									<code class="text-kl-muted-content mt-6 block truncate font-mono text-xs">
										{token.value}
									</code>
								</div>
							{/each}
						</div>
						<Separator class="my-4" />
						<div class="grid gap-3 sm:grid-cols-[1fr_1fr]">
							<div class="space-y-2">
								<div class="flex items-center justify-between gap-3">
									<span class="text-sm font-medium">Registry sync</span>
									<Badge color="success" variant="soft">Healthy</Badge>
								</div>
								<Progress value={68} color="primary" />
							</div>
							<div class="space-y-2">
								<Skeleton class="h-4 w-28" />
								<Skeleton class="h-4 w-44" />
								<Skeleton class="h-8 w-full" />
							</div>
						</div>
					</Card>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Inputs And Controls',
					'The same theme applied to dense operational controls.'
				)}
				<div class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
					<Card
						title="Preferences panel"
						description="Switches, toggles, radios, sliders, and selectors."
					>
						<div class="space-y-5">
							<div class="flex flex-wrap gap-3">
								<Switch bind:checked={reportEnabled} label="Weekly report" />
								<Switch bind:checked={emailEnabled} label="Email digest" />
								<Toggle bind:pressed={compactPressed}>Compact tables</Toggle>
							</div>
							<RadioGroup
								items={radioItems}
								bind:value={selectedSegment}
								label="Preview density"
								orientation="horizontal"
							/>
							<div class="grid gap-4 md:grid-cols-2">
								<Select
									items={selectItems}
									bind:value={selectedProduct}
									label="Workspace"
									placeholder="Pick a workspace"
								/>
								<NumberInput bind:value={seats} label="Seats" min={1} max={99} />
							</div>
							<Slider
								bind:value={sliderValue}
								label="Theme intensity"
								color="primary"
								showValue
								markers={[0, 25, 50, 75, 100]}
							/>
							<Slider
								bind:value={rangeValue}
								label="Acceptable contrast range"
								color="accent"
								showValue
							/>
							<TagsInput bind:value={tags} placeholder="Add token label" />
						</div>
					</Card>

					<Card
						title="Checkout form"
						description="Validation, password, date, and native submission surfaces."
					>
						<div class="grid gap-4 md:grid-cols-2">
							<Field bind:value={email} label="Email" type="email" placeholder="name@company.com" />
							<div>
								<span class="text-kl-base-content mb-1.5 block text-sm font-medium">Password</span>
								<PasswordInput bind:value={password} />
							</div>
							<Field label="Company" placeholder="Acme Inc." />
							<DatePicker bind:value={selectedDate} ariaLabel="Contract date" />
						</div>
						<div class="mt-4 space-y-3">
							<Field textarea label="Notes" rows={3} placeholder="Deployment notes..." />
							<Field
								label="Invalid field"
								value="bad-token"
								invalid
								errorText="This token is not part of the current theme."
							/>
							<Checkbox bind:checked={checkedTerms} label="Sync this configuration to staging" />
							<ButtonGroup
								ariaLabel="Checkout actions"
								variant="outline"
								items={[
									{ type: 'button', children: savePreviewAction },
									{ type: 'button', children: discardAction },
									{ type: 'button', children: exportAction }
								]}
							/>
						</div>
					</Card>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Product Contexts',
					'Cards and workflows that expose how the theme behaves outside atomic controls.'
				)}
				<div class="grid gap-4 xl:grid-cols-3">
					<Card title="Plan card" description="Pricing-like composition.">
						<div class="space-y-5">
							<div class="flex items-start justify-between gap-4">
								<div>
									<p class="text-kl-muted-content text-sm">Scale plan</p>
									<p class="mt-1 text-3xl font-bold">$249</p>
								</div>
								<Badge color="accent">Popular</Badge>
							</div>
							<div class="space-y-2 text-sm">
								<Checkbox checked label="Unlimited previews" />
								<Checkbox checked label="Theme snapshots" />
								<Checkbox checked label="Visual regression queue" />
							</div>
							<Button color="primary" class="w-full">Upgrade workspace</Button>
						</div>
					</Card>

					<Card title="Product tile" description="Media-free commerce card.">
						<div class="space-y-4">
							<div
								class="rounded-kl-box bg-kl-base-200 border-kl-base-300 grid aspect-[4/3] place-items-center border"
							>
								<div
									class="rounded-kl-box bg-kl-primary text-kl-primary-content shadow-kl-lg px-6 py-5 text-center"
								>
									<div class="text-3xl font-bold">KL</div>
									<div class="text-xs opacity-80">Theme Kit</div>
								</div>
							</div>
							<div class="flex items-start justify-between gap-3">
								<div>
									<h3 class="font-semibold">Kollagen starter pack</h3>
									<p class="text-kl-muted-content text-sm">Components, tokens, and docs.</p>
								</div>
								<p class="font-mono font-semibold">$79</p>
							</div>
							<div class="flex items-center justify-between gap-3">
								<RatingGroup bind:value={rating} ariaLabel="Product rating" />
								<Button size="sm" color="secondary">Add</Button>
							</div>
						</div>
					</Card>

					<Card title="Activation" description="Steps component in a setup flow.">
						<Steps bind:step={currentStep} items={steps}>
							{#snippet content(step)}
								<div class="space-y-2">
									<p class="text-sm font-medium">Step {step + 1} configuration</p>
									<p class="text-kl-muted-content text-sm">
										Preview how active, complete, and inactive states inherit the theme.
									</p>
								</div>
							{/snippet}
						</Steps>
					</Card>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Data And Navigation',
					'Operational density for tables, tabs, pagination, trees, and disclosure.'
				)}
				<div class="grid gap-4 2xl:grid-cols-[1.25fr_0.75fr]">
					<Card
						title="Orders table"
						description="Search, sort, pagination chrome, and status cells."
					>
						<DataTable
							data={visibleOrders}
							columns={orderColumns}
							totalCount={visibleOrders.length}
							rowKey="id"
							bind:query
							searchPlaceholder="Search orders..."
							pageSizeOptions={[5, 10]}
							cellSnippets={{ status: statusCell, total: totalCell }}
						/>
					</Card>

					<div class="space-y-4">
						<Card title="Navigation state" description="Tabs and page controls.">
							<Tabs
								items={[
									{ label: 'Preview', value: 'preview' },
									{ label: 'Tokens', value: 'tokens' },
									{ label: 'Diff', value: 'diff' }
								]}
								value="preview"
							>
								{#snippet content(value)}
									<div class="rounded-kl-box bg-kl-base-200 border-kl-base-300 border p-4">
										<p class="text-sm font-medium capitalize">{value}</p>
										<p class="text-kl-muted-content mt-1 text-sm">
											Tabbed content inherits active color and border rhythm.
										</p>
									</div>
								{/snippet}
							</Tabs>
							<div class="mt-5">
								<Pagination bind:page bind:perPage count={84} showPageInfo />
							</div>
						</Card>

						<Card title="Theme files" description="Tree state and accordion content.">
							<TreeView
								nodes={treeNodes}
								bind:selectedValue={selectedTree}
								bind:expandedValue={expandedTree}
							/>
							<div class="mt-4">
								<Accordion items={accordionItems} value={['density']}>
									{#snippet children(item)}
										<p class="text-kl-muted-content">
											{item.label} is represented by tokens in the sidebar and rendered here.
										</p>
									{/snippet}
								</Accordion>
							</div>
						</Card>
					</div>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Utilities And Feedback',
					'Clipboard, upload, QR, timer, and chat contexts using the current theme.'
				)}
				<div class="grid gap-4 xl:grid-cols-3">
					<Card title="Share package" description="Copy and QR surfaces.">
						<div class="space-y-4">
							<Clipboard
								label="Install command"
								value="npx @saasak/kollagen add button card tabs"
							/>
							<Alert color="info" title="Preview channel">
								This theme is ready for visual regression checks.
							</Alert>
							<div class="flex items-center gap-4">
								<QrCode value="https://kollagen.saasak.dev/theme" pixelSize={112} />
								<div>
									<p class="font-medium">Theme URL</p>
									<p class="text-kl-muted-content mt-1 text-sm">
										Scannable preview for quick device checks.
									</p>
								</div>
							</div>
						</div>
					</Card>

					<Card title="Release upload" description="Dropzone, dashed borders, and file states.">
						<FileUpload
							label="Theme artifact"
							hint="Drop registry diff or click to upload"
							maxFiles={2}
							maxFileSize={1_000_000}
						/>
					</Card>

					<Card title="Timing and chat" description="Live-ish components inside constrained cards.">
						<div class="space-y-5">
							<Timer
								countdown
								startMs={184000}
								segments={['minutes', 'seconds']}
								showControls={false}
							/>
							<ChatPanel
								messages={chatMessages}
								title="Theme review"
								subtitle="3 reviewers online"
								headerAvatar="TR"
								class="h-80 min-w-0"
							/>
						</div>
					</Card>
				</div>
			</section>

			<section class="space-y-4">
				{@render sectionTitle(
					'Full Token Palette',
					'A larger swatch board for side-by-side comparison with DaisyUI themes.'
				)}
				<div class="grid gap-4">
					{#each colorGroups as group (group.title)}
						<Card title={group.title}>
							<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
								{#each group.tokens as token (token.variable)}
									<div class="rounded-kl-box border-kl-base-300 overflow-hidden border">
										<div class="h-24" style:background-color={token.value}></div>
										<div class="space-y-1 p-3">
											<div class="flex items-center justify-between gap-3">
												<span class="text-sm font-medium">{token.name}</span>
												<code class="text-kl-muted-content font-mono text-xs">{token.variable}</code
												>
											</div>
											<p class="text-kl-muted-content truncate font-mono text-xs">
												{token.value || 'unset'}
											</p>
										</div>
									</div>
								{/each}
							</div>
						</Card>
					{/each}
				</div>
			</section>
		</div>
	</div>
</div>
