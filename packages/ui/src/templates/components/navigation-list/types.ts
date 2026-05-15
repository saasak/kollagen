import type { Component, ComponentType, SvelteComponent } from 'svelte';

export type NavMatch = 'exact' | 'startsWith';

export type NavIconProps = {
	size?: number | string;
	class?: string;
	'aria-hidden'?: boolean | 'true' | 'false' | null;
};

export type NavIcon = Component<NavIconProps> | ComponentType<SvelteComponent<NavIconProps>>;

export interface NavItem {
	label: string;
	href: string;
	icon?: NavIcon;
	badge?: string;
	match?: NavMatch;
	children?: NavItem[];
	description?: string;
	disabled?: boolean;
}

export interface NavGroup {
	label?: string;
	items: NavItem[];
}
