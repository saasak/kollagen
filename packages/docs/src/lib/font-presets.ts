export type FontPreset = {
	id: string;
	label: string;
	source: 'System' | 'Google Fonts' | 'Fontshare';
	body: string;
	heading: string;
	display: string;
	mono: string;
	href?: string;
};

export const FONT_STORAGE_KEY = 'kl-font';
export const FONT_LINK_ID = 'kl-font-stylesheet';

export const fontPresets = [
	{
		id: 'system',
		label: 'System',
		source: 'System',
		body: 'ui-sans-serif, system-ui, sans-serif',
		heading: 'var(--kl-font-body)',
		display: 'var(--kl-font-heading)',
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
	},
	{
		id: 'geist',
		label: 'Geist',
		source: 'Google Fonts',
		body: "'Geist', ui-sans-serif, system-ui, sans-serif",
		heading: "'Geist', ui-sans-serif, system-ui, sans-serif",
		display: "'Geist', ui-sans-serif, system-ui, sans-serif",
		mono: "'Geist Mono', ui-monospace, SFMono-Regular, monospace",
		href: 'https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap'
	},
	{
		id: 'inter',
		label: 'Inter',
		source: 'Google Fonts',
		body: "'Inter', ui-sans-serif, system-ui, sans-serif",
		heading: "'Inter', ui-sans-serif, system-ui, sans-serif",
		display: "'Inter Tight', 'Inter', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@500;600;700&display=swap'
	},
	{
		id: 'manrope',
		label: 'Manrope',
		source: 'Google Fonts',
		body: "'Manrope', ui-sans-serif, system-ui, sans-serif",
		heading: "'Manrope', ui-sans-serif, system-ui, sans-serif",
		display: "'Manrope', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap'
	},
	{
		id: 'satoshi',
		label: 'Satoshi',
		source: 'Fontshare',
		body: "'Satoshi', ui-sans-serif, system-ui, sans-serif",
		heading: "'Satoshi', ui-sans-serif, system-ui, sans-serif",
		display: "'Satoshi', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap'
	},
	{
		id: 'jakarta',
		label: 'Plus Jakarta Sans',
		source: 'Google Fonts',
		body: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
		heading: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
		display: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap'
	},
	{
		id: 'dm-sans',
		label: 'DM Sans',
		source: 'Google Fonts',
		body: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
		heading: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
		display: "'DM Sans', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'
	},
	{
		id: 'outfit',
		label: 'Outfit',
		source: 'Google Fonts',
		body: "'Outfit', ui-sans-serif, system-ui, sans-serif",
		heading: "'Outfit', ui-sans-serif, system-ui, sans-serif",
		display: "'Outfit', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap'
	},
	{
		id: 'space-grotesk',
		label: 'Space Grotesk',
		source: 'Google Fonts',
		body: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
		heading: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
		display: "'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap'
	},
	{
		id: 'ibm-plex',
		label: 'IBM Plex Sans',
		source: 'Google Fonts',
		body: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
		heading: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
		display: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
		mono: "'IBM Plex Mono', ui-monospace, SFMono-Regular, monospace",
		href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap'
	},
	{
		id: 'instrument',
		label: 'Instrument Sans',
		source: 'Google Fonts',
		body: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
		heading: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
		display: "'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&display=swap'
	},
	{
		id: 'host-grotesk',
		label: 'Host Grotesk',
		source: 'Google Fonts',
		body: "'Host Grotesk', ui-sans-serif, system-ui, sans-serif",
		heading: "'Host Grotesk', ui-sans-serif, system-ui, sans-serif",
		display: "'Host Grotesk', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Host+Grotesk:wght@400;500;600;700&display=swap'
	},
	{
		id: 'onest',
		label: 'Onest',
		source: 'Google Fonts',
		body: "'Onest', ui-sans-serif, system-ui, sans-serif",
		heading: "'Onest', ui-sans-serif, system-ui, sans-serif",
		display: "'Onest', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700&display=swap'
	},
	{
		id: 'urbanist',
		label: 'Urbanist',
		source: 'Google Fonts',
		body: "'Urbanist', ui-sans-serif, system-ui, sans-serif",
		heading: "'Urbanist', ui-sans-serif, system-ui, sans-serif",
		display: "'Urbanist', ui-sans-serif, system-ui, sans-serif",
		mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
		href: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;600;700&display=swap'
	},
	{
		id: 'roboto',
		label: 'Roboto',
		source: 'Google Fonts',
		body: "'Roboto', ui-sans-serif, system-ui, sans-serif",
		heading: "'Roboto', ui-sans-serif, system-ui, sans-serif",
		display: "'Roboto', ui-sans-serif, system-ui, sans-serif",
		mono: "'Roboto Mono', ui-monospace, SFMono-Regular, monospace",
		href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Roboto+Mono:wght@400;500;600&display=swap'
	}
] as const satisfies readonly FontPreset[];

export type FontPresetId = (typeof fontPresets)[number]['id'];

export function getFontPreset(id: string | null | undefined): FontPreset {
	return (fontPresets.find((preset) => preset.id === id) ?? fontPresets[0]) as FontPreset;
}
