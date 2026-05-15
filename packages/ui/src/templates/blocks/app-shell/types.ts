import type { Component, ComponentType, SvelteComponent } from 'svelte';
import type { NavGroup, NavIcon, NavItem, NavMatch } from '../sidebar';

export type NavBarPosition = 'top' | 'bottom' | 'left' | 'right';
export type MobileBarPosition = 'top' | 'bottom';
export type NavMenuItemTone = 'default' | 'error';

export interface NavBrand {
	label: string;
	href?: string;
	logoSrc?: string;
	logoAlt?: string;
	logo?: NavIcon;
}

export interface NavAction {
	label: string;
	href?: string;
	onclick?: () => void;
	icon?: NavIcon;
	color?: 'primary' | 'secondary' | 'accent' | 'neutral';
	disabled?: boolean;
}

export interface NavUserMenuItem {
	label: string;
	href?: string;
	onSelect?: () => void;
	icon?: NavIcon;
	disabled?: boolean;
	tone?: NavMenuItemTone;
}

export interface NavUserMenu {
	name: string;
	email?: string;
	image?: string;
	initials?: string;
	items?: NavUserMenuItem[];
}

export type NavLogoComponent =
	| Component<{ class?: string; 'aria-hidden'?: boolean | 'true' | 'false' | null }>
	| ComponentType<
			SvelteComponent<{ class?: string; 'aria-hidden'?: boolean | 'true' | 'false' | null }>
	  >;

export interface RegisteredNavBar {
	position: NavBarPosition;
	label?: string;
	groups: NavGroup[];
	brand?: NavBrand;
	action?: NavAction;
	userMenu?: NavUserMenu;
	collapsible?: boolean;
	collapsed?: boolean;
	setCollapsed?: (collapsed: boolean) => void;
}

export type { NavGroup, NavIcon, NavItem, NavMatch };
