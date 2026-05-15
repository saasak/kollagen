import { browser } from '$app/environment';
import { FONT_LINK_ID, FONT_STORAGE_KEY, fontPresets, getFontPreset } from './font-presets';
import type { FontPresetId } from './font-presets';

class FontState {
	current = $state<FontPresetId>(fontPresets[0].id);

	constructor() {
		if (browser) {
			this.current = getFontPreset(document.documentElement.dataset.font).id as FontPresetId;
		}
	}

	get selected() {
		return getFontPreset(this.current);
	}

	select(id: string) {
		const preset = getFontPreset(id);
		this.current = preset.id as FontPresetId;

		if (!browser) return;
		document.documentElement.dataset.font = preset.id;
		localStorage.setItem(FONT_STORAGE_KEY, preset.id);
		ensureFontStylesheet(preset.href);
	}

	hydrate() {
		if (!browser) return;
		const saved = localStorage.getItem(FONT_STORAGE_KEY);
		const preset = getFontPreset(saved ?? document.documentElement.dataset.font);
		this.select(preset.id);
	}
}

function ensureFontStylesheet(href?: string) {
	let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;

	if (!href) {
		link?.remove();
		return;
	}

	if (!link) {
		link = document.createElement('link');
		link.id = FONT_LINK_ID;
		link.rel = 'stylesheet';
		document.head.append(link);
	}

	if (link.href !== href) {
		link.href = href;
	}
}

export const fontState = new FontState();
