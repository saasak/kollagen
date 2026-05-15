import { getContext, hasContext, setContext } from 'svelte';
import type { MobileBarPosition, NavBarPosition, RegisteredNavBar } from './types';

export class AppShellState {
	currentPath = $state('');
	mobileBar = $state<MobileBarPosition>('top');
	sidebarBreakpoint = $state(1024);
	shellWidth = $state(0);
	mobileMenuOpen = $state(false);
	navbars = $state<Record<NavBarPosition, RegisteredNavBar | undefined>>({
		top: undefined,
		bottom: undefined,
		left: undefined,
		right: undefined
	});
	collapsed = $state<Record<'left' | 'right', boolean>>({
		left: false,
		right: false
	});

	constructor(options?: {
		currentPath?: string;
		mobileBar?: MobileBarPosition;
		sidebarBreakpoint?: number;
	}) {
		this.currentPath = options?.currentPath ?? '';
		this.mobileBar = options?.mobileBar ?? 'top';
		this.sidebarBreakpoint = options?.sidebarBreakpoint ?? 1024;
	}

	get isDesktop() {
		return this.shellWidth >= this.sidebarBreakpoint;
	}

	get hasMobileNavigation() {
		return Boolean(
			this.navbars.left ?? this.navbars.top ?? this.navbars.bottom ?? this.navbars.right
		);
	}

	register(navbar: RegisteredNavBar) {
		this.navbars[navbar.position] = navbar;

		if (navbar.position === 'left' || navbar.position === 'right') {
			this.collapsed[navbar.position] = navbar.collapsed ?? false;
		}

		return () => {
			if (this.navbars[navbar.position] === navbar) {
				this.navbars[navbar.position] = undefined;
			}
		};
	}

	openMobileMenu() {
		this.mobileMenuOpen = true;
	}

	closeMobileMenu() {
		this.mobileMenuOpen = false;
	}

	toggleMobileMenu() {
		this.mobileMenuOpen = !this.mobileMenuOpen;
	}

	toggleCollapsed(position: 'left' | 'right') {
		const next = !this.collapsed[position];
		this.collapsed[position] = next;
		this.navbars[position]?.setCollapsed?.(next);
	}
}

const APP_SHELL_CONTEXT = Symbol('app-shell');

export function getAppShellContext() {
	const context = tryGetAppShellContext();

	if (!context) {
		throw new Error('AppShell must be rendered inside AppShellProvider.');
	}

	return context;
}

export function tryGetAppShellContext() {
	return hasContext(APP_SHELL_CONTEXT) ? getContext<AppShellState>(APP_SHELL_CONTEXT) : undefined;
}

export function setAppShellContext(context: AppShellState) {
	return setContext(APP_SHELL_CONTEXT, context);
}
