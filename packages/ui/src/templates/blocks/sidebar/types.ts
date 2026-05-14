import type { Component, ComponentType, SvelteComponent } from 'svelte';

export type SidebarMatch = 'exact' | 'startsWith';
export type SidebarIconProps = {
	size?: number | string;
	class?: string;
	'aria-hidden'?: boolean | 'true' | 'false' | null;
};
export type SidebarIcon =
	| Component<SidebarIconProps>
	| ComponentType<SvelteComponent<SidebarIconProps>>;

export interface SidebarItem {
	label: string;
	href: string;
	icon?: SidebarIcon;
	badge?: string;
	match?: SidebarMatch;
	children?: SidebarItem[];
}

export interface SidebarGroup {
	label?: string;
	items: SidebarItem[];
}
