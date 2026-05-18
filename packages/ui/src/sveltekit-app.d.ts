declare module '$app/environment' {
	export const browser: boolean;
}

declare module '$app/navigation' {
	export function pushState(url: string | URL, state: Record<string, unknown>): void;
}

declare module '$app/state' {
	export const page: {
		state: Record<string, unknown>;
	};
}
